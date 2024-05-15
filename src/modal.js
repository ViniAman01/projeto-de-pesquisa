function desfazerExclusao(element){
  const div = element.target.parentNode;
  const p = div.childNodes[0];
  p.innerHTML = p.innerHTML.replace('<del>','');
  p.innerHTML = p.innerHTML.replace('</del>','');

  element.target.id = '';
  element.target.className = 'bt-excluir';
  element.target.innerText = 'Desfazer exclusao';
  element.target.removeEventListener("click",desfazerExclusao);
  element.target.addEventListener("click",excluirHorario);
}

function excluirHorario(element){
  const div = element.target.parentNode;
  const p = div.childNodes[0];

  p.innerHTML = '<del>' + p.innerHTML + '</del>';

  element.target.innerText = 'Desfazer exclusao';
  element.target.id = 'bt-editar';
  element.target.className = '';
  element.target.removeEventListener("click",excluirHorario);
  element.target.addEventListener("click",desfazerExclusao);
}

function adicionarHorario(element){
  const td = element.target.parentNode.parentNode;
  const p_horarios = td.querySelectorAll("p");
  const value_novo_horario = td.querySelector("input").value;
  const obj_novo_horario = new Horario(value_novo_horario,':');
  let element_aux_horario;

  p_horarios.forEach((e) => {
    const obj_aux_horario = new Horario(e.innerText,':');

    if(obj_aux_horario.ehMaior(obj_novo_horario)){
      element_aux_horario = e;
      return false; 
    }else{
      return true;
    }
  });

  const element_novo_horario = document.createElement("p");
  element_novo_horario.innerText = value_novo_horario;

  element_aux_horario.insertAdjacentElement('beforebegin',)
}

(async function(){
  const dias_irregulares = (await chrome.storage.local.get(['dias_irregulares']))['dias_irregulares'];
  const horarios_regulares = (await chrome.storage.local.get(['horarios_regulares']))['horarios_regulares'];
  const tabela = document.getElementById("tabela-irregulares");

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

      e_s.forEach((e,index) => {
        div_p_botao = document.createElement("div");

        if(index % 2 == 0){
          prefix = 'E:'
        }else{
          prefix = 'S:'
        }

        div_p_botao.insertAdjacentHTML('beforeend', '<p>' + prefix + e + '</p>');

        botao_excluir = document.createElement("button");

        botao_excluir.className = 'bt-excluir';

        botao_excluir.innerText = 'Excluir Horario';

        botao_excluir.addEventListener("click", excluirHorario);

        div_p_botao.insertAdjacentElement('beforeend', botao_excluir);

        e_s_element.insertAdjacentElement('beforeend', div_p_botao)
      });

      dia_horarios_regulares_string = '';
      dia_horarios_regulares.forEach(e => {
        dia_horarios_regulares_string += e[0] + ' - ' + e[1] + '<br>';
      });

      e_s_element.insertAdjacentHTML('beforeend','<br> <input type="time" step="1">');

      botao_adicionar = document.createElement("button");
      botao_adicionar.innerHTML = '<button id="bt-editar">Adicionar Horario</button>';
      botao_adicionar.addEventListener("click", adicionarHorario);

      e_s_element.insertAdjacentElement('beforeend',botao_adicionar);

      dia_data_element.innerHTML = dia_data_string;
      dia_horarios_regulares_element.innerHTML = dia_horarios_regulares_string;
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
