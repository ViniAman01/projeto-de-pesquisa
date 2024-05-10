async function verificaHorarios(){
    const tabela_frequencias = document.querySelector("#tabela-frequencias");
    todos_horarios_entrada_saida_td = tabela_frequencias.querySelectorAll("td:nth-child(2)")
    let linhas_tabela_texto = new Array(); 

    for(i = 0; i < todos_horarios_entrada_saida_td.length; i++){
      entrada_saida = todos_horarios_entrada_saida_td[i].innerText.split(/(?:E:|S:)/).filter(e2 => e2 !== '' && !/^Sem/i.test(e2));
      if(entrada_saida.length != 0 && entrada_saida.length % 2 == 0){
        numero_do_dia = dia[todas_datas_aulas_td[i].innerText.split('\n')[2]];
        intervalos_do_dia = [];
        const intervalos_de_tempo_dias_semana = await chrome.storage.sync.get(['intervalos']);
        intervalos_de_tempo_dias_semana['intervalos'].forEach(e => {if(e[0] == numero_do_dia){intervalos_do_dia = e[1]}});

        bool = true;
        k = 0;
        while(bool && k < intervalos_do_dia.length){
          aux_intervalo_aula_para_comparacao = new Intervalo(intervalos_do_dia[k][0], intervalos_do_dia[k][1], ':');
          j = 0;
          bool = false;
          while(j < entrada_saida.length){
            aux_intervalo_e_s_para_comparacao = new Intervalo(entrada_saida[j], entrada_saida[j+1],':');
            if(aux_intervalo_aula_para_comparacao.estaContidoEm(aux_intervalo_e_s_para_comparacao)){
              bool = true;
            }
            j = j+2;
          }
          if(!bool){
            const linha = tabela_frequencias.querySelectorAll('tr')[i+2].innerText;
            linhas_tabela_texto.push(linha);
          }
          k++;
        }
      }
      else{
        if(entrada_saida.length != 0 && entrada_saida.length % 3 == 0){
          const linha = tabela_frequencias.querySelectorAll('tr')[i+2].innerText;
          linhas_tabela_texto.push(linha);
        }
      }
    }
    chrome.storage.local.set({'linhas_tabela_texto': linhas_tabela_texto});
}

async function fetchHTML() {
  const modal_existente_html = document.getElementById("modal-html");
  if(modal_existente_html){
    modal_existente_html.remove();
  }
  modal_nova_html = await fetch(chrome.runtime.getURL("modal.html"));
  modal_nova_html = await modal_nova_html.text();
  document.body.insertAdjacentHTML('beforeend', modal_nova_html);
}

document.getElementById("bt-coletar").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const activeTab = tabs[0];

      await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["content.js"],
      });

      // await chrome.scripting.executeScript({
      //   target: { tabId: activeTab.id },
      //   func: verificaHorarios,
      // });
      //
      // await chrome.scripting.executeScript({
      //   target: { tabId: activeTab.id },
      //   func: fetchHTML,
      // });
      //
      // await chrome.scripting.executeScript({
      //   target: { tabId: activeTab.id },
      //   files: ["modal.js"],
      // });

      // const objeto_dias_intervalos = await chrome.storage.sync.get(['intervalos']);
      // const valores_dias_intervalos = objeto_dias_intervalos['intervalos'];
      // const tabela = document.getElementById("tabela-intervalos");
      
      // numero_de_linhas = 0;
      // for(indice_vdi in valores_dias_intervalos){
      //   if(valores_dias_intervalos[indice_vdi][1].length > numero_de_linhas){
      //     numero_de_linhas = valores_dias_intervalos[indice_vdi][1].length;
      //   }
      // }

      // celulas = [];
      // for(n = 0; n < numero_de_linhas; n++){
      //   linha = tabela.insertRow();
      //   celulas[n] = [];
      //   for(c = 0; c < 5; c++){
      //     celulas[n][c] = linha.insertCell(c);
      //   }
      // }

      // for(indice_vdi in valores_dias_intervalos){
      //   dia_semana = valores_dias_intervalos[indice_vdi][0];
      //   intervalos_do_dia = valores_dias_intervalos[indice_vdi][1];

      //   for(indice_intervalo in intervalos_do_dia){
      //     inicio_horario = intervalos_do_dia[indice_intervalo][0];
      //     fim_horario = intervalos_do_dia[indice_intervalo][1];

      //     celulas[indice_intervalo][dia_semana].textContent = inicio_horario + ' - ' + fim_horario;
      //   }
      // }
  })
});

function abrirModal(){
  const modal = document.getElementById("modal");
  if(modal){
    modal.showModal();
  }
}

document.getElementById("bt-abrir-modal").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const activeTab = tabs[0];

    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: abrirModal,
    });
  });
});
