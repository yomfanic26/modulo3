let grades =[{subject:"Matematica",grade:9.5},{subject:"Fisica",grade:8.5}];

//metodo para agregar elemento al arreglo
export const saveGrade=(grade)=>{
    grades.push(grade);
    console.log("Arreglo",grades)
}