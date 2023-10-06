import { Request, Response } from "express";
import { CarData } from "../../interfaces/carsData";
import { db } from "../../global/db_connection";

export default function getAllCarsData(_: Request, res: Response) {
  const sql = "SELECT * FROM cars";
  db.query(sql, (err: Error, data: CarData[]) => {
    if (err) return console.log(err);

    return res.json(data);
  });
}
