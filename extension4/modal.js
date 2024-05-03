(async function(){
  console.log("executou script");
  const linha_tabela_texto = await chrome.storage.local.get(['linhas_tabela_texto']);
  const intervalos = (await chrome.storage.sync.get(['intervalos']))['intervalos'];

  console.log(linha_tabela_texto);
  console.log(intervalos);

  dia_semana = {
    'Segunda-feira': 0,
    'Terça-feira': 1,
    'Quarta-feira': 2,
    'Quinta-feira': 3,
    'Sexta-feira': 4
  };

  linha_tabela_texto['linhas_tabela_texto'].forEach(linha => {
    console.log(linha);
    tokens = linha.split('\n').filter(e => e != '' && e != '\t');
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
  
  console.log("Finalizou foreach")

  const modal = document.getElementById("modal");
  modal.showModal();
  console.log("abriu modal");

  document.getElementById("btn-close").addEventListener("click", function() {
    modal.close();
  });

  console.log("adicionou evento de fechar botão");
})()
