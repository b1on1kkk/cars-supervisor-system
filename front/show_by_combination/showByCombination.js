import DumpDownloader from "./dumpDownloader.js";

const button = document.querySelector(".show-cars");
const downloadDump = document.querySelector(".dump-downloader");

button.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");

  const obj = {};

  // получаем статусы выбранных checkbox-ов
  obj["brand"] = inputs[0].checked;
  obj["licence"] = inputs[1].checked;
  obj["color"] = inputs[2].checked;
  obj["weight"] = inputs[3].checked;
  obj["year_release"] = inputs[4].checked;
  obj["engine_type"] = inputs[5].checked;
  obj["delinquencies"] = inputs[6].checked;
  obj["penalty"] = inputs[7].checked;

  // создаем массив ключей, на основании которого будет строиться строка запроса на фильтрацию
  const keysArray = [];

  // проверяем какие ключи выбраны и закидываем в массив
  for (const key in obj) {
    if (obj[key] === true) keysArray.push(key);
  }

  // если массив не пустой строим массив
  if (keysArray.length !== 0) {
    // создаем ссылку запроса
    let link = "";

    // начальный запрос
    link = `?${keysArray[0]}=${keysArray[0]}`;

    // и, если запросов больше, чем 1, записываются ещё
    for (let i = 1; i < keysArray.length; i++) {
      link = link + `&${keysArray[i]}=${keysArray[i]}`;
    }

    // запрашиваем
    fetch(`http://localhost:2005/cars_combinations${link}`)
      .then((response) => response.json())
      .then((data) => {
        // и только после того, как пользователь нажал на кнопку показа "отфильтрованных" данных - ему позволяется скачать дамп
        downloadDump.addEventListener("click", () =>
          DumpDownloader("combination-car-data.json", data)
        );
        //

        // получается цикл в цикл, поясняю:
        // изначально мы обходим ВСЕ автомобили
        const cars = data
          .map((e) => {
            // получаем объект и формируем ключи этого объекта как массив, который в дальнейшем будем обходить
            return (
              Object.keys(e)
                // обходим
                .map((keys) => {
                  // и отрисовываем данные, обращаясь к конкретному объекту по ключу
                  return `<div>${keys}: ${e[keys]}</div>`;
                })
                .join("") + "<br>" // для визуала, не боле :)
            );
          })
          .join("");

        const parent = document.querySelector(".combinations_wrapper");

        // и записываем
        parent.innerHTML = cars;
      })
      .catch((err) => console.error(err));
  }
});
