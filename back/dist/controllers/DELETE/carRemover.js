"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../../global/db_connection");
function carRemover(req, _) {
    db_connection_1.db.query(`DELETE FROM cars WHERE id = ${req.body}`);
}
exports.default = carRemover;
