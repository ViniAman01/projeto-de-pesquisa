horario = document.querySelector("p.text-nowrap.hint.hint-top")
content = horario.textContent 
parseInt(content.split(':')[1])

todosOshorarios = document.querySelectorAll("p.text-nowrap.hint.hint-top")

stringHorario = []
for(horarioIndex in todosOshorarios){
   stringHorario.push(todosOshorarios[horarioIndex].textContent)
}
//console.log(stringHorario)


// todas_as_aulas = document.querySelectorAll("td.ifms-code")
// pegaPrimeiroUltimoHorarioAula(todas_as_aulas)

// function pegaPrimeiroUltimoHorarioAula(horarios_aula){
//     char_eh_aula = []
//     horarios_aula.forEach((element) => char_eh_aula.push(element.innerText[34]))
//     horarios_separados = []
//     for(i in char_eh_aula){
//         if(char_eh_aula[i] == 'A'){
//             horarios_separados.push(horarios_aula[i].innerText.split("PAT")[0].split("AULA")[1].split("PE")[0].split(' '))        
//         }
//     }

//     primeiro_e_ultimo_horario = []
//     for(i in horarios_separados){
//         primeiro_e_ultimo_horario.push([horarios_separados[i][1],horarios_separados[i][horarios_separados.length-2]])
//     }
//     return primeiro_e_ultimo_horario
// }