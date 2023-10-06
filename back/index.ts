// Реализуйте клиентскую и серверную часть обработчиков для базы розыска автомобилей с характеристиками:

// a. Марка
// b. Номерной знак (формата ЦЦЦЦ-ББЦ, где Ц - цифра 0-9, а Б - буква A-Z)
// c. Окрас
// d. Вес
// e. Год выпуска
// f. Тип “двигателя”: дизель, бензин, гибрид, электро
// g. Кол-во правонарушений
// h. Сумма неоплаченных штрафов

// Вся информация должна генерироваться и храниться на стороне сервера. Приветствуется использование JSON-файла для хранения сведений.

// Пользователь со стороны клиентской стороны должен обладать возможностью получать выдачу по заданным критериям:

// 1. Все авто, которые есть в базе
// 2. Все авто с заданными различными комбинациями характеристик, перечень которых был определён выше
// 3. Добавить в базу новое авто с данными

// Усложнения:
// 4. Удалить из базы авто
// 5. Увеличить в базе для заданного по номерному знаку авто кол-во правонурашений
// 6. Увеличить в базе для заданного по номерному знаку авто сумму неоплаченных штрафов
// 7. Сменить окрас для авто
// 8. Заполучить всю базу с сервера на клиенте, чтобы она скачалась в виде json-файла
// 9. Заполучить дамп базы с заданными критериями опять же в виде JSON-файла, который скачается на клиент

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import express, { Express, Response } from "express";
import path from "path";

// GET requests
import getAllCarsData from "./controllers/GET/getAllCars";
import getFileFunction from "./controllers/GET/getFileFunction";
import getCarsCombinations from "./controllers/GET/getCarsCombinations";
//

// POST requests
import PunishmentChanger from "./controllers/POST/panishmentChanger";
import newCarAdder from "./controllers/POST/newCarAdder";
//

// DELETE requests
import carRemover from "./controllers/DELETE/carRemover";
//

const cors = require("cors");
const app: Express = express();
const port = 2005;

app.use(express.static(path.join(__dirname, "../../", "front")));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// GET
app.get("/", (_, res: Response) => {
  getFileFunction(res, "", "main_page.html");
});

app.get("/cars", getAllCarsData);

app.get("/all_cars", (_, res: Response) => {
  // getFileFunction - функция, которая достает статический файл html. Принимает 3 параметра
  // ответную часть
  // папку, из которой нужно взять файл
  // и название файла

  getFileFunction(res, "all_cars", "all_cars.html");
});

app.get("/add_car", (_, res: Response) => {
  getFileFunction(res, "new_car", "adding_new_car.html");
});

app.get("/cars_by_combinations", (_, res: Response) => {
  getFileFunction(res, "show_by_combination", "cars_by_combinations.html");
});

app.get("/delete_by_idx", (_, res: Response) => {
  getFileFunction(res, "delete_by_idx", "delete_by_idx.html");
});

app.get("/add_delinquency", (_, res: Response) => {
  getFileFunction(res, "delinquency", "add_delinquency.html");
});

app.get("/download_dump", (_, res: Response) => {
  getFileFunction(res, "download_dump", "download_dump_page.html");
});

app.get("/cars_combinations", getCarsCombinations);
//

// POST
app.post("/change_punishment", PunishmentChanger);
app.post("/new_car", newCarAdder);
//

// DELETE
app.delete("/deleteData", carRemover);
//

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
