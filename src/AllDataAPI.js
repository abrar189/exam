import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useAuth0 } from "@auth0/auth0-react";
class AllDataAPI extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: [],
            profileData:[]
        }
    }
    // const user=this.props.auth0;
    componentDidMount = async () => {
        axios.get(`${process.env.REACT_APP_SERVER}/getAPIData`).then(result => {
            this.setState({
                color: result.data
            })
        })
        console.log('asdasdas', this.state.color);
    }
    addColor=async(index)=>{
        console.log('indexxx',index)
        console.log(this.state.color[index],'sasdttttt')
        const colorData={
            colorName:this.state.color[index].name,
            colorImage:this.state.color[index].image
        }
        axios.post(`${process.env.REACT_APP_SERVER}/getAPIData?email=${this.props.auth0.user.email}`,colorData);
        console.log('eeeeeeeee',this.props.auth0.user.email)

        console.log('runnnnn',colorData)
    }

   




    render() {
        console.log('asdasdas', this.state.color)

        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>


                {this.state.color.map((element,index)=>{
                    return (
                        <div key={index} className="laith">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={element.image} />
                            <Card.Body>
                                <Card.Title>{element.name}</Card.Title>
                                
                                <Button onClick={()=>{this.addColor(index)}} variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>

                    )
                })}
               
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
