"use strict";
// globel
/////////////////////////////////////////////////
let myForm = document.getElementById("myForm");
let myTable = document.getElementById("myTable");

let ordersArray = [];

// function
/////////////////////////////////////////////////

function Order(name, type) {
  this.name = name;
  this.type = type;
  this.max = 20;
  this.price = getRandomInt(this.max);

  ordersArray.push(this);
  setItem();
}

// random function
function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1); // from 0 to max (20)
}

function setItem() {
  let stringy = JSON.stringify(ordersArray);
  localStorage.setItem("order", stringy);
}
function getItem() {
  let stringData = localStorage.getItem("order");
  let normalData = JSON.parse(stringData);

  if (normalData !== null) {
    ordersArray = normalData;
    creatTable();
  }
}

function creatTable() {
  myTable.textContent = "";

  // table head
  let trHead = document.createElement("tr");
  myTable.appendChild(trHead);

  let th1 = document.createElement("th");
  trHead.appendChild(th1);
  th1.textContent = "Order Image";

  let th2 = document.createElement("th");
  trHead.appendChild(th2);
  th2.textContent = "Order Details";

  let th3 = document.createElement("th");
  trHead.appendChild(th3);
  th3.textContent = "X";

  // table data
  for (let row = 0; row < ordersArray.length; row++) {
    let trEl = document.createElement("tr");
    myTable.appendChild(trEl);

    for (let col = 0; col < 3; col++) {
      let tdEl = document.createElement("td");
      trEl.appendChild(tdEl);

      if (col == 0) {
        let imgTayp = document.createElement("img");
        imgTayp.setAttribute("src", `../img/${ordersArray[row].type}.jpg`);
        tdEl.appendChild(imgTayp);
      } else if (col == 1) {
        let p1 = document.createElement("p");
        tdEl.appendChild(p1);
        p1.textContent = `Custamer Name: ${ordersArray[row].name}`;
        ///
        let p2 = document.createElement("p");
        tdEl.appendChild(p2);
        p2.textContent = `Food Type: ${ordersArray[row].type}`;
        ///
        let p3 = document.createElement("p");
        tdEl.appendChild(p3);
        p3.textContent = `Food Price: ${ordersArray[row].price}`;
      } else if (col == 2) {
        let x = document.createElement("button");
        tdEl.appendChild(x);
        x.textContent = "x";
        x.addEventListener("click", function delet(row) {
          ordersArray.splice(row, 1);

          setItem();
          creatTable();
        });
      }
    }
  }

  //   console.log(ordersArray);
}

function handelSubmit(event) {
  event.preventDefault();

  let name = event.target.custName.value;
  let type = event.target.foodType.value;

  new Order(name, type);

  creatTable();
}
myForm.addEventListener("submit", handelSubmit);

/////////////////////////////////////////////////////////////////

getItem();
