document.getElementById("btnComeco").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const activeTab = tabs[0];

      // if(Object.values(await chrome.storage.sync.get(['intervalos'])).length == 0){
        await chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ["content.js"],
        });
      // }
      
      const objeto_dias_intervalos = await chrome.storage.sync.get(['intervalos']);
      const valores_dias_intervalos = objeto_dias_intervalos['intervalos'];
      const tabela = document.getElementById("tabelaIntervalos");
      
      numero_de_linhas = 0;
      for(indice_vdi in valores_dias_intervalos){
        if(valores_dias_intervalos[indice_vdi][1].length > numero_de_linhas){
          numero_de_linhas = valores_dias_intervalos[indice_vdi][1].length;
        }
      }

      celulas = [];
      for(n = 0; n < numero_de_linhas; n++){
        linha = tabela.insertRow();
        celulas[n] = [];
        for(c = 0; c < 5; c++){
          celulas[n][c] = linha.insertCell(c);
        }
      }

    for(indice_vdi in valores_dias_intervalos){
      dia_semana = valores_dias_intervalos[indice_vdi][0];
      intervalos_do_dia = valores_dias_intervalos[indice_vdi][1];

      for(indice_intervalo in intervalos_do_dia){
        inicio_horario = intervalos_do_dia[indice_intervalo][0];
        fim_horario = intervalos_do_dia[indice_intervalo][1];

        celulas[indice_intervalo][dia_semana].textContent = inicio_horario + ' - ' + fim_horario;
      }
    }
  })
  this.remove();
});

document.getElementById("btnModal").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const activeTab = tabs[0];

    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ["modal.js"],
    });
  })
});
