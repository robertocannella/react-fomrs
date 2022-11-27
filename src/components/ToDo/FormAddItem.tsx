import React, {Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class FormAddItem extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            task: '',
            formErrors: {name: ''}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (evt:React.ChangeEvent<HTMLInputElement>) {
        this.setState({task: evt.target.value})
    }
    handleSubmit (evt:React.BaseSyntheticEvent):void {
        evt.preventDefault();
        const newItem = {...this.state, id: uuidv4()}


        const isValid = this.handleValidation();
        if (isValid) {

            this.props.addItem(newItem);
            this.setState({
                task: '',
                formErrors: {name: ''}
            });
        }

    }
    handleValidation(){

            let task = this.state.task;

            let formIsValid = true;

            //Name
            if (task === '') {
                formIsValid = false;
                this.setState({
                    formErrors: {name: 'task-missing'}
                })
            }

            return formIsValid;
    }
    render() {
        return (
            <form  onSubmit={this.handleSubmit} noValidate={true} className={"form-add-item"}>
                <label htmlFor="new-todo">New To Do:</label>
                <input
                    id="new-todo"
                    type="text"
                    value={this.state.task}
                    onChange={this.handleChange}
                    required
                />
                <span className={this.state.formErrors.name === 'task-missing'? 'error': 'form-notify'}>Please fill in this field</span>
                <button className={"btn-add-task"}>Add Task</button>
            </form>
        );
    }
}

export default FormAddItem;