import React, { Component } from 'react';
import { Text,
     StyleSheet,
      View,
      TextInput,
      TouchableOpacity,
      AsyncStorage, 
      ScrollView
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
      componentWillMount = () => {
          AsyncStorage.getItem('tasks')
          .then((response) => {
            if(response){
                this.setState({
                    tasks: JSON.parse(response),
                })
            }
          });
          AsyncStorage.getItem('completedTasks')
          .then((response) => {
            if(response){
                this.setState({
                    completedTasks: JSON.parse(response),
                })
            }
          });
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
          });
          this.setStorage();
      }
      completeTask = (taskId) => {
          let tasks = this.state.tasks;
          let completedTasks = this.state.completedTasks.concat(this.state.tasks[taskId]);
          tasks =  tasks.slice(0, taskId).concat(tasks.slice(taskId+1));
          this.setState({
              tasks,
              completedTasks,
          });
          this.setStorage();
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
    deleteCompleted = (taskId) => {
        console.log(taskId);
        let completedTasks = this.state.completedTasks;
        completedTasks =  completedTasks.slice(0, taskId).concat(completedTasks.slice(taskId+1));
        this.setState({
            completedTasks,
        })
        this.setStorage();
    }
    renderCompletedTasks = (completedTasks) => {
        return completedTasks.map((completedTask, index) =>
            <View style = {styles.completedTask} key={index}>
            <Text style = {styles.deleted}>{completedTask}  -Completed</Text>
            <TouchableOpacity  
                onPress = {() => this.deleteCompleted(index)}
            >
            <Text style = {styles.deleteMark}>X</Text>
            </TouchableOpacity>
            </View>
        );
    }
    setStorage = () => {
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks)); 
        AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
    }
    render() {
        return (
            <ScrollView style={styles.container}>
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
            </ScrollView>
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
    },
    deleted: {
        textDecorationLine: 'line-through',
    },
});
export default EventList;