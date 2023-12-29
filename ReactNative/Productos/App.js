import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput, ScrollView, Alert } from 'react-native';
import { useState } from 'react';

let productos = [
  { nombre: "Club verde", categoria: "Bebidas", precioCompra: "1.75", precioVenta: "2.50", id: "1" },
  { nombre: "Light", categoria: "Bebidas", precioCompra: "1.50", precioVenta: "2.00", id: "2" },
  { nombre: "Corona", categoria: "Bebidas", precioCompra: "1.75", precioVenta: "2.50", id: "3" },
  { nombre: "Papas", categoria: "Aderesos", precioCompra: "1.00", precioVenta: "1.50", id: "4" },
  { nombre: "Sala de tomate", categoria: "Salsas", precioCompra: "1.75", precioVenta: "2.50", id: "5" },
  { nombre: "Sala de ahi", categoria: "Salsas", precioCompra: "0.25", precioVenta: "0.50", id: "6" },
]
//permite verificar si se va crear una nueva persona o se va a modificar uno existente
let esNuevo = true;
//esta varibale almacena el indice del arreglo del elemento seleccionado para editar
let indiceSeleccionado = -1;

export default function App() {
  const [txtNombre, setTxtNombre] = useState();
  const [txtCategoria, setCategoria] = useState();
  const [txtPrecioCompra, setPrecioCompra] = useState();
  const [txtPrecioVenta, setPrecioVenta] = useState();
  const [txtId, setId] = useState();
  const [numElementos, setNumElemento] = useState(productos.length);

  //limpia4
  let limpiar = () => {
    setId(null);
    setTxtNombre(null);
    setCategoria(null);
    setPrecioCompra(null);
    setPrecioVenta(null);
    esNuevo = true;
  }
  //validacion de datos duplicados
  let existeProducto = () => {
    if (txtId) {
      for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == txtId) {
          return true;
        }
      }
    }
    return false;
  }
  //funcion qu epermite calcular el precio de venta
  const calcularPrecioVenta = (precioCompra) => {
    return (parseFloat(precioCompra) + (parseFloat(precioCompra) * 0.20)).toFixed(2);
  }

  //guardar producto
  let guardarProducto = () => {
    let precioCompra = parseFloat(txtPrecioCompra);
    if (!txtId || !txtNombre || !txtCategoria || !txtPrecioCompra) {
      Alert.alert("INFO", "NINGUNO DE LOS CAMPOS PUEDE SER NULL");
    } else {
      if (esNuevo) {
        if (existeProducto()) {
          Alert.alert("INFO", "Ya existe el producto con el código: " + txtId)
        } else {
          let producto = {
            id: txtId,
            nombre: txtNombre,
            categoria: txtCategoria,
            precioCompra: precioCompra.toFixed(2),
            precioVenta: calcularPrecioVenta(precioCompra)
          };
          productos.push(producto);
          console.log(productos);
        }
      } else {
        productos[indiceSeleccionado].nombre = txtNombre;
        productos[indiceSeleccionado].categoria = txtCategoria;
        productos[indiceSeleccionado].precioCompra = precioCompra.toFixed(2);
        productos[indiceSeleccionado].precioVenta = calcularPrecioVenta(precioCompra);

      }
      limpiar();

    }

    setNumElemento(productos.length);
  }


  //crear componente
  let ItemProducto = (props) => {
    return (
      <View style={styles.itemProductos}>
        <View style={styles.areId}>
          <Text style={styles.textoSecundario}>
            {props.producto.id} </Text>
        </View>
        <View style={styles.areNombreCat}>
          <Text style={styles.textoSecundario}>{props.producto.nombre} </Text>
          <Text style={styles.textoCategoria}>{props.producto.categoria}</Text>
        </View>
        <View style={styles.areUsd}>
          <Text style={styles.textoTercsario}> USD {props.producto.precioVenta}</Text>
        </View>
        <View style={styles.itemBotones}>
          <Button
            title=" E "
            color="green"
            onPress={() => {
              //pitar en la cajas de texto
              setId(props.producto.id);
              setTxtNombre(props.producto.nombre);
              setCategoria(props.producto.categoria);
              setPrecioCompra(props.producto.precioCompra);
              setPrecioVenta(props.producto.precioVenta);

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
              productos.splice(indiceSeleccionado, 1);
              setNumElemento(productos.length)
            }}
          />
        </View>
      </View>
    )
  }

  return (

    <View style={styles.container}>



      <View style={styles.areCabecera}><Text style={styles.textoPrincipal}>PRODUCTOS!</Text>
        <ScrollView style={styles.areScrollView}>

          <TextInput style={styles.cajaTexto}
            value={txtId}
            placeholder='CODIGO'
            onChangeText={setId}
            keyboardType='numeric'
            editable={esNuevo}
          />
          <TextInput style={styles.cajaTexto}
            value={txtNombre}
            placeholder='NOMBRE'
            onChangeText={setTxtNombre}
          />
          <TextInput style={styles.cajaTexto}
            value={txtCategoria}
            placeholder='CATEGORIA'
            onChangeText={setCategoria}
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtPrecioCompra}
            placeholder='PRECIO DE COMPRA'
            keyboardType='numeric'
            onChangeText={(txt) => {
              setPrecioCompra(txt);
              setPrecioVenta(calcularPrecioVenta(txt));
            }}
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtPrecioVenta}
            placeholder='PRECIO DE VENTA'
            onChangeText={setPrecioVenta}
            editable={false}
          />

          <View style={styles.areaBotones}>
            <Button
              title="Guardar"
              onPress={() => {
                guardarProducto();
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
        </ScrollView>

      </View>

      <View style={styles.areaContenido}>
        <FlatList
          data={productos}
          renderItem={(elemento) => {//funcion para pintar cada elemento
            return (
              <ItemProducto
                indice={elemento.index}
                producto={elemento.item}
              />);

          }}
          keyExtractor={(item) => {
            return item.id;
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

    flexDirection: "column",
    paddingTop: 30,
    paddingHorizontal: 20
  },
  areCabecera: {
    flex: 8,
    //backgroundColor: "cadetblue",
    justifyContent: "center"
  },
  areaContenido: {
    flex: 8,
    //backgroundColor: "burlywood",
  },
  areaPie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    //backgroundColor: "red"

  },
  textoPrincipal: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold", // negrita
  },
  textoTercsario: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textoSecundario: {
    fontSize: 16,
  },
  textoCategoria: {
    fontSize: 14,
    fontStyle: "italic",
  },

  itemProductos: {
    //backgroundColor: "cornsilk",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: "cadetblue",
    borderWidth: 2,
    flexDirection: "row",
  },
  areId: {
    flex: 2,
    //backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"

  },
  areNombreCat: {
    flex: 5,
    //backgroundColor: "green",
    flexDirection: "column"
  },
  areUsd: {
    flex: 3,
   // backgroundColor: "yellow",
    justifyContent: "center"
  },

  itemBotones: {
    flex: 3,
    //backgroundColor: "cornsilk",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cajaTexto: {
    borderWidth: 2,
    borderColor: "gray",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 7,

  },
  areaBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  numElementos: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 10,
    paddingEnd: 15,
  },
  areScrollView: {
    flexGrow: 1,
  }
});
