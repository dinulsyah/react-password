import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';
import firebase from '../config/firebase';
import { connect } from "react-redux";
import { setIsLogin } from "../store/action";
import { setEmail } from "../store/action";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = { 
            username:'',
            email:'',
            password:'',
            login:''
        };
        this.addDataSuccess = this.addDataSuccess.bind(this)
    }

    componentDidMount(){
        this.isLoginFirebase((value,email) => {
            if(value){
                this.props.setEmail(email);
                this.props.setIsLogin(true);
                this.props.history.push("/home");
            }
        })
    }

    isLoginFirebase(cb){
        firebase.auth.onAuthStateChanged(function(user){
            if(user){
                cb(true,user.email)       
            }
        })
    }

    addDataSuccess (e) {
        e.preventDefault()
        console.log('test',this.state.username, this.state.email, this.state.password)
        firebase.register(this.state.email,this.state.password)
            .then(authUser => {
                this.props.setEmail(authUser.user.email);
                this.props.setIsLogin(true); 
                this.props.history.push('/home')  
            })
            .catch((error) =>{
                alert(error.message)
                console.log(error);
            })
    }

    render() {
        const usernameInput = (event) =>{
            this.setState({
                username:event.target.value
            })
        }
    
        const emailInput = (event) =>{
            this.setState({
                email:event.target.value
            })
        }
    
        const passwordInput = (event) => {
            this.setState({
                password:event.target.value
            })
        }

        return (
            <div style={{ padding: 15 }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={4} className="register">
                            <h3>Sign up</h3>
                            <Form onSubmit={this.addDataSuccess.bind(this)}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control onChange={usernameInput} type="text" placeholder="Enter username" data-testid="username"/>
                                </Form.Group>
                                
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={emailInput} type="email" placeholder="Enter email" data-testid="email"/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={passwordInput} type="password" placeholder="Password" data-testid="password"/>
                                </Form.Group>

                                <Button variant="primary" type="submit" data-testid="testaja">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapDispatchtoProps = {
    setIsLogin,
    setEmail
};

export default connect(null,mapDispatchtoProps)(Register);
