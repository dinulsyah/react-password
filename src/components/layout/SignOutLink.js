import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function SignOut() {
    return (
        <div>
            &nbsp;&nbsp;
            <Link to='/register'><Button variant="primary" size="sm">Register</Button></Link>&nbsp;&nbsp;
            <Link to='/signin'><Button variant="primary" size="sm">Sign In</Button></Link>
        </div>
    )
}
