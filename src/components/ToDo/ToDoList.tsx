import React, {Component} from 'react';
import ToDoItem from "./ToDoItem";
import { v4 as uuidv4 } from 'uuid';
import FormAddItem from "./FormAddItem";

interface IToDo {
    task: string
    isDone: boolean,
    id: string
}

interface IToDoListState {
    tasks : IToDo[]
}

class ToDoList extends Component<any, IToDoListState> {
    constructor(props:any) {
        super(props);
        this.state = {
            tasks: [
                {task: 'feed dog', id: uuidv4(),isDone:false},
                {task: 'wash cat', id: uuidv4(),isDone:true},
                {task: 'milk goat', id: uuidv4(),isDone:true},
                {task: 'use Graphql', id: uuidv4(),isDone:true}
            ]
        }
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }
    addTask(toDo: IToDo){
        this.setState((state)=>(
            {tasks: [...state.tasks,toDo]}
        ))
    }
    updateTask(toDo:IToDo){
        const filteredTasks = this.state.tasks.filter((task)=>{
            return task.id !== toDo.id
        })
        this.setState({
            tasks: [...filteredTasks, toDo]
        })
    }
    removeTask(id: string){
        this.setState({
            tasks: this.state.tasks.filter((task)=>{
               return task.id !== id
            })
        })
    }
    render() {
        const tasks = this.state.tasks.map((task)=>{
            return (
                <li>
                    <ToDoItem
                    updateItem={this.updateTask}
                    removeItem={this.removeTask}
                    key={task.id}
                    id={task.id}
                    isDone={task.isDone}
                    task={task.task} />
                </li>)
            })


        return (
            <div className={"ToDoList-container"}>
                <h1>
                    To Do List
                    <span>A Simple React To Do List App.</span>
                </h1>
                <ul>
                {tasks}
                </ul>
                <FormAddItem addItem={this.addTask}/>

            </div>
        );
    }
}

export default ToDoList;