import React, { Component } from 'react';
import { Text,
     StyleSheet,
      View,
      TextInput,
      TouchableOpacity,
     } from 'react-native';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tasks: ['take out the trash', 'gray groceries', 'homework'],
            task: '',
            completedTasks: ['study', 'play games'],
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
      completeTask = (taskId) => {
          let tasks = this.state.tasks;
          let completedTasks = this.state.completedTasks.concat(this.state.tasks[taskId]);
          tasks =  tasks.slice(0, taskId).concat(tasks.slice(taskId+1));
          this.setState({
              tasks,
              completedTasks,
          })
      }
    renderList = (tasks) => {
        return tasks.map((task, key)=> <View style = {styles.task}  key={key}>
            <Text>{task}</Text>
            <TouchableOpacity  
            onPress={() => this.completeTask (key)}>
            <Text style = {styles.checkMark}>&#10003;</Text>
            </TouchableOpacity>
            </View>)
    }
    renderCompletedTasks = (completedTasks) => {
        return completedTasks.map((completedTask, index) =>
            <View style = {styles.completedTask} key={index}>
            <Text>{completedTask}  -Completed</Text>
            <TouchableOpacity  >
            <Text style = {styles.deleteMark}>X</Text>
            </TouchableOpacity>
            </View>
        );
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
                {this.renderCompletedTasks(this.state.completedTasks)}
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
        justifyContent: 'space-between',
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
        padding: 20,
    },
    completedTask: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
        padding: 20,
        backgroundColor: 'gray',
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        textAlign: 'center',
        margin: 10,
    },
    checkMark : {
        color: 'green',
        fontSize: 16,
    },
    deleteMark: {
        color: 'red',
        fontSize: 16, 
    }
});
export default EventList;