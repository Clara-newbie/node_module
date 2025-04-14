"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const planets_1 = require("./controllers/planets");
// a che serve?
dotenv_1.default.config();
const app = (0, express_1.default)();
const dbPort = process.env.DB_PORT;
// USE è un metodo usato per configurare
app.use((0, morgan_1.default)("dev")); // Cosa fa MORGAN?
app.use(express_1.default.json());
app.listen(dbPort, () => {
    console.log(`App listening on http://localhost${dbPort}`);
});
app.get("/api/planets", planets_1.getAll);
app.get("/api/planets/:id", planets_1.getOnebyId);
app.post("/api/planets", planets_1.create);
app.put("/api/planets/:id", planets_1.updateById);
app.delete("/api/planets/:id", planets_1.deleteById);
//# sourceMappingURL=server.js.map