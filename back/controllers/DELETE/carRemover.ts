import { Request, Response } from "express";
import { db } from "../../global/db_connection";

export default function carRemover(req: Request, _: Response) {
  db.query(`DELETE FROM cars WHERE id = ${req.body}`);
}
