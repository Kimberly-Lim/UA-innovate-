/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    //make pretty
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    //make pretty
    document.body.style.backgroundColor = "blue";
  }
 