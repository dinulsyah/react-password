import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebase from '../config/firebase';
import '../App.css';
import { connect } from "react-redux";
import { setIsLogin } from "../store/action";
import { setEmail } from "../store/action";


class Landing extends Component {
    constructor(props){
        super(props);
        this.state = { 
            email:'',
            password:'',
        };
        this.setField = this.setField.bind(this)
    }

    componentDidMount(){
        this.isLoginFirebase((value,email) => {
            if(value){
                this.props.setEmail(email);
                this.props.setIsLogin(true);
                this.props.history.push("/home");
            }
            else{
                console.log('no user')
            }
        })
    }

    isLoginFirebase(cb){
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                cb(true,user.email)       
            }else{
                cb(false)
                console.log('no user');
            }
        })
    }

    addDataSuccess(e) {
        e.preventDefault()
        console.log('test',this.state.email, this.state.password)
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(authUser => {
                this.setField()
                this.props.setEmail(authUser.user.email);
                this.props.setIsLogin(true); 
                this.props.history.push('/home');
            })
            .catch((error) =>{
                alert(error.message)
                console.log(error.message);
            })
    }

    setField(){
        const backToInitialState = {
            email:'',
            password:''
        }
        this.setState(backToInitialState)
     }

    render() {
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
                        <Col md={4} className="login">
                            <h3 data-testid="heading">Sign in</h3>
                            <Form onSubmit={this.addDataSuccess.bind(this)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={emailInput} data-testid="email"/>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={passwordInput} data-testid="password"/>
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

export default connect(null,mapDispatchtoProps)(Landing);