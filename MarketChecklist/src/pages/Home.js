// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

// const Home = () => {
//   const [newItem, setNewItem] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [items, setItems] = useState([]);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     const loadItems = async () => {
//       try {
//         const storedItems = await AsyncStorage.getItem('items');
//         if (storedItems) {
//           setItems(JSON.parse(storedItems));
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     loadItems(); // Carrega os itens do AsyncStorage quando o componente é montado
//   }, []);

//   const addItem = async () => {
//     if (newItem.trim() === '' || quantity.trim() === '') {
//       alert("Por favor, insira um nome e quantidade para o item.");
//       return;
//     }

//     if (editId) {
//       // Editando item existente
//       const updatedItems = items.map(item => 
//         item.id === editId ? { ...item, name: newItem, quantity } : item
//       );
//       setItems(updatedItems);
//       setEditId(null);
//       // Salva a lista atualizada no AsyncStorage
//       await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
//     } else {
//       // Adicionando novo item
//       const id = new Date().getTime().toString();
//       const newItemObject = { id, name: newItem, quantity, bought: false };
//       const updatedItems = [...items, newItemObject];
//       setItems(updatedItems);
//       // Salva a lista atualizada no AsyncStorage
//       await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
//     }

//     setNewItem('');
//     setQuantity('');
//   };

//   const editItem = (id) => {
//     const itemToEdit = items.find(item => item.id === id);
//     setNewItem(itemToEdit.name);
//     setQuantity(itemToEdit.quantity);
//     setEditId(id);
//   };

//   const deleteItem = async (id) => {
//     const updatedItems = items.filter(item => item.id !== id);
//     setItems(updatedItems);
//     // Atualiza o AsyncStorage após a exclusão
//     await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
//   };

//   const toggleBought = async (id) => {
//     const updatedItems = items.map(item => {
//       if (item.id === id) {
//         return { ...item, bought: !item.bought };
//       }
//       return item;
//     });
//     setItems(updatedItems);
//     // Atualiza o AsyncStorage após a alteração do estado de comprado
//     await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//     <View style={styles.container}>
//       <Text style={styles.title}>Lista de Compras</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Nome do item"
//           value={newItem}
//           onChangeText={setNewItem}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Quantidade"
//           value={quantity}
//           onChangeText={setQuantity}
//         />
//         <Button title={editId ? "Atualizar Item" : "Adicionar Item"} onPress={addItem} color="#2A5D34" />
//       </View>
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <Text style={[styles.itemText, item.bought && styles.itemBought]}>{item.name} - {item.quantity}</Text>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity onPress={() => editItem(item.id)} style={styles.editButton}>
//                 <Text style={styles.buttonText}>Editar</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
//                 <Text style={styles.buttonText}>Excluir</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => toggleBought(item.id)} style={styles.button}>
//                 <Text style={styles.buttonText}>{item.bought ? "Desmarcar" : "Marcar como Comprado"}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         style={styles.flatList}
//         contentContainerStyle={styles.flatListContent}
//       />
//     </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F2F2F2',
//   },
//   title: {
//     fontSize: width > 400 ? 24 : 20, 
//     fontWeight: 'bold',
//     color: '#2A5D34',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     borderColor: '#A8D5BA',
//     borderWidth: 1,
//     marginRight: 10,
//     padding: 8,
//     fontSize: width > 400 ? 16 : 14, 
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemText: {
//     fontSize: width > 400 ? 18 : 16, 
//     flex: 1,
//   },
//   itemBought: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   button: {
//     marginLeft: 10,
//     padding: 10,
//     backgroundColor: '#A8D5BA', 
//     borderRadius: 5,
//   },
//   editButton: {
//     marginLeft: 10,
//     padding: 10,
//     backgroundColor: '#FFD700', 
//     borderRadius: 5,
//   },
//   deleteButton: {
//     marginLeft: 10,
//     padding: 10,
//     backgroundColor: '#FF6347', 
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#2A5D34',
//     fontWeight: 'bold',
//   },
//   flatList: {
//     flex: 1,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
// });

// export default Home;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [newItem, setNewItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadItems(); // Carrega os itens do AsyncStorage quando o componente é montado
  }, []);

  const addItem = async () => {
    if (newItem.trim() === '' || quantity.trim() === '') {
      alert("Por favor, insira um nome e quantidade para o item.");
      return;
    }

    if (editId) {
      // Editando item existente
      const updatedItems = items.map(item => 
        item.id === editId ? { ...item, name: newItem, quantity } : item
      );
      setItems(updatedItems);
      setEditId(null);
      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    } else {
      // Adicionando novo item
      const id = new Date().getTime().toString();
      const newItemObject = { id, name: newItem, quantity, bought: false };
      const updatedItems = [...items, newItemObject];
      setItems(updatedItems);
      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    }

    setNewItem('');
    setQuantity('');
  };

  const editItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setNewItem(itemToEdit.name);
    setQuantity(itemToEdit.quantity);
    setEditId(id);
  };

  const deleteItem = async (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    // Atualiza o AsyncStorage após a exclusão
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const toggleBought = async (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, bought: !item.bought };
      }
      return item;
    });
    setItems(updatedItems);
    // Atualiza o AsyncStorage após a alteração do estado de comprado
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Compras:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do item"
            value={newItem}
            onChangeText={setNewItem}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantity}
            onChangeText={setQuantity}
          />
          <Button title={editId ? "Atualizar item" : "Adicionar item"} onPress={addItem} color="#2A5D34" />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={[styles.itemText, item.bought && styles.itemBought]}>{item.name} - {item.quantity}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => editItem(item.id)} style={styles.iconButton}>
                    <Icon name="edit" size={20} color="#FFD700" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.iconButton}>
                    <Icon name="trash" size={20} color="#FF6347" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleBought(item.id)} style={styles.iconButton}>
                    <Icon name={item.bought ? "check-square" : "square-o"} size={20} color="#2A5D34" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Criação by Carla Coder 2024</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
    width: '100%',
  },
  title: {
    fontSize: width > 400 ? 24 : 20, 
    fontWeight: 'bold',
    color: '#2A5D34',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    borderColor: '#A8D5BA',
    borderWidth: 1,
    marginRight: 20,
    padding: 8,
    width: '90%',
    fontSize: width > 400 ? 16 : 14, 
    borderRadius: 5,
  },
  listContainer: {
    flex: 1,
    width: '100%', //entre 100 e 105%
    maxHeight: 300, // Define uma altura máxima para o contêiner da lista
    backgroundColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden', // Para permitir a rolagem
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#A8D5BA',
  },
  itemText: {
    fontSize: width > 400 ? 18 : 16, 
    flex: 1,
  },
  itemBought: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  footerText: {
    color: '#2A5D34',
    fontWeight: 'bold',
  },
});

export default Home;







