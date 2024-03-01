todas_datas_aulas_td = document.querySelectorAll("td:nth-child(1)");
todos_horarios_aulas_td = document.querySelectorAll("td.ifms-code");
todos_horarios_entrada_saida_td = document.querySelectorAll("td:nth-child(2)")

//Parte responsavel por extrair os horarios e relacionar com os dias da semana

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

chrome.storage.sync.set({'intervalos': intervalos_de_tempo_dias_semana});

//Parte responsavel por extrair os horarios de e/s

if(typeof Horario === 'undefined'){//Evita que a classe seja redeclarada caso já exista, sem essa condição um erro é emitido no console
  class Horario {
    constructor(string,delimitador){
      let divisoes = string.split(delimitador);
      this.horas = Number(divisoes[0])
      this.minutos = Number(divisoes[1])
      if(isNaN(Number(divisoes[2]))){
        this.segundos = 0;
      }else{
        this.segundos = Number(divisoes[2])
      }
    }

    ehMaior(obj){
      if(this.horas > obj.horas){
        return true;
      }else{
        if(this.horas == obj.horas){
          if(this.minutos > obj.minutos){
            return true;
          }else{
            if(this.minutos == obj.minutos){
              if(this.segundos > obj.segundos){
                return true;
              }else{
                return false;
              }
            }
          }
        }
      }
    }

    ehIgual(obj){
      if(this.horas == obj.horas && this.minutos == obj.minutos && this.segundos == obj.segundos){
        return true;
      }else{
        return false;
      }
    }

    printa(){
      console.log(`Horas: ${this.horas} Minutos: ${this.minutos} Segundos: ${this.segundos}`)
    }
  }

  window.Horario = Horario;//Permitir que a classe seja acessada globalmente
}

if(typeof Intervalo === 'undefined'){
  class Intervalo {
    constructor(horario_entrada,horario_saida,delimitador){
      this.inicio = new Horario(horario_entrada,delimitador);
      this.fim = new Horario(horario_saida,delimitador);
    }

    estaContidoEm(obj){
      if((this.inicio.ehMaior(obj.inicio) || this.inicio.ehIgual(obj.inicio)) && (obj.fim.ehMaior(this.fim) || obj.fim.ehIgual(this.fim))){
        return true;
      }else{
        return false;
      }
    }

    printa(){
      console.log('Inicio: ')
      this.inicio.printa()
      console.log('Fim: ')
      this.fim.printa()
    }
  }

  window.Intervalo = Intervalo;//Permitir que a classe seja acessada globalmente
}
