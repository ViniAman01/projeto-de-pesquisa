document.getElementById("btnIrregulares").addEventListener("click", async function(){
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
    let horarios_dia = new Array();
    intervalos.forEach(e => {
      if(e[0] == dia_semana[tokens[1]]){
        horarios_dia = e[1];
      }
    });
    tabela = document.getElementById("tabelaIrregulares");

    dia = `${tokens[0]} ${tokens[1]}`;

    e_s = tokens.filter(i => /(E:|S:)/.test(i) && !/(PE:)/.test(i));
    e_s_string = e_s[0] + '\n';
    e_s.forEach(e => {
      if(e != e_s[0]){
        e_s_string = e_s_string + e + '\n';
      }
    });

    aula_pe = horarios_dia[0][0] + ' - ' + horarios_dia[0][1] + '\n';
    horarios_dia.forEach(e => {
      if(e != e[0]){
        aula_pe = aula_pe + e[0] + ' - ' + e[1] + '\n';
      }
    });

    linha = tabela.insertRow()
    linha.insertCell(0).textContent = dia;
    linha.insertCell(1).textContent = e_s_string;
    linha.insertCell(2).textContent = aula_pe;
  });
  this.remove();
});
