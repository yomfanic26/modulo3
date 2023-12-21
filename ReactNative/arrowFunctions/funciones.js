ejecutarSumar=()=>{
    let valor1 =recuperarEntero("txtValor1");
    let valor2 =recuperarEntero("txtValor2");
    let resultadoSuma;
    console.log("Valor1 >>>>"+valor1+"Valor2 >>>> "+valor2);
    resultadoSuma=sumar(valor1,valor2);
    console.log(resultadoSuma);
 }
 
 ejecutarRestar=()=>{
     let valor1 =recuperarFloat("txtValor1");
     let valor2 =recuperarFloat("txtValor2");
     let resultadoResta;
     console.log("Valor1 >>>>"+valor1+"Valor2 >>>> "+valor2);
     resultadoResta=restar(valor1,valor2);
     console.log(resultadoResta);
  }
 
 sumar=(sum1,sum2)=>{
     let resultado;
     resultado=sum1+sum2;
     return resultado;
 
 }
 
 restar=(num1,num2)=>{
     let resultado;
     resultado=num1-num2;
     return resultado;
 
 }
 
