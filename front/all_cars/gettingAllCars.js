// получение данных и отрисовка шаблона

fetch("http://localhost:2005/cars")
  .then((response) => response.json())
  .then((data) => {
    const parent = document.querySelector(".cars_wrapper");

    const cars = data
      .map((e) => {
        return `<div class='cars-wrapper'>
                    <div>Brand: ${e.brand}</div>
                    <div>Licence: ${e.licence}</div>
                    <div>Color: ${e.color}</div>
                    <div>Weight: ${e.weight}</div>
                    <div>Year release: ${e.year_release}</div>
                    <div>Engine type: ${e.engine_type}</div>
                    <div>Delinquencies: ${e.delinquencies}</div>
                    <div>Penalty ${e.penalty}</div>
                    <br>
                    <hr>
                </div>`;
      })
      .join("");

    parent.innerHTML = cars;
  })
  .catch((err) => console.error(err));
