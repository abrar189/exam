import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import CardApi from './components/CardApi';


class AllDataAPI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coffee: [],
        }
    }
    // http://localhost:3007/dataDB?email=
    componentDidMount = async () => {

        let result = await axios.get(`${process.env.REACT_APP_SERVER}/dataapi`);
        this.setState({
            coffee: result.data
        })
    }

    addToFavfun = async (index) => {
        const ObjData = {
            email: this.props.auth0.user.email,
            strDrink:this.state.coffee[index].strDrink,
            strDrinkThumb:this.state.coffee[index].strDrinkThumb,
            idDrink:this.state.coffee[index].idDrink,
        }
        await axios.post(`${process.env.REACT_APP_SERVER}/addToFav`,ObjData)
    }



    render() {

        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites </h3>


                <CardApi coffee={this.state.coffee} addToFavfun={this.addToFavfun}/>

            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
