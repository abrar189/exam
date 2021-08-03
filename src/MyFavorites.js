import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
class MyFavorites extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      profileData: []
    }
  }




  // http://localhost:3001/?email=laithhayajneh98@gmail.com
  componentDidMount = async () => {
    console.log('semmmmm', this.props.auth0.user.email)
    let server = process.env.REACT_APP_SERVER;
    console.log('seeerver', server)
    let profileRead = await axios.get(`${server}/?email=${this.props.auth0.user.email}`);
    console.log('profile read', profileRead)
    await this.setState({
      profileData: profileRead.data
    })
    console.log('this is profile data', this.state.profileData)
  }



  deleteHandler = async (id) => {
    let server = process.env.REACT_APP_SERVER;
    const colorData = await axios.delete(`${server}/${id}?email=${this.props.auth0.user.email}`);
    this.setState({
      profileData: colorData.data
    })
  }


  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>

        {this.state.profileData.map((element, index) => {
          return (
            <div key={index} className="laith">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={element.image} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>

                  <Button onClick={() => { this.deleteHandler(index) }} variant="primary">delete</Button>
                </Card.Body>
              </Card>
            </div>

          )
        })}

      </>
    )
  }
}

export default withAuth0(MyFavorites);

