"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOnebyId = exports.getAll = void 0;
const joi_1 = __importDefault(require("joi"));
const pg_promise_1 = __importDefault(require("pg-promise"));
// collegamento db
const db = (0, pg_promise_1.default)()("postgres://postgres:password@localhost:5432/postgres");
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    db.none(`
    DROP TABLE IF EXIST planets

    CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
        );
    `);
    yield db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Jupiter')`);
});
setupDb();
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
// CALLBACK CHIAMATE
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
exports.getAll = getAll;
const getOnebyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //const planetById = planets.find((p) => p.id === Number(id));
    const planetById = yield db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    if (planetById) {
        res.status(200).json(planetById);
    }
    else {
        res.status(404).json({ message: "Planet not found" });
    }
});
exports.getOnebyId = getOnebyId;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const myNewPlanet = { id, name };
    // applichiamo la validation
    const newValidatedPlanet = schema.validate(myNewPlanet);
    // se la validazione non va a buon fine, errore, altrimenti crea un pianeta
    if (newValidatedPlanet.error) {
        return res.status(400).json({ msg: newValidatedPlanet.error });
    }
    else {
        // planets = [...planets, myNewPlanet];
        yield db.none(`INSERT INTO planets (name) VALUES $1`, name);
        res.status(201).json({ msg: "Planet created successfully!" });
    }
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    //planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
    yield db.none(`UPDATE FROM planets SET name=$ WHERE id=$1;`, [id, name]);
    res.status(200).json({ msg: "Planet updated successfully!" });
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //planets = planets.filter((p) => {p.id !== Number(id); });
    yield db.none(`DELETE FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json({ msg: "Planet deleted successfully!" });
});
exports.deleteById = deleteById;
// VALIDATION
// che differenza c'è con typescript?
const schema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required(),
});
//# sourceMappingURL=planets.js.map