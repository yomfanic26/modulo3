import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

let personas = [
  { nombre: "Jonthan", apellido: "Valencia", cedula: "0803473784" },
  { nombre: "Marilyn", apellido: "Gualacata", cedula: "1234567890" },
  { nombre: "Steeven", apellido: "Valencia", cedula: "0987654321" }
];

//permite verificar si se va crear una nueva persona o se va a modificar uno existente
let esNuevo = true;
//esta varibale almacena el indice del arreglo del elemento seleccionado para editar
let indiceSeleccionado = -1;




export default function App() {
  const [txtCedula, setTxtCedula] = useState();
  const [txtNombre, setTxtNombre] = useState();
  const [txtApellido, setTxtApellido] = useState();
  const [numElementos, setNumElemento] = useState(personas.length);

  //limpia
  let limpiar = () => {
    setTxtApellido(null);
    setTxtCedula(null);
    setTxtNombre(null);
    esNuevo = true;
  }
  //validacion de datos duplicados
  let existePersona=()=>{
    for (let i=0;i<personas.length;i++){
      if(personas[i].cedula==txtCedula){
        return true;
      }
    }
    return false;
  }

    //guardar persona

  let guardarPersona = () => {
    if (esNuevo) {
      if(existePersona){
        Alert("INFO","Ya existe la persona con la cedula :"+txtCedula)
      }else{
        let persona = { nombre: txtNombre, apellido: txtApellido, cedula: txtCedula };
        personas.push(persona);
      }
   
    } else {
      personas[indiceSeleccionado].nombre = txtNombre;
      personas[indiceSeleccionado].apellido = txtApellido;

    }

    limpiar();
    setNumElemento(personas.length);


  }
  //crear componente
  let ItemPersona = (props) => {
    return (
      <View style={styles.itemPersonas}>
        <View style={styles.intemIndice}>
          <Text>{props.indice} </Text>
        </View>
        <View style={styles.intemContenido}>
          <Text style={styles.texttoPrincipal}>
            {props.persona.nombre} {props.persona.apellido}</Text>
          <Text style={styles.texttoSecundario}>{props.persona.cedula}</Text>
        </View>
        <View style={styles.itemBotones}>

          <Button
            title=" E "
            color="green"

            onPress={() => {
              //pitar en la cajas de texto
              setTxtCedula(props.persona.cedula);
              setTxtApellido(props.persona.apellido);
              setTxtNombre(props.persona.nombre);
              esNuevo = false;
              indiceSeleccionado = props.indice;

            }}
          />

          <Button
            title=" X "
            color="red"
            onPress={() => {
              indiceSeleccionado = props.indice;
              //elimina desde inidice selecciona hasta el numero que le coloquemos
              personas.splice(indiceSeleccionado, 1);
              setNumElemento(personas.length);



            }}
          />

        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.areaCabeceera}>
        <Text>PERSONAS</Text>
        <TextInput style={styles.cajaTexto}
          value={txtCedula}
          placeholder='Ingrese la cedula'
          onChangeText={setTxtCedula}
          keyboardType='numeric'
          editable={esNuevo}
        />
        <TextInput style={styles.cajaTexto}
          value={txtApellido}
          placeholder='Ingrese apellido'
          onChangeText={setTxtApellido}
        />
        <TextInput style={styles.cajaTexto}
          value={txtNombre}
          placeholder='Ingrese nombre'
          onChangeText={setTxtNombre}
        />

        <View style={styles.areaBotones}>
          <Button
            title="Guardar"
            onPress={() => {
              guardarPersona();
            }}
          />
          <Button
            title="Nuevo"
            onPress={() => {
              limpiar();
            }}
          />
        </View>
        <View style={styles.numElementos} >
          <Text style={styles.textElemento}> Elementos: {numElementos}</Text>

        </View>

      </View>
      <View style={styles.areaContenido}>
        <FlatList
          data={personas}//arreglo de objetos

          //recibe un parametro y retorna un jsx
          renderItem={(elemento) => {//funcion para pintar cada elemento
            return (
              <ItemPersona
                indice={elemento.index}
                persona={elemento.item}
              />);
          }}
          keyExtractor={(item) => {
            return item.cedula;
          }}
        />
      </View>
      <View style={styles.areaPie}>
        <Text>Autor:Jonathan Valencia</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'lightblue',
    flexDirection: "column",
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingBottom: 10,

  },
  lista: {
    //backgroundColor: 'floralwhite',
  },
  itemPersonas: {
    backgroundColor: 'khaki',
    marginBottom: 10,
    padding: 10,
    flexDirection: "row"
  },
  texttoPrincipal: {
    fontSize: 17
  },
  texttoSecundario: {
    fontStyle: "italic",
    fontSize: 14
  },
  areaCabeceera: {
    flex: 4,
    //backgroundColor: "cadetblue",
    justifyContent: "center"

  },
  areaContenido: {
    flex: 6,
    //backgroundColor: "burlywood",
  },
  areaPie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    // backgroundColor: "red"

  },
  intemIndice: {
    flex: 2,
    //backgroundColor: "blueviolet",
    justifyContent: "center",
    alignItems: "center"
  },
  intemContenido: {
    flex: 6,
    //backgroundColor: "cornsilk"
  },
  itemBotones: {
    flex: 3,
    // backgroundColor: "cornsilk",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  numElementos: {

    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 10

  },
  textElemento: {
    fontStyle: "italic",
    fontSize: 14,
  },
  cajaTexto: {
    borderWidth: 1,
    borderColor: "gray",
    paddingTop: 5,
    paddingHorizontal: 5,
    marginBottom: 5
  },
  areaBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  }
});
