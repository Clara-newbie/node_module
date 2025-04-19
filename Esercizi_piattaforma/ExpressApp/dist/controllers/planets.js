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
exports.createImage = exports.deleteById = exports.updateById = exports.create = exports.getOnebyId = exports.getAll = void 0;
const joi_1 = __importDefault(require("joi"));
const db_1 = require("./../db");
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
    const planets = yield db_1.db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
exports.getAll = getAll;
const getOnebyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //const planetById = planets.find((p) => p.id === Number(id));
    const planetById = yield db_1.db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));
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
        res.status(400).json({ msg: newValidatedPlanet.error });
    }
    else {
        // planets = [...planets, myNewPlanet];
        yield db_1.db.none(`INSERT INTO planets (name) VALUES $1`, name);
        res.status(201).json({ msg: "Planet created successfully!" });
    }
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    //planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
    yield db_1.db.none(`UPDATE FROM planets SET name=$ WHERE id=$1;`, [id, name]);
    res.status(200).json({ msg: "Planet updated successfully!" });
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //planets = planets.filter((p) => {p.id !== Number(id); });
    yield db_1.db.none(`DELETE FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json({ msg: "Planet deleted successfully!" });
});
exports.deleteById = deleteById;
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.file);
    const { id } = req.params;
    const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (fileName) {
        db_1.db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
        res.status(201).json({ msg: "Planet image uploaded successfully." });
    }
    else {
        res.status(404).json({ msg: "Planet image failed to upload." });
    }
});
exports.createImage = createImage;
// VALIDATION
// che differenza c'è con typescript?
const schema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required(),
});
//# sourceMappingURL=planets.js.map