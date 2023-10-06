const button = document.querySelector("button");
const inputs = document.querySelector(".main").querySelectorAll("input");

// получаем тип наказания
const toChooseInputs = document
  .querySelector(".penalty_type")
  .querySelectorAll("input");

button.addEventListener("click", () => {
  const licence_plate = inputs[0].value;
  const value = inputs[1].value;

  // если поля не пустые - работаем
  if (licence_plate !== "" && value !== "") {
    // отправляем JSON файл, который имеет ключи:

    // {
    //  licence: - номер авто
    //  value: - на какое значение поменять
    //  status - тк я объединил 5 и 6 таску усложений, а они похожи, мне пришло в голову сделать простой ключ, который определяет
    //  что нужно сделать: добавить новое значние value в кол-во правонарушений или в сумму неуплаченных штрафов
    // }

    fetch("/change_punishment", {
      method: "POST",
      body: JSON.stringify({
        licence: licence_plate,
        value: value,
        status: toChooseInputs[0].checked
          ? "change_delinquency"
          : "change_penalty",
      }),
    });
  }
});
