todos_horarios_pontos_td = document.querySelectorAll("td:nth-child(2)")
todas_datas_aulas_td = document.querySelectorAll("td:nth-child(1)")
todos_horarios_aulas_td = document.querySelectorAll("td.ifms-code")
char_eh_aula = []
todos_horarios_aulas_td.forEach((element) => char_eh_aula.push(element.innerText[34]))

horarios_entrada_saida_ponto_int = []
for(i in todos_horarios_pontos_td){
    if(char_eh_aula[i] == 'A'){
        horarios_ponto_string = todos_horarios_pontos_td[i].innerText
        horarios_ponto_string_split = horarios_ponto_string.split('\n')
        
        horario_entrada_string = horarios_ponto_string_split[0].split('E:')[1]
        horario_entrada_string_split = horario_entrada_string.split(':')
        
        horas_entrada_string = horario_entrada_string_split[0] 
        minutos_entrada_string = horario_entrada_string_split[1]
        segundos_entrada_string = horario_entrada_string_split[2]
       
        horas_entrada_int = parseInt(horas_entrada_string)
        minutos_entrada_int = parseInt(minutos_entrada_string)
        segundos_entrada_int = parseInt(segundos_entrada_string)


        horario_saida_string = horarios_ponto_string_split[horarios_ponto_string_split.length-1].split('S:')[1]
        if(!horario_saida_string){
            horario_saida_string = '-1:-1:-1'
        }
        horario_saida_string_split = horario_saida_string.split(':')

        horas_saida_string = horario_saida_string_split[0]
        minutos_saida_string = horario_saida_string_split[1]
        segundos_saida_string = horario_saida_string_split[2]

        horas_saida_int = parseInt(horas_saida_string)
        minutos_saida_int = parseInt(minutos_saida_string)
        segundos_saida_int = parseInt(segundos_saida_string)
        
        horarios_entrada_saida_ponto_int.push([[horas_entrada_int,minutos_entrada_int,segundos_entrada_int],[horas_saida_int,minutos_saida_int,segundos_saida_int]])
    }
}

horarios_inicio_fim_aula_int = []
for(i in todos_horarios_aulas_td){
    if(char_eh_aula[i] == 'A'){
        horarios_string = todos_horarios_aulas_td[i].innerText
        horarios_strings_split_por_pat = horarios_string.split('PAT')[0]
        horarios_strings_split_por_aula = horarios_strings_split_por_pat.split('AULA:')[1]
        horarios_strings_split_por_pe = horarios_strings_split_por_aula.split('PE:')[0]
        
        horarios_aulas_strings = horarios_strings_split_por_pe

        horarios_inicio_fim_aulas_strings = horarios_aulas_strings.split('/')
        horario_inicio_primeira_aula_string = horarios_inicio_fim_aulas_strings[0].split('-')[0]
        horario_fim_ultima_aula_string = horarios_inicio_fim_aulas_strings[horarios_inicio_fim_aulas_strings.length-1].split('-')[1]

        horas_inicio_primeira_aula_string = horario_inicio_primeira_aula_string.split(':')[0]
        minutos_inicio_primeira_aula_string = horario_inicio_primeira_aula_string.split(':')[1]

        horas_fim_ultima_aula_string = horario_fim_ultima_aula_string.split(':')[0]
        minutos_fim_ultima_aula_string = horario_fim_ultima_aula_string.split(':')[1]

        horas_inicio_primeira_aula_int = parseInt(horas_inicio_primeira_aula_string)
        minutos_inicio_primeira_aula_int = parseInt(minutos_inicio_primeira_aula_string)
        horas_fim_ultima_aula_int = parseInt(horas_fim_ultima_aula_string)
        minutos_fim_ultima_aula_int = parseInt(minutos_fim_ultima_aula_string)
        
        horarios_inicio_fim_aula_int.push([[horas_inicio_primeira_aula_int,minutos_inicio_primeira_aula_int],[horas_fim_ultima_aula_int,minutos_fim_ultima_aula_int]])
    }
}

data_aula_strings = []
for(i in todas_datas_aulas_td){
    if(char_eh_aula[i] == 'A'){    
        data_aula_strings.push(todas_datas_aulas_td[i].innerText.split('\n')[0])
    }
}

for(i = 0; i < 13; i++){
    console.log("Dia:",data_aula_strings[i],'\n')
    if(horarios_entrada_saida_ponto_int[i][0][0] < horarios_inicio_fim_aula_int[i][0][0]){
        console.log("Ponto de entrada antes do horario de inicio de aula.")
    }else{
        if(horarios_entrada_saida_ponto_int[i][0][0] == horarios_inicio_fim_aula_int[i][0][0] && horarios_entrada_saida_ponto_int[i][0][1] < horarios_inicio_fim_aula_int[i][0][1]){
            console.log("Ponto de entrada antes do horario de inicio de aula.")
        }else{
            if(horarios_entrada_saida_ponto_int[i][0][1] == horarios_inicio_fim_aula_int[i][0][1] && horarios_entrada_saida_ponto_int[i][0][2] == 0){
                console.log("Ponto de entrada no exato horario do inicio da aula.")
            }else{
                console.log("Ponto de entrada depois do horario de inicio de aula.")    
            }
        }
    }
}
