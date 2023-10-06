"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../../global/db_connection");
function PunishmentChanger(req, _) {
    const newData = JSON.parse(req.body);
    if (newData.status === "change_delinquency") {
        db_connection_1.db.query(`UPDATE cars SET delinquencies = '${newData.value}' WHERE licence = '${newData.licence}'`);
    }
    else {
        db_connection_1.db.query(`UPDATE cars SET penalty = '${newData.value}' WHERE licence = '${newData.licence}'`);
    }
}
exports.default = PunishmentChanger;
