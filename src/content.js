dias_regulares_irregulares = new Map; 
index_eh_aula = new Array;

{
  const tabela_frequencias = document.querySelector("#tabela-frequencias");
  const todas_datas_aulas_td = tabela_frequencias.querySelectorAll("td:nth-child(1)");
  const situacao = tabela_frequencias.querySelectorAll("td:nth-child(4)");
  const todos_horarios_aulas_td = tabela_frequencias.querySelectorAll("td.ifms-code");

  function getHorariosRegulares(i){
    if(ehAula(i)){
      const horarios_string = todos_horarios_aulas_td[i].innerText;
      const pat_split_horarios_strings = horarios_string.split('PAT')[0];
      const aula_split_horarios_strings = pat_split_horarios_strings.split('AULA:')[1];
      const horarios_aulas_strings = aula_split_horarios_strings.split('PE:')[0];
      const barra_split_horarios_strings = horarios_aulas_strings.split('/');

      let intervalos_de_tempo_dia = new Array;

      let index = 0;
      for(let k in barra_split_horarios_strings){
        let inicio_horario = barra_split_horarios_strings[k].split('-')[0];
        let fim_horario = barra_split_horarios_strings[k].split('-')[1];
        
        if(index != 0 && inicio_horario == intervalos_de_tempo_dia[index-1][1]){
          intervalos_de_tempo_dia[index-1][1] = fim_horario;
        }else{
          intervalos_de_tempo_dia.push([inicio_horario, fim_horario]);
          index++;
        }
      }
      return intervalos_de_tempo_dia;
    }else{
      return null;
    }
  }

  const situacoes_sem_aula = [
    'Férias',
    'Liberação',
    'Afastamento'
  ]

  let comparaSituacoes = (index) => {
    for(let i = 0; i < situacoes_sem_aula.length; i++){
      if(situacao[index].innerText.indexOf(situacoes_sem_aula[i]) != -1){
        return true;
      }
    }
    return false;
  }

  function ehAula(i){
    if(todos_horarios_aulas_td[i].innerText.indexOf('AULA') == -1 || comparaSituacoes(i)){
      return false;
    }else{
      return true;
    }
  }

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

  {
    const todos_horarios_entrada_saida_td = tabela_frequencias.querySelectorAll("td:nth-child(2)")
    
    for(let i = 0; i < todos_horarios_entrada_saida_td.length; i++){
      const entrada_saida = todos_horarios_entrada_saida_td[i].innerText.split(/(?:E:|S:)/).filter(e2 => e2 !== '' && !/^Sem/i.test(e2));
      const dia_data_string = todas_datas_aulas_td[i].innerText.split('\n').filter(e => e !== '');
      const dia_horarios_regulares = getHorariosRegulares(i);
      if(dia_horarios_regulares){
        if(entrada_saida.length != 0 && entrada_saida.length % 2 == 0){
          let bool = true;
          k = 0;
          while(bool && dia_horarios_regulares && k < dia_horarios_regulares.length){
            let aux_intervalo_aula_para_comparacao = new Intervalo(dia_horarios_regulares[k][0], dia_horarios_regulares[k][1], ':');
            let j = 0;
            bool = false;
            while(j < entrada_saida.length){
              let aux_intervalo_e_s_para_comparacao = new Intervalo(entrada_saida[j], entrada_saida[j+1],':');
              if(aux_intervalo_aula_para_comparacao.estaContidoEm(aux_intervalo_e_s_para_comparacao)){
                bool = true;
              }
              j = j+2;
            }
            if(!bool){
              dias_regulares_irregulares.set(dia_data_string[0],['Irregular',dia_data_string[1],entrada_saida,dia_horarios_regulares]);
            }else{
              dias_regulares_irregulares.set(dia_data_string[0],['Regular',dia_data_string[1],entrada_saida,dia_horarios_regulares]);
            }
            k++;
          }
        }
        else{
            dias_regulares_irregulares.set(dia_data_string[0],['Irregular',dia_data_string[1],entrada_saida,dia_horarios_regulares]);
        }
      }else{
        if(entrada_saida.length != 0){
          dias_regulares_irregulares.set(dia_data_string[0],['Irregular',dia_data_string[1],entrada_saida,dia_horarios_regulares]);
        }else{
          dias_regulares_irregulares.set(dia_data_string[0],['Regular',dia_data_string[1],entrada_saida,dia_horarios_regulares]);
        }
      }
    }
  }
}
