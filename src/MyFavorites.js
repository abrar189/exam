import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import CardFav from './components/CardFav';
import UpdateModal from './components/UpdateModal';

class MyFavorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coffee: [],
      showModal:false,
      index:0,
      selectData:{},
    }
  }
  // http://localhost:3007/dataDB?email=
  componentDidMount = async () => {
    let email = this.props.auth0.user.email;
    let result = await axios.get(`${process.env.REACT_APP_SERVER}/dataDB?email=${email}`);
    this.setState({
      coffee: result.data
    })
  }

  // http://localhost:3007/delete/idx?email=
  deleteFun =async(index)=>{
    let email = this.props.auth0.user.email;
    let result = await axios.delete(`${process.env.REACT_APP_SERVER}/delete/${index}?email=${email}`);
    this.setState({
      coffee: result.data
    })
  }

  handleClose=()=>{
    this.setState({
      showModal:false,
    })
  }

  updateFun =async(e)=>{
    e.preventDefault();
    const ObjData = {
      email: this.props.auth0.user.email,
      strDrink:e.target.strDrink.value,
      strDrinkThumb:e.target.strDrinkThumb.value,
      idDrink:e.target.idDrink.value,
  }
  let result = await axios.put(`${process.env.REACT_APP_SERVER}/update/${this.state.index}`,ObjData);
    this.setState({
      coffee: result.data
    })
}

showModal=async(index)=>{
  this.setState({
    showModal:true,
    index:index,
   selectData : {
    strDrink:this.state.coffee[index].strDrink,
    strDrinkThumb:this.state.coffee[index].strDrinkThumb,
    idDrink:this.state.coffee[index].idDrink,
}
})
}
  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>

        <CardFav coffee={this.state.coffee} deleteFun={this.deleteFun} showModal={this.showModal} />
        <UpdateModal updateFun={this.updateFun} handleClose={this.handleClose} showModal={this.state.showModal} 
        selectData={this.state.selectData}/>
      </>
    )
  }
}

export default withAuth0(MyFavorites);

