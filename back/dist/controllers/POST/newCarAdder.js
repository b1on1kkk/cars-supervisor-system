"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../../global/db_connection");
function newCarAdder(req, _) {
    db_connection_1.db.query("INSERT INTO cars SET ?", req.body);
}
exports.default = newCarAdder;
