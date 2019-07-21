import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../App.css';
import firebase from '../config/firebase';
import { connect } from 'react-redux';
import { readPassword } from '../store/action';
import { setIsLogin } from "../store/action";
import { setEmail } from "../store/action";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.email){
            this.ref = firebase.firestore().collection('passwords').where("email", "==", this.props.email);
        }   
        this.unsubscribe = null;
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        if(this.props.email){
            this.unsubscribe = this.ref.onSnapshot(this.props.readPassword);
        }
        this.isLoginFirebase((value,email) => {
            if(value){
                this.props.setEmail(email);
                this.props.setIsLogin(true);
            }
            else{
                console.log('no user')
            }
        })
    }

    componentDidUpdate(){
        if(this.props.isLogin === false ){
            this.props.history.push('/')
        }
    }

    isLoginFirebase = (cb) => {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                cb(true,user.email)       
            }else{
                cb(false)
                console.log('no user');
            }
        })
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    render() {
        if(this.props.passwords){
            var filteredPassword = this.props.passwords.filter(
                (password) => {
                    return password.url.indexOf(this.state.value)!== -1;
                }
            );
        }

        if(this.props.email){
            this.ref = firebase.firestore().collection('passwords').where("email", "==", this.props.email);
            this.unsubscribe = this.ref.onSnapshot(this.props.readPassword);
        }

        return (
            <div style={{ padding: 50 }}>
                <Container>
                    <h1 className="font-style" data-testid="title"><span><u>My Password List</u></span></h1>
                    <Row className="justify-content-md-center" style={{ padding: 50 }}>
                        <Col md={4}>
                            <Form.Control type="text" placeholder="Search Url.." value={this.state.value} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={10}>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>URL</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>CreatedAt</th>
                                        <th>UpdatedAt</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (filteredPassword) ?
                                        filteredPassword.map((password,index) =>
                                        <tr key={index}>
                                            <td>{password.url}</td>
                                            <td>{password.username}</td>
                                            <td>{password.password}</td>
                                            <td>{password.createdAt}</td>
                                            <td>{password.updatedAt}</td>
                                            <td><Link to={`/detail/${password.key}`}><Button variant="primary" size="sm">Detail</Button></Link></td>
                                        </tr>
                                        )
                                        :''
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        passwords:state.passwords.alldata,
        isLogin:state.isLogin,
        email:state.email
    }
}
  
const mapDispatchToProps = {readPassword, setIsLogin, setEmail}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)