"use strict";
// Реализуйте клиентскую и серверную часть обработчиков для базы розыска автомобилей с характеристиками:
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// GET requests
const getAllCars_1 = __importDefault(require("./controllers/GET/getAllCars"));
const getFileFunction_1 = __importDefault(require("./controllers/GET/getFileFunction"));
const getCarsCombinations_1 = __importDefault(require("./controllers/GET/getCarsCombinations"));
//
// POST requests
const panishmentChanger_1 = __importDefault(require("./controllers/POST/panishmentChanger"));
const newCarAdder_1 = __importDefault(require("./controllers/POST/newCarAdder"));
//
// DELETE requests
const carRemover_1 = __importDefault(require("./controllers/DELETE/carRemover"));
//
const cors = require("cors");
const app = (0, express_1.default)();
const port = 2005;
app.use(express_1.default.static(path_1.default.join(__dirname, "../../", "front")));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// GET
app.get("/", (_, res) => {
    (0, getFileFunction_1.default)(res, "", "main_page.html");
});
app.get("/cars", getAllCars_1.default);
app.get("/all_cars", (_, res) => {
    // getFileFunction - функция, которая достает статический файл html. Принимает 3 параметра
    // ответную часть
    // папку, из которой нужно взять файл
    // и название файла
    (0, getFileFunction_1.default)(res, "all_cars", "all_cars.html");
});
app.get("/add_car", (_, res) => {
    (0, getFileFunction_1.default)(res, "new_car", "adding_new_car.html");
});
app.get("/cars_by_combinations", (_, res) => {
    (0, getFileFunction_1.default)(res, "show_by_combination", "cars_by_combinations.html");
});
app.get("/delete_by_idx", (_, res) => {
    (0, getFileFunction_1.default)(res, "delete_by_idx", "delete_by_idx.html");
});
app.get("/add_delinquency", (_, res) => {
    (0, getFileFunction_1.default)(res, "delinquency", "add_delinquency.html");
});
app.get("/download_dump", (_, res) => {
    (0, getFileFunction_1.default)(res, "download_dump", "download_dump_page.html");
});
app.get("/cars_combinations", getCarsCombinations_1.default);
//
// POST
app.post("/change_punishment", panishmentChanger_1.default);
app.post("/new_car", newCarAdder_1.default);
//
// DELETE
app.delete("/deleteData", carRemover_1.default);
//
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
