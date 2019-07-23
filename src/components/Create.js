import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from '../config/firebase';
import { connect } from 'react-redux';
import { createPassword, resetStatus} from '../store/action';

class Create extends React.Component{
    constructor(props){
        super(props);
        this.ref = firebase.db.collection('passwords');
        let date = new Date().toLocaleDateString("en",{year:"numeric",day:"2-digit",month:"2-digit"});
        this.state = {
            data: {
                url: '',
                username: '',
                password: '',
                createdAt: date,
                updatedAt: date,
                email:this.props.email
              },
              hasLowerCase:false,
              hasUpperCase:false,
              hasNumber:false,
              hasSpecial:false,
              has5Char:false,
              iterate:0
            }
    }

    componentDidUpdate(prevProps){
      if(prevProps.status !== this.props.status){
          this.props.resetStatus()
          this.setField()
          this.props.history.push("/home")
      }
    }

    setField(){
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
      if(this.validationSuccess()){
        const { url, username, password, createdAt, updatedAt, email} = this.state;
        this.props.createPassword({
          url,
          username,
          password,
          createdAt,
          updatedAt,
          email
        })
      }
     else{
      this.setField()
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
                                <Form.Control type="text" placeholder="Enter url" name='url' onChange={this.handleChange.bind(this)} value={this.state.data.url} className="size-input" data-testid="url"/>
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label className="font-style">Username</Form.Label>
                                <Form.Control type="text" name='username' placeholder="Enter Username" onChange={this.handleChange.bind(this)} value={this.state.data.username} className="size-input" data-testid="username"/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label className="font-style">Password</Form.Label>
                                <Form.Control type="password" name='password' placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.data.password} className="size-input" data-testid="password"/>
                            </Form.Group>
                            {(this.state.data.password) 
                            ? (
                            <div className="center-alert">
                                <Alert data-testid="lower" variant={(this.state.hasLowerCase) ? "success" : "danger"} className="alert-custom">
                                    Password at least must have one lowercase character
                                </Alert>
                                <Alert data-testid="upper" variant={(this.state.hasUpperCase) ? "success" : "danger"}  className="alert-custom">
                                    Password at least must have one uppercase character
                                </Alert>
                                <Alert data-testid="number" variant={(this.state.hasNumber) ? "success" : "danger"}  className="alert-custom">
                                    Password at least must have one number character
                                </Alert>
                                <Alert data-testid="special" variant={(this.state.hasSpecial) ? "success" : "danger"}  className="alert-custom">
                                    Password at least must have one special character
                                </Alert>
                                <Alert data-testid="length" variant={(this.state.has5Char) ? "success" : "danger"}  className="alert-custom">
                                    Password length must be more than 5 characters
                                </Alert>
                            </div>)
                            :''
                            }
                            <Button variant="primary" type="submit" size="sm" data-testid="testaja">
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

const mapStateToProps = (state) => {
  return{
    status:state.passwords.status,
    email:state.email
  }
}

const mapDispatchToProps = { createPassword , resetStatus}

export default connect(mapStateToProps,mapDispatchToProps)(Create)