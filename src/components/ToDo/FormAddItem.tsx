import React, {Component } from 'react';

class FormAddItem extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (evt:React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: evt.target.value})
    }
    handleSubmit (evt:React.BaseSyntheticEvent){
        evt.preventDefault();
        console.log(evt)
        this.setState({value: ''});

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}

                />
                <button>Add</button>
            </form>
        );
    }
}

export default FormAddItem;