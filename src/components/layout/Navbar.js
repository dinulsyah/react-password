import React , { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import SignIn from './SignInLink';
import SignOut from './SignOutLink';
import '../../App.css';
import { connect } from 'react-redux';

class MyNavbar extends Component {
    render() {
        return (    
            <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="font-style">
                    <img
                        alt=""
                        src="https://image.flaticon.com/icons/svg/1890/1890365.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    <span>
                    {' React-Password Manager'}
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    { 
                        (this.props.isLogin) ?
                        <Navbar.Text>
                            <SignIn></SignIn>
                        </Navbar.Text>
                        :
                        <Navbar.Text className="margin-right-nav">
                            <SignOut></SignOut>
                    </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isLogin:state.isLogin
    }
}

export default connect(mapStateToProps)(MyNavbar)