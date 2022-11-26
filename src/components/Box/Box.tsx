import React, {Component} from 'react';

export interface IBox {
    id?: string,
    height: number,
    width: number,
    color: string
}
export interface IBoxProps{
    removeBox: Function
    id?: string,
    height: number,
    width: number,
    color: string
}

class Box extends Component<IBoxProps> {
    constructor(props:any) {
        super(props);

        this.handleRemoveBox = this.handleRemoveBox.bind(this)
    }

    handleRemoveBox(){
        this.props.removeBox(this.props.id);
    }
    render() {
        return (
            <div>

            <div style= {{
                height: `${this.props.height}em`,
                width: `${this.props.width}em`,
                backgroundColor: `${this.props.color}`,
            }}>
            </div>
                <button onClick={this.handleRemoveBox}>X</button>
            </div>

        );
    }
}

export default Box;