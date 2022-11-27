import React, {Component} from 'react';
import { useParams} from 'react-router-dom';
import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos/?";
const CLIENT_ID = "client_id=bGpNZeHlPQerzPxojMZ9P42H37l899ZF8MeVeDOsaKc"

interface IFoodProps {
    per_page?: number
    page?: number
    params: any
}
interface IFoodState {
    image: null|string
    altText: null|string
    query: any
}


/* This is a higher order component that
*  inject a special prop   to our component.
*/
function withParams(Component:any) {
    console.log(typeof(Component))
    return (props:any) => <Component {...props} params={useParams()} />;
}

class Food extends Component<IFoodProps,IFoodState> {
    static defaultProps = {
        per_page: 10,
        page: 1,
    }

    constructor(props:any) {

        super(props);
        this.state = {
            image: null,
            altText: null,
            query: this.props.params.query
        }


    }
    async componentDidMount() {
        /*  Set URL path here */
        const URL = `${BASE_URL}${CLIENT_ID}&per_page=${this.props.per_page}&page=${this.props.page}&query=${this.state.query}`
        const res = await axios.get(URL);

        /* Generate a random integer */
        const randInx = Math.floor(Math.random()*this.props.per_page!)


        const smallUrl = res.data.results[randInx].urls.full
        const altText = res.data.results[randInx].alt_description

        this.setState({image: smallUrl,altText:altText})
    }

    render() {

            return (
            <div style={{textAlign: "center"}}>
                <h1> I love to eat {this.state.query}</h1>
                <div  style={
                    {
                        margin: "auto",
                        height:'300px',
                        width: "300px",
                        backgroundImage: `url("${this.state.image}")`,
                        backgroundSize: 'cover'
                    }
                }>
                </div>
            </div>
        );
    }
}
export default withParams(Food);
