import React, {Component} from 'react';
import { useParams} from 'react-router-dom';
import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos/?";
const CLIENT_ID = "client_id=bGpNZeHlPQerzPxojMZ9P42H37l899ZF8MeVeDOsaKc"

interface IMealProps {
    per_page?: number
    page?: number
    params: any
}
interface IMealState {
    foodImage: null|string
    foodAltText: null|string
    drinkQuery: any
    foodQuery: any
    drinkImage: null|string
    drinkAltText: null|string
}


/* This is a higher order component that
*  inject a special prop   to our component.
*/
function withParams(Component:any) {
    console.log(typeof(Component))
    return (props:any) => <Component {...props} params={useParams()} />;
}

class Meal extends Component<IMealProps,IMealState> {
    static defaultProps = {
        per_page: 10,
        page: 1,
    }

    constructor(props:any) {

        super(props);
        this.state = {
            foodImage: null,
            foodAltText: null,
            foodQuery: this.props.params.foodQuery,
            drinkImage: null,
            drinkAltText: null,
            drinkQuery: this.props.params.drinkQuery
        }


    }
    async componentDidMount() {
        /*  Set URL path here */
        const FOOD_URL = `${BASE_URL}${CLIENT_ID}&per_page=${this.props.per_page}&page=${this.props.page}&query=${this.state.foodQuery}`
        const DRINK_URL = `${BASE_URL}${CLIENT_ID}&per_page=${this.props.per_page}&page=${this.props.page}&query=${this.state.drinkQuery}`
        const foodRes = await axios.get(FOOD_URL);
        const drinkRes = await axios.get(DRINK_URL);

        /* Generate a random integer */
        const randInx = Math.floor(Math.random()*this.props.per_page!)


        const smallFoodlUrl = foodRes.data.results[randInx].urls.full
        const smallDrinklUrl = drinkRes.data.results[randInx].urls.full
        const altFoodText = foodRes.data.results[randInx].alt_description
        const altDrinkText = foodRes.data.results[randInx].alt_description

        this.setState({
            foodImage: smallFoodlUrl,
            foodAltText: altFoodText,
            drinkImage: smallDrinklUrl,
            drinkAltText: altDrinkText,
        })
    }

    render() {

        return (
            <div style={{textAlign: "center"}}>
                <h1> I love to eat {this.state.foodQuery} with {this.state.drinkQuery}</h1>
                <div  style={
                    {
                        margin: "auto",
                        height:'300px',
                        width: "300px",
                        backgroundImage: `url("${this.state.foodImage}")`,
                        backgroundSize: 'cover'
                    }
                }>
                </div>
                <div  style={
                    {
                        margin: "auto",
                        height:'300px',
                        width: "300px",
                        backgroundImage: `url("${this.state.drinkImage}")`,
                        backgroundSize: 'cover'
                    }
                }>
                </div>
            </div>
        );
    }
}
export default withParams(Meal);