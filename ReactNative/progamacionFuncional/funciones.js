 
  ejecutarOperacion=(operar)=>{
   let valor1 =recuperarFloat("txtValor1");
   let valor2 =recuperarFloat("txtValor2");
   let resultado=operar(valor1,valor2);
   console.log(resultado);
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









 

 ejecutar=(fn)=>{
    console.log("Etoy ejecutando funciones....");
    fn();

 }
 imprimir =()=>{
    
    console.log("Estoy imprimiendo");
 }
 
 saludar=()=>{
   alert("APREDIENDO PROGRAMAVCION FUNCIONAL")
 }
 
 testEjecutar=()=>{
    ejecutar(imprimir);
    ejecutar(saludar);
    ejecutar(()=>{
      alert("SOY UNA FUNCION SIN NOMBRE (ANONIMA)")
    });

 }
