(async function(){
  const dias_irregulares = (await chrome.storage.local.get(['dias_irregulares']))['dias_irregulares'];
  const horarios_regulares = (await chrome.storage.local.get(['horarios_regulares']))['horarios_regulares'];

  dias_irregulares.forEach(dia_irregular => {
    dia_data = dia_irregular[0];
    e_s = dia_irregular[1];
    dia_horarios_regulares = horarios_regulares[dia_data[1]];

    if(dia_horarios_regulares){
      dia_data_string = dia_data[0] + '<br>' + dia_data[1];

      e_s_string = '';
      parity = 0;
      e_s.forEach(e => {
        if(parity % 2 == 0){
          e_s_string += 'E:' + e + '<br>';
        }else{
          e_s_string += 'S:' + e + '<br>';
        }
        parity++;
      });

      dia_horarios_regulares_string = '';
      dia_horarios_regulares.forEach(e => {
        dia_horarios_regulares_string += e[0] + ' - ' + e[1] + '<br>';
      });


      tabela = document.getElementById("tabela-irregulares");
      linha = tabela.insertRow()
      linha.insertCell(0).innerHTML = dia_data_string;
      linha.insertCell(1).innerHTML = e_s_string;
      linha.insertCell(2).innerHTML = dia_horarios_regulares_string;
    }
  });
  
  const modal = document.getElementById("modal");
  modal.showModal();  
  console.log("modal abriu");
})()

document.getElementById("bt-fechar").addEventListener("click", function() {
  modal.close();
});


document.getElementById("bt-voltar-para-topo").addEventListener("click", function(){
  const modal = document.getElementById("modal");
  modal.scroll({top: 0, left: 0, behavior: 'smooth'});
});

document.getElementById("bt-editar").addEventListener("click", function () {
  const modal = document.getElementById("modal");
  const coluna_central = modal.querySelectorAll("td:nth-child(2)");
  coluna_central.forEach(e => {
    e.setAttribute("contenteditable","true");
    e.style.backgroundColor = '#ffffff';
  });
  this.style.display = 'none';
  document.getElementById("bt-salvar").style.display = 'initial';
});

document.getElementById("bt-salvar").addEventListener("click", function() {
  const modal = document.getElementById("modal");
  const coluna_central = modal.querySelectorAll("td:nth-child(2)");
  var i = 0;
  coluna_central.forEach(e => {
    e.setAttribute("contenteditable","false");
    if(i % 2 == 0){
      e.style.backgroundColor = 'rgb(247, 243, 243)';
    }else{
      e.style.backgroundColor = 'rgb(204, 203, 203)';
    } 
    i = i+1;
  });
  this.style.display = 'none';
  document.getElementById("bt-editar").style.display = 'initial';
  const tabela = document.getElementById("tabela-irregulares");
});
