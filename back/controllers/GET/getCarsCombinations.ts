import { Request, Response } from "express";
import { CarData } from "../../interfaces/carsData";
import { db } from "../../global/db_connection";

export default function getCarsCombinations(req: Request, res: Response) {
  const arrayOfQueryValues = Object.values(req.query);

  const sql = `SELECT ${arrayOfQueryValues.toString()} FROM cars`;
  db.query(sql, (err: Error, data: CarData[]) => {
    if (err) return console.log(err);

    return res.json(data);
  });
}
