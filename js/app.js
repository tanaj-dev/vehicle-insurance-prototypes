// ! CREATE THE CONSTRUCTORS
// * Constructor of the Poliza
function Poliza(brand, year, type) {
  (this.brand = brand), (this.year = year), (this.type = type);
}
// ! CREATE PROTO TO CALCULATE THE PRICE OF THE POLIZA
Poliza.prototype.calculatePricePoliza = function () {
  /*
   1. American 1.15
   2. Asian 1.05
   3. European 1.35
  */

  // ? Variables
  let quantity;
  const base = 2000;

  // ? Validatation
  switch (this.brand) {
    case "1":
      quantity = base * 1.15;
      break;
    case "2":
      quantity = base * 1.05;
      break;
    case "3":
      quantity = base * 1.35;
      break;
    default:
      break;
  }

  // ? Read the year
  const diferenceOfYears = new Date().getFullYear() - this.year;
  // console.log(diferenceOfYears);

  // ? Decrease 3% per every year older
  quantity -= (diferenceOfYears * 3 * quantity) / 100;

  // ! VALIDATE THE TYPE OF THE POLIZA
  //? if the poliza type is: BASIC so increments a 30%
  //? if the poliza type is: COMPLETE so increments a 50%

  if (this.type === "basico") {
    quantity *= 1.3;
  } else {
    quantity *= 1.5;
  }

  return quantity;
  // console.log(quantity);
};

// * Constructor of the UI
function UI() {}

// ! CREATE PROTO TO SHOW THE YEARS IN THE SELECT
UI.prototype.showYearItems = () => {
  const max = new Date().getFullYear();
  const min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("OPTION");
    option.textContent = i;
    option.value = i;
    selectYear.appendChild(option);
  }
};

// ! CREATE PROTO TO SHOW THE ALERTS
UI.prototype.showAlerts = (alert, type) => {
  const div = document.createElement("DIV");
  if (type === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("alert", "mt-10");
  div.textContent = alert;

  // * Insert the alert in the HTML
  const form = document.querySelector("#cotizar-seguro");
  form.insertBefore(div, document.querySelector("#resultado"));

  // * Remove the alert within 3s
  setTimeout(() => {
    div.remove();
  }, 3000);
};
// ! CREATE PROTO TO SHOW THE SPINNER AND THE RESUME OF THE POLIZA
UI.prototype.showResultBuyedPoliza = (total, poliza) => {
  const { brand, year, type } = poliza;
  let brandName;

  switch (brand) {
    case "1":
      brandName = "American";
      break;
    case "2":
      brandName = "Asian";
      break;
    case "3":
      brandName = "European";
      break;
    default:
      break;
  }

  // ? Create the container to the resume
  const div = document.createElement("DIV");
  div.classList.add("mt-10");
  div.innerHTML = `
    <p class="header">Your Resumen</p>
    <p class="font-bold uppercase">poliza brand:<span class="font-normal"> ${brandName} </span></p>
    <p class="font-bold uppercase">poliza year:<span class="font-normal"> ${year} </span></p>
    <p class="font-bold uppercase">poliza type:<span class="font-normal capitalize"> ${type} </span></p>
    <p class="font-bold uppercase">total:<span class="font-normal"> $ ${total} </span></p>
  `;
  const resumeDiv = document.querySelector("#resultado");
  // ? This was moved to the setTimeout
  // resumeDiv.appendChild(div);

  // ? Create the spinner
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resumeDiv.appendChild(div);
  }, 3000);
};

// ! CREATE THE INSTANCE OF CONSTRUCTOR
const ui = new UI();
// console.log(ui);

// ! LOADING THE EVENT OF DOCUMENT
document.addEventListener("DOMContentLoaded", () => {
  // * Calling the Prototype
  ui.showYearItems();
});

// ! CREATE THE EVENTS
eventListeners();
function eventListeners() {
  const form = document.querySelector("#cotizar-seguro");
  form.addEventListener("submit", validateFormPoliza);
}

// ! FUNCTION TO VALIDATE THE FORM
function validateFormPoliza(e) {
  e.preventDefault();
  // console.log('Cotizing');

  // todo selecting the brand
  const brand = document.querySelector("#marca").value;
  // console.log(brand);

  // todo selecting the year
  const year = document.querySelector("#year").value;
  // console.log(year);

  // todo selecting the type
  const type = document.querySelector("input[name='tipo']:checked").value;
  console.log(type);

  // ! VALIDATE THAT THERE'S NO EMPTY FIELDS
  if (brand === "" || year === "" || type === "") {
    // console.log("You cant leave empty fields");
    ui.showAlerts("All the fields are required", "error");
    return;
  } else {
    // console.log("cotizing...");
    ui.showAlerts("Cotizing the Poliza...", "success");
  }
  // ! REMOVE OR HIDE THE EXISTS RESUME
  const resumeResults = document.querySelector("#resultado div");

  if (resumeResults !== null) {
    resumeResults.remove();
  }

  // ! CREATE TO INSTANCE OF THE POLIZA
  const poliza = new Poliza(brand, year, type);
  // poliza.calculatePricePoliza();

  // ? Create the variable that unites both protos
  const total = poliza.calculatePricePoliza();
  // console.log(poliza);

  // ! CALLING THE PROTO THAT RENDERS THE DATA OF THE BUYED POLIZA
  ui.showResultBuyedPoliza(total, poliza);
}
