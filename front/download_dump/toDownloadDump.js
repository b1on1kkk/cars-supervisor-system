import DumpDownloader from "../show_by_combination/dumpDownloader.js";

const button = document.querySelector("button");

button.addEventListener("click", () => {
  fetch("http://localhost:2005/cars")
    .then((response) => response.json())
    .then((data) => {
      DumpDownloader("cars.json", data);
    })
    .catch((error) => console.error(error));
});
