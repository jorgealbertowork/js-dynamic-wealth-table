"use-strict";

const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// add new object to data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// format money
function formatMoney(number) {
  return `$ ${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const localData = await res.json();
  const user = localData?.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// map: map everyone's money and double it
function doubleMoney() {
  data = data.map((user) => {
    return {
      ...user,
      money: user.money * 2,
    };
  });
  updateDOM();
}

// sort: sort the data by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// filter: filter only the millionares
function showOnlyMillionaires() {
  data = data.filter((user) => user.money >= 1000000);
  updateDOM();
}

// reduce: reduce everyone's money to a single value
function calculateEntireWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `
    <h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>
  `;

  main.appendChild(wealthElement);
}

// update DOM with new data
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  // forEach: create and render each line in the table
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showOnlyMillionaires);
calculateWealthBtn.addEventListener("click", calculateEntireWealth);
