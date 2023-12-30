import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput, ScrollView, Alert, TouchableHighlight, Modal, Pressable } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);


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
  const ItemProducto = ({ indice, producto }) => {
    return (

      <View style={styles.itemProductos}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¿Está seguro que quiere eliminar?</Text>
              <View style={styles.areaBotones}>
                <Button
                  title="Aceptar"
                  color="green"
                  onPress={() => {
                    productos.splice(indiceSeleccionado, 1);
                    setNumElemento(productos.length);
                    setModalVisible(false);
                  }}
                >
                  <Text >Aceptar</Text>
                </Button>
                <Button
                  title="Cancelar"
                  color="red"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text>Cancelar</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.areId}>
          <Text style={styles.textoSecundario}>
            {producto.id} </Text>
        </View>
        <View style={styles.areNombreCat}>
          <Text style={styles.textoSecundario}>{producto.nombre} </Text>
          <Text style={styles.textoCategoria}>{producto.categoria}</Text>
        </View>
        <View style={styles.areUsd}>
          <Text style={styles.textoTercsario}> USD {producto.precioVenta}</Text>
        </View>

        <View style={styles.itemBotones}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              //pitar en la cajas de texto
              setId(producto.id);
              setTxtNombre(producto.nombre);
              setCategoria(producto.categoria);
              setPrecioCompra(producto.precioCompra);
              setPrecioVenta(producto.precioVenta);

              esNuevo = false;
              indiceSeleccionado = indice;

            }}>
            <Text style={styles.textBoton}>E</Text>

          </TouchableHighlight>

          <Button
            title=" X "
            color="red"
            onPress={() => {
              setModalVisible(true);
              indiceSeleccionado = indice;
            }}
          >
          </Button>
        </View>
      </View>
    );
  };
  return (

    <View style={styles.container}>
      <View style={styles.areCabecera}><Text style={styles.textoPrincipal}>PRODUCTOS!</Text>
        <ScrollView style={styles.areScrollView}>

          <TextInput style={styles.cajaTexto}
            value={txtId}
            placeholder='CODIGO'
            onChangeText={txt => {
              setId(txt)
            }}
            keyboardType='numeric'
            editable={esNuevo}
          />
          <TextInput style={styles.cajaTexto}
            value={txtNombre}
            placeholder='NOMBRE'
            onChangeText={txt => {
              setTxtNombre(txt)
            }}
          />
          <TextInput style={styles.cajaTexto}
            value={txtCategoria}
            placeholder='CATEGORIA'
            onChangeText={txt => {
              setCategoria(txt);
            }}
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtPrecioCompra}
            placeholder='PRECIO DE COMPRA'
            keyboardType='numeric'
            onChangeText={txt => {
              setPrecioCompra(txt);
              setPrecioVenta(calcularPrecioVenta(txt));
            }}
          />
          <TextInput
            style={styles.cajaTexto}
            value={txtPrecioVenta}
            placeholder='PRECIO DE VENTA'
            onChangeText={txt => {
              setTxtCedula(txt)
            }}
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
          renderItem={({ index, item }) => {//funcion para pintar cada elemento
            return (
              <ItemProducto
                indice={index}
                producto={item}
              />);

          }}
          keyExtractor={item => item.id}

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
    justifyContent: "space-between",

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
  },
  textBoton: {
    backgroundColor: "green",
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 5,

  },

  //para el modal editar depues
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
   },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
