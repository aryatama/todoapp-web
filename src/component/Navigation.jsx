import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar
} from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar variant="dark" bg="dark" className="justify-content-center" sticky="top">
            <Navbar.Brand href="#home">React Todo App</Navbar.Brand>
        </Navbar>
    );
};
