import React, {Component} from 'react';

export interface IBox {
    height: number,
    width: number,
    color: string
}

class Box extends Component<IBox> {
    render() {
        return (
            <div>

            <div style= {{
                height: `${this.props.height}em`,
                width: `${this.props.width}em`,
                backgroundColor: `${this.props.color}`,
            }}>
            </div>
                <button>X</button>
            </div>

        );
    }
}

export default Box;