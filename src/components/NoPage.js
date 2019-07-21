import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NoPage(){
    return (
        <div style={{padding:50}}>
            <img src="https://image.flaticon.com/icons/svg/1628/1628173.svg" style={{width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} alt=""/>
            <h1 data-testid="nopage">Page Not Found</h1>
            <center>
                <Link to="/">
                <Button variant="primary" size="sm">
                    Return to Home Page
                </Button>
                </Link>
            </center>
        </div>
    )
}
