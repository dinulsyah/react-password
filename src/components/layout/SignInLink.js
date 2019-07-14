import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function SignIn() {
    return (
        <div>
            <Link to='/'><Button variant="success" size="sm">My Dashboard</Button></Link>&nbsp;&nbsp;
            <Link to='/create'><Button variant="success" size="sm">Create New Password</Button></Link>&nbsp;&nbsp;
            <Button variant="danger" size="sm">Sign Out</Button>
        </div>
    )
}
