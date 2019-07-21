import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import { connect } from "react-redux";
import { setIsLogin } from "../../store/action";
import { setEmail } from "../../store/action";

class SignInLink extends Component {
    logout = () => {
        this.props.setIsLogin(false);
        this.props.setEmail("");
        firebase.auth().signOut();
    };

    render() {
        return (
            <div>
                <Link to='/home'><Button variant="success" size="sm">My Dashboard</Button></Link>&nbsp;&nbsp;
                <Link to='/create'><Button variant="success" size="sm">Create New Password</Button></Link>&nbsp;&nbsp;
                <Button variant="danger" size="sm" onClick={this.logout}>Sign Out</Button>
            </div>
        )
    }
}

const mapDispatchtoProps = {
    setIsLogin,
    setEmail
};
  
export default connect(null,mapDispatchtoProps)(SignInLink);
  