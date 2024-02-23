var modal = document.getElementById("modal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = () => {
  modal.showModal()
}

span.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if(event.target == modal){
    modal.style.display = "none";
  }
}
