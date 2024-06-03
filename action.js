let lightBtn = document.getElementById("light-btn");
let darkBtn = document.getElementById("dark-btn");
let body = document.getElementById("body");
let header = document.getElementById("hdr");
let parHeader = document.getElementById('header');
let mytable = document.getElementById("table");
let all = document.getElementById("all");
let overlay = document.getElementById("overlay");
let modeColor = "dark-btn";
let mood = "create";
let searchMode = "title";
let theme = "dark-theme";
let tmp;
var rows = document.getElementsByTagName("table")[0].rows;

console.log(rows);

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create-btn");
let deleteAllDiv = document.getElementById("delete-div");
// let deleteAllBtn =document.getElementById('delete-all');
let searchTitle = document.getElementById("search-title");
let searchCategory = document.getElementById("search-category");

// showData();
//get Total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#198754";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#bd4141";
  }
}

//create Product

let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}
submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (
      title.value != "" &&
      price.value != "" &&
      category.value != "" &&
      newProduct.count <= 100
    ) {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    }
  } else {
    dataProduct[tmp] = newProduct;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));
  showData();
  clearDate();
  getTotal();
};

//clear Data

function clearDate() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//show Product

function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" type="button" class="btn btn-success" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" type="button" class="btn btn-danger" id="update">Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  if (dataProduct.length > 0) {
    deleteAllDiv.innerHTML = `<button onclick="deleteAll()" type="button" class="btn btn-success" id="delete-all">
        Delete All (${dataProduct.length})</button>`;
  } else {
    deleteAllDiv.innerHTML = "";
  }
}
showData();

//delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

//delete All

function deleteAll() {
  dataProduct.splice(0);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

//update

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  category.value = dataProduct[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top,
    behavior: "smooth",
  });
}

//search mood

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "search-title") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = `Search by ${searchMode}`;
  search.focus();
  search.value = "";
  //   showData();
}

// search

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMode == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" type="button" class="btn btn-success" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" type="button" class="btn btn-danger" id="update">Delete</button></td>
        </tr>
        `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" type="button" class="btn btn-success" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" type="button" class="btn btn-danger" id="update">Delete</button></td>
            </tr>
            `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

/**********************************************************/

window.onresize = function () {
  if (window.innerWidth < 768) {
    all.classList.remove("container");
    all.classList.add("container-fluid");
  } else {
    all.classList.remove("container-fluid");
    all.classList.add("container");
  }
};
// localStorage.removeItem('darkMode');
function darkMode() {
  body.classList.add("dark-mode");
  darkBtn.classList.add("dark-mode-btn");
  lightBtn.classList.add("dark-mode-btn");
  mytable.classList.add("table-dark");
  header.style.color = "#FFF";
  parHeader.style.backgroundColor = '#2c3034';
  localStorage.setItem("theme", "dark-theme");
}
function lightMode() {
  body.classList.remove("dark-mode");
  darkBtn.classList.remove("dark-mode-btn");
  lightBtn.classList.remove("dark-mode-btn");
  mytable.classList.remove("table-dark");
  header.style.color = "#282a35";
  parHeader.style.backgroundColor = '#dffcea';
  localStorage.setItem("theme", "light-theme");
}

function changeMode(id) {
  if (id == modeColor) {
    darkMode();
  } else {
    lightMode();
  }
}

window.onload = () => {
  title.focus();
  if (localStorage.theme == "dark-theme") {
    darkMode();
  } else {
    lightMode();
  }
};
