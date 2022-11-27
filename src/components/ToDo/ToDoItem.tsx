import React, {Component} from 'react';
import './ToDo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faCheck,faTrash,faFloppyDisk ,faPenToSquare} from '@fortawesome/free-solid-svg-icons'


interface IToDoProps {
    key: string
    id: string
    task: string
    isDone: boolean
    removeItem: Function
    updateItem: Function
}


interface IToDoState {
    id: string
    task: string
    isDone: boolean
    isEditing: boolean

}

class ToDoItem extends Component<IToDoProps,IToDoState> {
    constructor(props:IToDoProps) {
        super(props);
        this.state = {
            id: this.props.id,
            task: this.props.task,
            isDone: this.props.isDone,
            isEditing: false
        }


        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnCheckBoxChange = this.handleOnCheckBoxChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

    }
    handleRemove (evt:React.BaseSyntheticEvent){
        evt.preventDefault();
        this.props.removeItem(this.state.id)
    }
    handleOnCheckBoxChange(evt:React.BaseSyntheticEvent){
        this.setState({
            [evt.target.name]: evt.target.checked
        } as { [K in keyof IToDoState]: IToDoState[K] });
    }
    handleOnChange (evt: React.BaseSyntheticEvent){
        this.setState({
            [evt.target.name]: evt.target.value
        } as { [K in keyof IToDoState]: IToDoState[K] });
    };
    handleUpdate(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        this.props.updateItem(this.state)
    }
    render() {
        const viewMode = (
            <div>
                <div className={"ToDoItem__is-done"}>

                    {this.state.isDone? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCircle} />}
                </div>
                 <div  className={"ToDoItem-view-task"}>
                     {this.state.task}
                 </div>
                <div className={"ToDoItem-view-trash"}>
                    <FontAwesomeIcon onClick={this.handleRemove} icon={faTrash} />
                </div>
                <div className={"ToDoItem-view-edit"}>
                    <FontAwesomeIcon icon={faPenToSquare} onClick={()=>this.setState({isEditing:true})}/>
                </div>
                <div>
                </div>
            </div>)
        const editMode = (
            <div>
            <form className={"ToDoItem__form"} onSubmit={this.handleUpdate}>
                <div className={"ToDoItem__form-isDone-container"}>
                    <input
                        id="is-done"
                        className={`ToDoItem-form-isDone-checkBox ${(this.state.isDone) ? 'checked': ''}`}
                        type="checkbox"
                        name="isDone"
                        onChange={this.handleOnCheckBoxChange}
                        checked={this.state.isDone}

                    />
                </div>
                <div>
                    <label htmlFor={"task"}></label>
                    <input
                        onChange={this.handleOnChange}
                        type="text"
                        id={this.state.id}
                        value={this.state.task}
                        name="task"
                    />
                </div>

            </form>
            <div className={"ToDoItem-edit-trash"}>
                <FontAwesomeIcon onClick={this.handleRemove} icon={faTrash} />
            </div>
            <div className={"ToDoItem-edit-save"}>
                <FontAwesomeIcon icon={faFloppyDisk} onClick={()=>this.setState({isEditing:false})}/>
            </div>
        </div>
        )


        return (
            <div className={"ToDoItem-container"}>
                {this.state.isEditing ? editMode: viewMode }
            </div>
        );
    }
}

export default ToDoItem;