import React, {Component} from 'react';
import Box, {IBox} from "./Box";


interface IBoxListState {
    boxes: IBox[]
}

class BoxList extends Component<any,IBoxListState> {
    constructor(props:any) {
        super(props);
        this.state={boxes: [{width: 34, height:10, color: "pink"}]}
    }

    render() {
        const boxes = this.state.boxes.map((box)=>{
            return (
                <Box height={box.height} width={box.width} color={box.color}/>
            )
        })
        return (
            <div>
                <h1>Color Box Maker</h1>
                {boxes}
            </div>
        );
    }
}

export default BoxList;