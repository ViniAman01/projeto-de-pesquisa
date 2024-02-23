todas_datas_aulas_td = document.querySelectorAll("td:nth-child(1)");
todos_horarios_aulas_td = document.querySelectorAll("td.ifms-code");
char_eh_aula = [];
todos_horarios_aulas_td.forEach((element) => char_eh_aula.push(element.innerText[34]));
dia = {
  'Segunda-feira': 0,
  'Terça-feira': 1,
  'Quarta-feira': 2,
  'Quinta-feira': 3,
  'Sexta-feira': 4
}

dia_semana_aula_strings = [];
indices_dia_semana = [];

for(i = 0; i < todas_datas_aulas_td.length; i++){
  if(char_eh_aula[i] == 'A'){
    data = todas_datas_aulas_td[i].innerText.split('\n')[2];
    if(!dia_semana_aula_strings.includes(data)){
      dia_semana_aula_strings.push(data);
      indices_dia_semana.push(i);
    }
  }
}

intervalos_de_tempo_dias_semana = [];

for(j in indices_dia_semana){
  i = indices_dia_semana[j];
  
  horarios_string = todos_horarios_aulas_td[i].innerText;
  pat_split_horarios_strings = horarios_string.split('PAT')[0];
  aula_split_horarios_strings = pat_split_horarios_strings.split('AULA:')[1];
  pe_split_horarios_strings = aula_split_horarios_strings.split('PE:')[0];
  
  horarios_aulas_strings = pe_split_horarios_strings;

  barra_split_horarios_strings = horarios_aulas_strings.split('/');

  intervalos_de_tempo_dia = [];

  indice_intervalos_de_tempo_dia = 0;
  index = 0;
  for(k in barra_split_horarios_strings){
    inicio_horario = barra_split_horarios_strings[k].split('-')[0];
    fim_horario = barra_split_horarios_strings[k].split('-')[1];
    
    if(index != 0 && inicio_horario == intervalos_de_tempo_dia[index-1][1]){
      intervalos_de_tempo_dia[index-1][1] = fim_horario;
    }else{
      intervalos_de_tempo_dia.push([inicio_horario, fim_horario]);
      index++;
    }
  }
  intervalos_de_tempo_dias_semana.push([dia[dia_semana_aula_strings[j]],intervalos_de_tempo_dia]);
}

chrome.storage.sync.set({'intervalos': intervalos_de_tempo_dias_semana})
