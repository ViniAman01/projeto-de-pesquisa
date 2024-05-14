(async function(){
  const dias_irregulares = (await chrome.storage.local.get(['dias_irregulares']))['dias_irregulares'];
  const horarios_regulares = (await chrome.storage.local.get(['horarios_regulares']))['horarios_regulares'];
  const tabela = document.getElementById("tabela-irregulares");

  linha_e_s_index = 0;
  dias_irregulares.forEach(dia_irregular => {
    dia_data = dia_irregular[0];
    e_s = dia_irregular[1];
    dia_horarios_regulares = horarios_regulares[dia_data[1]];
    if(dia_horarios_regulares){

      linha = tabela.insertRow()
      dia_data_element = linha.insertCell(0); 
      e_s_element = linha.insertCell(1);
      dia_horarios_regulares_element = linha.insertCell(2);

      dia_data_string = dia_data[0] + '<br>' + dia_data[1];

      e_s_index_botao = 0;
      e_s.forEach(e => {

        if(e_s_index_botao % 2 == 0){
          e_s_element.insertAdjacentHTML('beforeend', 'E:' + e);
        }else{
          e_s_element.insertAdjacentHTML('beforeend', 'S:' + e);
        }

        botao_excluir = document.createElement("button");

        botao_excluir.innerHTML = `<button class="linha_e_s-${linha_e_s_index} bt-excluir" id="bt-excluir-${e_s_index_botao}">Excluir Horario</button> <br>`;

        botao_excluir.addEventListener("click", (e) => {
          console.log(`class: ${e.target.className} id: ${e.target.id}`);
        });

        e_s_element.insertAdjacentElement('beforeend',botao_excluir);

        e_s_index_botao++;
      });

      dia_horarios_regulares_string = '';
      dia_horarios_regulares.forEach(e => {
        dia_horarios_regulares_string += e[0] + ' - ' + e[1] + '<br>';
      });

      dia_data_element.innerHTML = dia_data_string;
      dia_horarios_regulares_element.innerHTML = dia_horarios_regulares_string;

      linha_e_s_index++;
    }
  });
  
  const modal = document.getElementById("modal");
  modal.showModal();  
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
});
