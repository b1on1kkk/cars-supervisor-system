import { Request, Response } from "express";
import { db } from "../../global/db_connection";

export default function newCarAdder(req: Request, _: Response) {
  db.query("INSERT INTO cars SET ?", req.body);
}
