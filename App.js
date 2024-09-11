import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, FlatList, Modal } from 'react-native';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState('');
  const [modal, setModal] = useState(false)
  const handleAddGoal = () => {

    const newGoals = [...goals, { id: Date.now(), text: goal }];
    setGoals(newGoals);
    setGoal('')
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };



  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Button title="Add New Goal" color="skyblue" onPress={() => { setModal(!modal) }} />

        <Text style={styles.label}>Enter Your Goal:</Text>
        <TextInput
          value={goal}
          style={styles.input}
          placeholder='Go To Gym'
          onChangeText={setGoal}
        />

        <Button title="Add Goal" onPress={handleAddGoal} />

      </View>
      {modal &&
        <Modal visible={modal} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                style={styles.flatList}
                data={goals}
                renderItem={({ item }) => (
                  <View key={item.id} style={styles.listItem}>
                    <Text style={styles.listItemText}>{item.text}</Text>
                    <Button
                      title="Delete"
                      color="red"
                      onPress={() => handleDeleteGoal(item.id)}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <Button title="Close" color="black" onPress={() => { setModal(!modal); }} />
            </View>
          </View>
        </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  listContainer: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#ff4c4c',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listItem: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "skyblue",
    color: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  flatList: {
    width: '100%',
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'skyblue',
  },
  listItemText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
