function desfazerExclusao(element){
  const div = element.target.parentNode;
  const p = div.childNodes[0];
  p.innerHTML = p.innerHTML.replace('<del>','');
  p.innerHTML = p.innerHTML.replace('</del>','');

  element.target.id = '';
  element.target.className = 'bt-excluir';
  element.target.innerText = 'Desfazer exclusao';
  element.target.removeEventListener("click",desfazerExclusao);
  element.target.addEventListener("click",excluirHorarioOriginal);
}

function excluirHorarioOriginal(element){
  const div = element.target.parentNode;
  const p = div.childNodes[0];

  p.innerHTML = '<del>' + p.innerHTML + '</del>';

  element.target.innerText = 'Desfazer exclusao';
  element.target.id = 'bt-editar';
  element.target.className = '';
  element.target.removeEventListener("click",excluirHorarioOriginal);
  element.target.addEventListener("click",desfazerExclusao);
}

async function excluirHorarioAdicionado(element){
  var json_dias_irregulares = (await chrome.storage.local.get(['dias_irregulares']))['dias_irregulares'];
  const dias_irregulares = new Map(JSON.parse(json_dias_irregulares));
  const key_dias_irregulares = element.target.parentNode.parentNode.parentNode.parentNode.firstChild.innerText.split("\n")[0];
  const dia_e_s_array = dias_irregulares.get(key_dias_irregulares);
  const e_s_array = dia_e_s_array[1];
  const e_s_div_elements = element.target.parentNode.parentNode.querySelectorAll("p");

  let index_horario_exclusao = 0;
  while(e_s_div_elements[index_horario_exclusao].innerText != element.target.parentNode.firstChild.innerText){
    index_horario_exclusao++;
  }

  e_s_array.splice(index_horario_exclusao,1);

  dia_e_s_array[1] = e_s_array;
  dias_irregulares.set(key_dias_irregulares,dia_e_s_array); 
  json_dias_irregulares = JSON.stringify(Array.from(dias_irregulares));
  chrome.storage.local.set({'dias_irregulares': json_dias_irregulares});
  element.target.parentNode.remove();
}

function criaES(horario,index){
  let div_p_botao = document.createElement("div");

  if(index % 2 == 0){
    prefix = 'E:'
  }else{
    prefix = 'S:'
  }

  div_p_botao.insertAdjacentHTML('beforeend', '<p>' + prefix + horario + '</p>');

  let botao_excluir = document.createElement("button");

  botao_excluir.className = 'bt-excluir';

  botao_excluir.innerText = 'Excluir Horario';

  if(horario.indexOf('*') == -1){
    botao_excluir.addEventListener("click", excluirHorarioOriginal);
  }else{
    botao_excluir.addEventListener("click", excluirHorarioAdicionado);
  }

  div_p_botao.insertAdjacentElement('beforeend', botao_excluir);

  return div_p_botao;
}

function criaDivES(e_s_array){
  var e_s_div = document.createElement("div");

  e_s_array.forEach((e,index) => {
    const div_p_botao = criaES(e,index);
    e_s_div.insertAdjacentElement('beforeend', div_p_botao)
  });

  return e_s_div;
}

function criaCelulaES(e_s_array,e_s_celula){

  const e_s_div = criaDivES(e_s_array);

  e_s_celula.insertAdjacentElement('beforeend', e_s_div)

  e_s_celula.insertAdjacentHTML('beforeend','<br> <input type="time" step="1">');

  botao_adicionar = document.createElement("button");
  botao_adicionar.id = 'bt-editar';
  botao_adicionar.innerText = 'Adicionar Horario';
  botao_adicionar.addEventListener("click", adicionarHorario);

  e_s_celula.insertAdjacentElement('beforeend',botao_adicionar);
}

async function adicionarHorario(element){
  const td = element.target.parentNode;
  const value_novo_horario = td.querySelector("input").value;
  if(value_novo_horario){
    var json_dias_irregulares = (await chrome.storage.local.get(['dias_irregulares']))['dias_irregulares'];
    const dias_irregulares = new Map(JSON.parse(json_dias_irregulares));
    const key_dias_irregulares = td.parentNode.firstChild.innerText.split("\n")[0];
    const dia_e_s_array = dias_irregulares.get(key_dias_irregulares);
    const e_s_array = dia_e_s_array[1];
    const obj_novo_horario = new Horario(value_novo_horario,':');
    let index_e_s_child;

    e_s_array.every((e,index) => {
      horario = e.replace('*','');
      let obj_aux_horario = new Horario(horario,':');
      index_e_s_child = index;

      if(obj_aux_horario.ehIgual(obj_novo_horario)){
        index_e_s_child = -1;
        return false;
      }

      if(obj_aux_horario.ehMaior(obj_novo_horario)){
        return false; 
      }

      return true;
    });

    if(index_e_s_child != -1){
      const e_s_div_childs = td.firstChild.childNodes;
      if(index_e_s_child == e_s_array.length-1){
        const e_s_div = criaES(value_novo_horario + '*',e_s_array.length);
        td.firstChild.insertAdjacentElement('beforeend',e_s_div);
      }else{
        const e_s_div = criaES(value_novo_horario + '*',index_e_s_child);
        e_s_div_childs[index_e_s_child].insertAdjacentElement('beforebegin',e_s_div);
      }

      e_s_array.splice(index_e_s_child,0,value_novo_horario + '*');

      dia_e_s_array[1] = e_s_array;
      dias_irregulares.set(key_dias_irregulares,dia_e_s_array); 
      json_dias_irregulares = JSON.stringify(Array.from(dias_irregulares));
      chrome.storage.local.set({'dias_irregulares': json_dias_irregulares});
    }
  }
}

(async function(){
  const json_dias_irregulares = (await chrome.storage.local.get(['dias_irregulares']))['dias_irregulares'];
  const dias_irregulares = new Map(JSON.parse(json_dias_irregulares));
  const horarios_regulares = (await chrome.storage.local.get(['horarios_regulares']))['horarios_regulares'];
  const tabela = document.getElementById("tabela-irregulares");

  dias_irregulares.forEach((value,data) => {
    dia_semana = value[0];
    dia_horarios_regulares = horarios_regulares[dia_semana];
    if(dia_horarios_regulares){
      e_s_array = value[1];

      linha = tabela.insertRow()
      dia_data_celula = linha.insertCell(0); 
      e_s_celula = linha.insertCell(1);
      dia_horarios_regulares_element = linha.insertCell(2);

      dia_data_string =  data + '<br>' + dia_semana;

      criaCelulaES(e_s_array,e_s_celula);

      dia_horarios_regulares_string = '';
      dia_horarios_regulares.forEach(e => {
        dia_horarios_regulares_string += e[0] + ' - ' + e[1] + '<br>';
      });

      
      dia_data_celula.innerHTML = dia_data_string;
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
