const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", () => {
  fetch("/deleteData", {
    method: "DELETE",
    body: JSON.stringify(input.value),
  });
});
