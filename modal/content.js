var modal = document.getElementById("modal");

var btn = document.getElementById("myBtn");

var btn_submit = document.getElementById("btn-submit")

var span = document.getElementsByClassName("close")[0];

btn.onclick = () => {
  modal.showModal()
}

btn_submit.onclick = () => {
  modal.close()
}

span.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if(event.target == modal){
    modal.style.display = "none";
  }
}
