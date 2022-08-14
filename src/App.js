import React, { Component } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';

class App extends Component {
  state = {
    user: null,
  };

  setUserInState = (incomingUserData) => {
    this.setState({user: incomingUserData });
  };

  // async componentDidMount() {
  //   let token = localStorage.getItem("token");
  //   try {
  //     let fetchOrdersResponse = await fetch("/api/users/verify", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!fetchOrdersResponse.ok) throw new Error("Couldn't fetch orders");
  //     let response = await fetchOrdersResponse.json();

  //     console.log(response);

  //     if (token && response.verified) {
  //       let userDoc = JSON.parse(atob(token.split(".")[1])).user;
  //       this.setState({ user: userDoc });
  //     } else {
  //       localStorage.removeItem("token");
  //       this.setState({ user: null });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  componentDidMount() {
    let token = localStorage.getItem('token');
     if (token){
      let userDoc = JSON.parse(atob(token.split('.')[1])).user;
      this.setState({user: userDoc});     
    } else {
      localStorage.removeItem("token")
      this.setState({ user: null });
    }
   } 

  render() {
    return (
      <div className="App">
        <Routes>
        { this.state.user ? (
          <Route path ='/home' element={<HomePage user={this.state.user} setUserInState={this.setUserInState}/>} />
          )  : (
          <Route path ='/' element={<AuthPage setUserInState={this.setUserInState}/>} />
        )};
        </Routes>
        </div>
    );
  }
}

export default App;