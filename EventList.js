import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tasks: ['take out the trash', 'gray groceries', 'homework'],
            task: '',
        };
      }
      changeText = (e) => {
          this.setState({
              task: e,
          })
      }
      addTask = () => {
          this.setState({
              tasks: this.state.tasks.concat(this.state.task),
              task: '',
          })
      }
    renderList = (tasks) => {
        return tasks.map((task, key)=> <View style = {styles.task}  key={key}>
            <Text>{task}</Text>
            </View>)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.header}>
                    Trabajo Pendiente
                </Text>
                <TextInput 
                value={this.state.task}
                style = {styles.input}
                placeholder = "Agregar Tarea" 
                onChangeText = {(event)=> this.changeText(event)}
                onEndEditing = {() => this.addTask()}
                />
                {this.renderList(this.state.tasks)}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
       margin: 30,
       textAlign: 'center', 
       marginTop: 40,
       fontSize: 18,
    },
    task: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        textAlign: 'center',
        margin: 10,
    },
});
export default EventList;