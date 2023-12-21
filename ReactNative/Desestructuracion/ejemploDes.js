recuperar=()=>{
    let frutas=["pera","manzana","zandia"];
    frutas.push("banana");
    return frutas;
}

testRecuperar=()=>{
    let misFrutas=recuperar();
    let primeraFruta=misFrutas[0];
    let segunFruta=misFrutas[1];
    console.log("1>>>>>> "+primeraFruta);
    console.log("2>>>>>> "+segunFruta)

}

//ejemplodesectrucutacion
testRecuperarDes=()=>{
    let [frutaPrimera,frutaSegunda,frutaTercera]=recuperar();
    console.log("1>>>>>> "+frutaPrimera);
    console.log("2>>>>>> "+frutaSegunda)
    console.log("3>>>>>> "+frutaTercera)


}