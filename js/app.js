// Declare
let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let nameSelect = document.getElementById("name");
let imgSelected = document.getElementById("imgSelect");
let releaseSelected = document.getElementById("release");
let submit = document.getElementById("submit");
let delArr = [];
let table = document.createElement("table");
//*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#

function MakeHeaderTable() {
  section2.appendChild(table);

  let tr = document.createElement("tr");
  table.appendChild(tr);

  let th = document.createElement("th");
  tr.appendChild(th);
  th.textContent = "Del";

  let th_1 = document.createElement("th");
  tr.appendChild(th_1);
  th_1.textContent = "Image";

  let th_2 = document.createElement("th");
  tr.appendChild(th_2);
  th_2.textContent = "Name";

  let th_3 = document.createElement("th");
  tr.appendChild(th_3);
  th_3.textContent = "release";
}
MakeHeaderTable;

class Movie {
  constructor(nameImg, imgSelect, release) {
    this.nameImg = nameImg;
    this.imgSelect = imgSelect;
    this.release = release;
  }
}
Movie.all = [];
let movie = new Movie();

function retriveOldData() {
  if (localStorage.getItem("movie") !== null) {
    let oldData = JSON.parse(localStorage.getItem("movie"));
    for (let i = 0; i < oldData.length; i++) {
      Movie.all.push(oldData[i]);
    }
    render();
  }
}
retriveOldData();

Movie.prototype.saveData = function () {
  this.nameImg = nameSelect.value;
  this.imgSelect = imgSelected.value;
  this.release = releaseSelected.value;

  Movie.all.push(new Movie(this.nameImg, this.imgSelect, this.release));
  saveLocal();
};

function saveLocal() {
  localStorage.setItem("movie", JSON.stringify(Movie.all));
}

function clearTable() {
  if (table.rows.length > 1) {
    table.removeChild(table.lastChild);
  }
}

function render() {
  let table = document.createElement("table");
  section2.appendChild(table);
  let td = document.createElement("td");

  for (let i = 0; i < Movie.all.length; i++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);

    td = document.createElement("td");
    tr.appendChild(td);
    td.textContent = "Delete";
    td.id = "delete" + i;
    delArr.push(td.id);

    td = document.createElement("td");
    tr.appendChild(td);
    td.textContent = i;

    td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = `<img src="./img/${Movie.all[i].imgSelect}.png" />`;

    td = document.createElement("td");
    tr.appendChild(td);
    td.textContent = Movie.all[i].nameImg;

    td = document.createElement("td");
    tr.appendChild(td);
    td.textContent = Movie.all[i].release;
  }
}

let form = document.getElementById("formMovie");
form.addEventListener("click", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();

  clearTable();
  movie.saveData();
  form.reset();
  render();
}
clearList.addEventListener("click", DelAll);
function DelAll(event) {
  event.preventDefault();
  clearTable();
}

table.addEventListener("click", DelRow);
function DelRow(e) {
  if (delArr.includes(e.target.id)) {
    let i = delArr.indexOf(e.target.id);
    delArr.splice(i, 1);
    table.deleteRow(i + 1);
  }
}
