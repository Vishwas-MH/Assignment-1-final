const scrolltoRight = document.getElementById("scroll_next");
const scrolltoLeft = document.getElementById("scroll_prev");

scrolltoRight.onclick = function () {
    document.getElementById("recommended_panel").scrollLeft -= 100;
};
scrolltoLeft.onclick = function () {
    document.getElementById("recommended_panel").scrollLeft += 100;
};

function displaySide() {
    let checkClass = document.getElementById("side_menu");
    let textClass = document.getElementById("side_text");
    let textClass2 = document.getElementById("side_text2");
    if (checkClass.className === "side_menu_bar") {
        checkClass.className += "close";
        textClass.className += "close";
        textClass2.className += "close";
    } else {
        checkClass.className = "side_menu_bar";
        textClass.className = "side_subtext";
        textClass2.className = "side_subtext";
    }
}

function selectAll(source) {
    checkboxes = document.getElementsByClassName("checkbox");
    for (var t = 0, n = checkboxes.length; t < n; t++) {
        checkboxes[t].checked = source.checked;
    }
}

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});


sortTableByColumn(document.querySelector("table"), 1);


function SearchTable() {
    let newinput = document.getElementById("input_search");
    let filter = newinput.value.toUpperCase();
    let tablevalue = document.getElementById("table-sortable");
    let rows = tablevalue.getElementsByTagName("tr");
    let td, trContent;

    for (i = 1; i < rows.length; i++) {
        td = rows[i].getElementsByTagName("td")[1];

        trContent = td.textContent;
        if (trContent.toUpperCase().indexOf(filter) > -1) {
            rows[i].style.display = "table";
        }
        else {
            rows[i].style.display = "none";
        }
    }
}

function debounce(func, timeout = 600) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const SearchDelay = debounce(() => SearchTable());


let tableElement = document.getElementById("table-sortable");
let tableBody = tableElement.tBodies[0];
let tr = Array.from(tableBody.querySelectorAll("tr"));
let ul = document.querySelector("ul");
var arrayTr = [];
for (let i = 0; i < tr.length; i++) {
    arrayTr.push(tr[i]);
}

let limit = 5;

function displayTable(limit) {
    tableBody.innerHTML = "";
    for (let i = 0; i < limit; i++) {
        tableBody.appendChild(arrayTr[i]);
    }
    buttonGereration(limit);
}

function buttonGereration(limit) {
    var noftr = arrayTr.length;
    if (noftr <= limit) {
        ul.style.display = "none";
    }
    else {
        ul.style.display = "flex";
        var nofPage = Math.ceil(noftr / limit);
        updatepage(1);
        var updateflagpage = 0;
        for (let i = 1; i <= nofPage; i++) {


            let li = document.createElement("li");
            li.className = "list";
            let a = document.createElement("a");
            a.href = "#";
            a.setAttribute("data-page", i);
            a.setAttribute("id", "datapage" + i);
            if (updateflagpage == 0) {
                updateflagpage = 1;
                a.setAttribute("class", "activepage");
            }
            li.appendChild(a);
            a.innerText = i;
            ul.insertBefore(li, ul.querySelector(".nextId"));
            ul.insertBefore(li, document.getElementById("tableList").childNodes[3]);

            a.onclick = (e) => {
                let x = e.target.getAttribute("data-page");
                updatepage(x);
                tableBody.innerHTML = "";
                x--;
                let start = limit * x;
                let end = start + limit;
                let page = arrayTr.slice(start, end);

                for (let i = 0; i < page.length; i++) {
                    let item = page[i];
                    tableBody.appendChild(item);
                }
            };
        }
    }
    var z = 0, flag = 0;
    function nextElement() {
        if (this.id == "nextId") {
            flag = 1;
            console.log(z);
            z == arrayTr.length - limit ? (z = 0) : z / limit + 1 == nofPage ? z : (z += limit);
        }

        if (this.id == "prevId") {
            flag = 1;
            console.log(z);
            z == 0 ? arrayTr.length - limit : (z -= limit);
        }
        updatepage(z / limit + 1);

        tableBody.innerHTML = "";
        for (let i = z; i < z + limit; i++) {
            if (arrayTr[i] != null) {
                tableBody.appendChild(arrayTr[i]);
            }
            else {
                break;
            }
        }
    }

    document.getElementById("prevId").onclick = nextElement;
    document.getElementById("nextId").onclick = nextElement;
}

displayTable(5);

function onChangeGoToPage(go) {
    var noftr = arrayTr.length;
    console.log(noftr);
    var nofPage = Math.ceil(noftr / limit);
    console.log(nofPage);
    if (go <= nofPage && go > 0) {

        var goto = go - 1;
        updatepage(go);
        if (nofPage < goto) {
            console.log("invalid go to");
            return;
        }
        let offset = (goto * limit);
        tableBody.innerHTML = "";
        for (let i = offset; i < (offset + limit); i++) {
            if (arrayTr[i] != null) {
                tableBody.appendChild(arrayTr[i]);
            }
            else {
                break;
            }
        }
    }
}
const GoToPage = debounce((go) => onChangeGoToPage(go));

function updatepage(go) {
    var noftr = arrayTr.length;

    var spanvalue1 = document.getElementById("goto_lower");
    spanvalue1.textContent = (go * limit + 1 - limit);

    var spanvalue2 = document.getElementById("goto_upper");
    if(go * limit + 1 - limit == 11){
        spanvalue2.textContent = (go * limit - limit) + Math.ceil(noftr/limit);
    }
    else{
        spanvalue2.textContent = (go * limit);
    }
    
}