document.getElementById("btnIrregulares").addEventListener("click", async function(){
  tabela_irregulares = {
    'dia': null,
    'es': null,
    'aula_pe': null,
  }
  const linha_tabela_texto = await chrome.storage.sync.get(['linha_tabela_texto']);
  console.log(linha_tabela_texto['linha_tabela_texto']);
});
