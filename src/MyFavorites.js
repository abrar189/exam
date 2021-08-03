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
      profileData: [],
      profile:{},
      showUpdateModel:false,
      id:''
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


updateModel=async (id)=>{
  this.setState({
    showUpdateModel:true,
    id:id,
    profile:this.state.profileData.find(items=>{
      return items._id.toString() === id
    })
  })
}




updateHandler=async(e)=>{
  e.preventDefault();
  const colorFormData={
    email:his.props.auth0.user.email,
    colorName:e.target.colorName,
    colorImage:e.target.colorImage
  }

  try{
    let server = process.env.REACT_APP_SERVER;
    const colorData=await axios.put(`${server}/${this.state.id}`,colorFormData)
    this.setState({
      profileData:colorData.color
    })

  }catch(error){
    console.error(error)
  }

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
                  <Button onClick={() => { this.deleteHandler(index) }} variant="primary">update</Button>


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

