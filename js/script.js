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