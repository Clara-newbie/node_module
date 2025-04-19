"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const planets_1 = require("./controllers/planets");
const authorize_js_1 = __importDefault(require("./authorize.js"));
require("./passport.js");
const users_js_1 = require("./controllers/users.js");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
dotenv_1.default.config();
const app = (0, express_1.default)();
const dbPort = process.env.DB_PORT;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.listen(dbPort, () => {
    console.log(`App listening on http://localhost:${dbPort}`);
});
app.get("/api/planets", planets_1.getAll);
app.get("/api/planets/:id", planets_1.getOnebyId);
app.post("/api/planets", planets_1.create);
app.put("/api/planets/:id", planets_1.updateById);
app.delete("/api/planets/:id", planets_1.deleteById);
app.post("/api/planets/:id/image", upload.single("image"), planets_1.createImage);
app.post("/api/users/login", users_js_1.logIn);
app.post("/api/users/signup", users_js_1.signUp);
app.get("/api/users/details", authorize_js_1.default, users_js_1.getDetails);
app.get("/api/users/logout", authorize_js_1.default, users_js_1.logOut);
//# sourceMappingURL=server.js.map