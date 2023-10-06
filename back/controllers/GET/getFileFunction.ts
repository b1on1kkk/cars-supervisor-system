import { Response } from "express";
import path from "path";

export default function getFileFunction(
  res: Response,
  folder: string,
  file: string
) {
  res.sendFile(
    path.join(__dirname, "../../../../", "front", `${folder}`, `${file}`)
  );
}
