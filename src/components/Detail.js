import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import firebase from '../config/firebase';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          password: {},
          key: ''
        };
    }

    componentDidMount(){
        const ref = firebase.firestore().collection('passwords').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              password: doc.data(),
              key: doc.id,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
    }

    delete(id){
        firebase.firestore().collection('passwords').doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.props.history.push("/home")
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    }

    render() {
        return (
            <div style={{ padding: 15 }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={8} className="update-create">
                            <h1 className="font-style">Detail</h1>
                            <Card style={{ width: '18rem' }} className="center-detail">
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">Url:<b>{this.state.password.url}</b></Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Username:{this.state.password.username}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Password:{this.state.password.password}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">CreatedAt:{this.state.password.createdAt}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">UpdatedAt:{this.state.password.updatedAt}</Card.Subtitle>
                                    <Link to={'/edit/' + this.state.key}><Button variant="success" size="sm">Edit</Button></Link>&nbsp;&nbsp;
                                    <Button variant="danger" size="sm" onClick={this.delete.bind(this, this.state.key)}>Delete</Button>&nbsp;&nbsp;
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

