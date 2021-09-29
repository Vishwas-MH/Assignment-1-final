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
    if (checkClass.className === "side_menu_bar") {
      checkClass.className += "close";
    } else {
      checkClass.className = "side_menu_bar";
    }
}

function selectAll(source) {
    checkboxes = document.getElementsByClassName("checkbox");
    for (var t = 0, n = checkboxes.length; t < n; t++) {
      checkboxes[t].checked = source.checked;
    }
  }

function sortTableByColumn(table, column, asc = true){
    const dirModifier = asc ? 1 : -1;
    const tBody= table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

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
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
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


function SearchTable(){
    let newinput = document.getElementById("input_search");
    let filter = newinput.value.toUpperCase();
    let tablevalue = document.getElementById("table-sortable");
    let rows = tablevalue.getElementsByTagName("tr");
    let td,trContent;

    for (i = 1; i < rows.length; i++)
    {
        td = rows[i].getElementsByTagName("td")[1];
        
        trContent = td.textContent;
        if (trContent.toUpperCase().indexOf(filter) > -1)
        {   
            rows[i].style.display = "table";
        }
        else{            
            rows[i].style.display = "none";
        }        
    }
}

function debounce(func, timeout = 600){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const SearchDelay = debounce(() => SearchTable());