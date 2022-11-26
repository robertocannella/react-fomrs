import React, {Component} from 'react';
import Box, {IBox} from "./Box";
import FormNewBox from "./FormNewBox";
import { v4 as uuidv4 } from 'uuid';

interface IBoxListState {
    boxes: IBox[]
}

class BoxList extends Component<any,IBoxListState> {
    constructor(props:any) {
        super(props);
        this.state={boxes: [{width: 30, height:6, color: "pink", id: uuidv4()}]}

        this.addBox = this.addBox.bind(this);
        this.removeBox = this.removeBox.bind(this);
    }
    addBox(box: IBox){

        this.setState((state)=>(
            {
                boxes: [...state.boxes, box]
            }
        ))
    }
    removeBox(id: string){
        this.setState({
            boxes: this.state.boxes.filter((box)=>{
                return box.id !== id
            })
        })
    }

    render() {
        const boxes = this.state.boxes.map((box)=>{
            return (
                <Box
                    height={box.height}
                    width={box.width}
                    color={box.color}
                    key={box.id} id={box.id}
                    removeBox={this.removeBox}
                />
            )
        })
        return (
            <div>
                <h1>Color Box Maker</h1>
                <FormNewBox key={uuidv4()} addBox={this.addBox}/>
                {boxes}
            </div>
        );
    }
}

export default BoxList;