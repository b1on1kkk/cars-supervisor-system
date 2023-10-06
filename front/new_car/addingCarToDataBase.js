const button_to_add = document.querySelector(".input_button");

// добавление новой машины в массив

button_to_add.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");

  // создаем объект, который в будущем полетит в массив
  const obj = {};

  // проверка на значение: если значение имеется - устанавливавем его, в ином случае дефолтное "none"
  obj["brand"] = inputs[0].value === "" ? "none" : inputs[0].value;
  obj["licence"] = inputs[1].value === "" ? "none" : inputs[1].value;
  obj["color"] = inputs[2].value === "" ? "none" : inputs[2].value;
  obj["weight"] = inputs[3].value === "" ? 0 : inputs[3].value;
  obj["year_release"] = inputs[4].value === "" ? 0 : inputs[4].value;
  obj["engine_type"] = inputs[5].value === "" ? "none" : inputs[5].value;
  obj["delinquencies"] = inputs[6].value === "" ? 0 : inputs[6].value;
  obj["penalty"] = inputs[7].value === "" ? 0 : inputs[7].value;

  // кидаем запрос
  fetch("/new_car", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
});
