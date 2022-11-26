import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IFormBox {
    height: string,
    width: string,
    color: string
}


class FormNewBox extends Component<any, IFormBox>{
    constructor(props:any) {
        super(props);
        this.state ={
            height: '',
            width: '',
            color: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (evt:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            [evt.target.name]: evt.target.value
        } as { [K in keyof IFormBox]: IFormBox[K] }); //This is for definition
    }
    handleSubmit(evt: React.BaseSyntheticEvent){
        evt.preventDefault();
        const newBox = {...this.state, id: uuidv4()}
        this.props.addBox(newBox);
        this.setState({
            height: '', width: '', color: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="height">height</label>
                    <input
                        type="text"
                        name="height"
                        value={this.state.height}
                        id="height"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="width">width</label>
                    <input
                        type="text"
                        name="width"
                        value={this.state.width}
                        id="width"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="color">color</label>
                    <input
                        type="text"
                        name="color"
                        value={this.state.color}
                        id="color"
                        onChange={this.handleChange}
                    />
                </div>
                <button>Add New Box</button>
            </form>
        );
    }
}

export default FormNewBox;