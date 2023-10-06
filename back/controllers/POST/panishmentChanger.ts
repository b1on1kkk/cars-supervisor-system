import { Request, Response } from "express";
import { db } from "../../global/db_connection";

export default function PunishmentChanger(req: Request, _: Response) {
  const newData = JSON.parse(req.body);

  if (newData.status === "change_delinquency") {
    db.query(
      `UPDATE cars SET delinquencies = '${newData.value}' WHERE licence = '${newData.licence}'`
    );
  } else {
    db.query(
      `UPDATE cars SET penalty = '${newData.value}' WHERE licence = '${newData.licence}'`
    );
  }
}
