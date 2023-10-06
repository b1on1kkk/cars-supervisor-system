"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../../global/db_connection");
function getCarsCombinations(req, res) {
    const arrayOfQueryValues = Object.values(req.query);
    const sql = `SELECT ${arrayOfQueryValues.toString()} FROM cars`;
    db_connection_1.db.query(sql, (err, data) => {
        if (err)
            return console.log(err);
        return res.json(data);
    });
}
exports.default = getCarsCombinations;
