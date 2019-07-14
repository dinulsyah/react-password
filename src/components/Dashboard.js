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


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('passwords');
        this.unsubscribe = null;
        this.state = {
            passwords: [],
            value: ''
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const passwords = [];
        querySnapshot.forEach((doc) => {
            const { url, password, username, createdAt, updatedAt } = doc.data();
            passwords.push({
                key: doc.id,
                doc,
                url,
                password,
                username,
                createdAt,
                updatedAt
            });
        });
        this.setState({
            passwords
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    render() {
        let filteredPassword = this.state.passwords.filter(
            (password) => {
                return password.url.indexOf(this.state.value)!== -1;
            }
        );
        return (
            <div style={{ padding: 50 }}>
                <Container>
                    <h1 className="font-style"><span><u>My Password List</u></span></h1>
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
                                    {filteredPassword.map((password,index) =>
                                        <tr key={index}>
                                            <td>{password.url}</td>
                                            <td>{password.username}</td>
                                            <td>{password.password}</td>
                                            <td>{password.createdAt}</td>
                                            <td>{password.updatedAt}</td>
                                            <td><Link to={`/detail/${password.key}`}><Button variant="primary" size="sm">Detail</Button></Link></td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
