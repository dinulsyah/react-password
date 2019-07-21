import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from '../config/firebase';

export default class Create extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                url: '',
                username: '',
                password: '',
                createdAt:'',
                updatedAt: '',
                email:''
              },
              hasLowerCase:false,
              hasUpperCase:false,
              hasNumber:false,
              hasSpecial:false,
              has5Char:false,
              key:'',
              iterate:0
            }
        this.validationSuccess = this.validationSuccess.bind(this)
    }

    componentDidMount() {
      const ref = firebase.firestore().collection('passwords').doc(this.props.match.params.id);
      ref.get().then((doc) => {
        if (doc.exists) {
          const password = doc.data();
          this.setState({
            key: doc.id,
            data:{
              url:password.url,
              username:password.username,
              password:password.password,
              createdAt:password.createdAt,
              updatedAt:password.updatedAt,
              email:password.email
            }
          },() => {
            console.log(this.state.data)
          });
          this.validatePassword(this.state.data.password)
        } else {
          console.log("No such document!");
        }
      });
    }

    handleChange(e) {
        const updateState = this.state.data;
        updateState[e.target.name] = e.target.value;
        console.log(e.target.value)
        if(e.target.name === 'password' && this.state.iterate === 0){
          this.setState({
            iterate:this.state.iterate + 1
          })
        }
        this.setState(updateState);
        this.validatePassword(this.state.data.password)
    }

    validatePassword(value) {
        const regex1 = new RegExp('^(?=.*[a-z])')
        const regex2 = new RegExp('^(?=.*[A-Z])')
        const regex3 = new RegExp('^(?=.*[0-9])')
        const regex4 = new RegExp('^(?=.*[!@#$%^&*])')
        const regex5 = new RegExp('^(?=.{6,})');
 
        if(regex1.test(value)){
          this.setState({hasLowerCase:true})
        } else {
          this.setState({hasLowerCase:false})
        }
    
        if(regex2.test(value)) {
          this.setState({hasUpperCase:true})
        } else {
          this.setState({hasUpperCase:false})
        }
    
        if(regex3.test(value)) {
          this.setState({hasNumber:true})
        } else {
          this.setState({hasNumber:false})
        }
    
        if(regex4.test(value)) {
          this.setState({hasSpecial:true})
        } else {
          this.setState({hasSpecial:false})
        }
    
        if(regex5.test(value)) {
          this.setState({has5Char:true})
        } else {
          this.setState({has5Char:false})
        }
    }

    addDataSuccess (e) {
      e.preventDefault()
      const { url, username, password , email ,createdAt} = this.state.data;
      if(this.validationSuccess()){
        const updateRef = firebase.firestore().collection('passwords').doc(this.state.key);
        let date = new Date().toLocaleDateString("en",{year:"numeric",day:"2-digit",month:"2-digit"});
        updateRef.set({
          url, 
          username, 
          password,
          createdAt,
          updatedAt:date,
          email
        }).then((docRef) => {
          const backToInitialState = {
            data: {
              url: '',
              username: '',
              password: ''
            },
            hasLowerCase:false,
            hasUpperCase:false,
            hasNumber:false,
            hasSpecial:false,
            has5Char:false
          }
          this.setState(backToInitialState) 
          this.props.history.push("/detail/"+this.props.match.params.id)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
     else{
      alert('validasi gagal')
     }
    }

    validationSuccess() {
      if(this.state.hasLowerCase && this.state.hasUpperCase && this.state.hasSpecial && this.state.hasNumber && this.state.has5Char) {
        return true
      } else {
        return false
      }
    }
  
    render() {
        return (
            <div style={{ padding: 15}}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8} className="update-create">
                        <Form onSubmit={this.addDataSuccess.bind(this)}>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label className="font-style">Url</Form.Label>
                                <Form.Control type="text" placeholder="Enter url" name='url' onChange={this.handleChange.bind(this)} value={this.state.data.url} className="size-input"/>
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label className="font-style">Username</Form.Label>
                                <Form.Control type="text" name='username' placeholder="Enter Username" onChange={this.handleChange.bind(this)} value={this.state.data.username} className="size-input"/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label className="font-style">Password</Form.Label>
                                <Form.Control type="text" name='password' placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.data.password} className="size-input"/>
                            </Form.Group>
                            {(this.state.data.password) 
                            ? (
                            <div className="center-alert">
                                <Alert variant={(this.state.hasLowerCase) ? "success" : "danger"} className="alert-custom">
                                    Password at least must have one lowercase character
                                </Alert>
                                <Alert variant={(this.state.hasUpperCase) ? "success" : "danger"}  className="alert-custom">
                                    Password at least must have one uppercase character
                                </Alert>
                                <Alert variant={(this.state.hasNumber) ? "success" : "danger"}  className="alert-custom">
                                    Password at least must have one number character
                                </Alert>
                                <Alert variant={(this.state.hasSpecial) ? "success" : "danger"}  className="alert-custom">
                                    Password at least must have one special character
                                </Alert>
                                <Alert variant={(this.state.has5Char) ? "success" : "danger"}  className="alert-custom">
                                    Password length must be more than 5 characters
                                </Alert>
                            </div>)
                            :''
                            }
                            <Button variant="primary" type="submit" size="sm">
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