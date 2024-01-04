let grades = [{ subject: "Matematica", grade: "9.5" }, { subject: "Fisica", grade: 8.5 }];

//metodo para agregar elemento al arreglo
export const saveGrade = (grade) => {
    grades.push(grade);
    console.log("Arreglo", grades)
}
export const getGrades = () => {
    return grades;
}

export const updateGrade = (nota) => {
    let gradeRetriever = find(nota.subject);
    if (gradeRetriever != null) {
        gradeRetriever.grade = nota.grade
    }
}
console.log(grades)
//bucar un elmento dentor del arreglo en funcion del nombre de l materia
const find = (subject) => {
    for (let i = 0; i < grades.length; i++) {
        if (grades[i].subject==subject) {
            return grades[i];
        };

    }
    return null
}