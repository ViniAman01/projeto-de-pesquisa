(async function(){
  const linha_tabela_texto = await chrome.storage.local.get(['linhas_tabela_texto']);
  const intervalos = (await chrome.storage.sync.get(['intervalos']))['intervalos'];

  dia_semana = {
    'Segunda-feira': 0,
    'Terça-feira': 1,
    'Quarta-feira': 2,
    'Quinta-feira': 3,
    'Sexta-feira': 4
  };

  linha_tabela_texto['linhas_tabela_texto'].forEach(linha => {
    tokens = linha.split('\n').filter(e => e != '' && e != '\t');
    console.log(tokens);
    let horarios_dia = new Array();
    intervalos.forEach(e => {
      if(e[0] == dia_semana[tokens[1]]){
        horarios_dia = e[1];
      }
    });
    tabela = document.getElementById("tabela-irregulares");

    dia = `${tokens[0]}<br>${tokens[1]}`;

    e_s = tokens.filter(i => /(E:|S:)/.test(i) && !/(PE:)/.test(i));
    e_s_string = '';
    e_s.forEach(e => {
      e_s_string = e_s_string + e + '<br>';
    });

    aula_pe = '';
    horarios_dia.forEach(e => {
      aula_pe = aula_pe + e[0] + ' - ' + e[1] + '<br>';
    });

    linha = tabela.insertRow()
    linha.insertCell(0).innerHTML = dia;
    linha.insertCell(1).innerHTML = e_s_string;
    linha.insertCell(2).innerHTML = aula_pe;
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
  const tabela = document.getElementById("tabela-irregulares");
});
