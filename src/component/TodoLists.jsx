import React, { useState } from 'react';
import axios from 'axios'

import {
    Button,
    Accordion,
    Card,
    Form,
    Toast
} from "react-bootstrap";

export default function TodoLists(props) {
    const [newTitle, setNewTitle] = useState('')
    const [showUbah, setShowUbah] = useState(false);
    const [showUDelete, setShowDelete] = useState(false);



    const todo = props.handleDataTodo
    const handleGetProps = props.funcGetInput

    const delData = id => {
        axios.delete(`https://btm-rn.herokuapp.com/api/v1/todo/${id}`)
            .then(function (response) {
                console.log(response);
                handleGetProps()
                setShowDelete(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const putData = (id, data) => {
        axios.put(`https://btm-rn.herokuapp.com/api/v1/todo/${id}`, {
            title: data,
        })
            .then(function (response) {
                console.log(response);
                handleGetProps();
                setNewTitle('')
                setShowUbah(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const putCheckData = (id, data) => {
        axios.put(`https://btm-rn.herokuapp.com/api/v1/todo/${id}`, {
            isComplete: data,
        })
            .then(function (response) {
                console.log(response);
                handleGetProps();
                setShowUbah(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div style={{ width: '30rem' }}>
            {todo.results.map(item => (
                <Accordion >
                    <Card>
                        <Card.Header className="d-flex">
                            <Form.Check inline id={item._id} label={item.title} className="mr-auto" checked={item.isComplete} onChange={() => (putCheckData(item._id, !item.isComplete))}/>
                            <Accordion.Toggle as={Button} variant="info" className="mr-2" eventKey={item._id}>
                                <ion-icon name="create" ></ion-icon>
                            </Accordion.Toggle>
                            <Button
                                className=""
                                variant="secondary"
                                onClick={() => (delData(item._id))}>
                                <ion-icon name="trash" ></ion-icon>
                            </Button>
                        </Card.Header>
                        <Accordion.Collapse eventKey={item._id}>
                            <Card.Body>
                                <Form inline>
                                    <Form.Control type="text" placeholder="Change your to do" className="m-2" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                                    <Accordion.Toggle as={Button} variant="dark" eventKey={item._id} onClick={() => (putData(item._id, newTitle))}>
                                        Save
                                    </Accordion.Toggle>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            ))}
            <Toast onClose={() => setShowUbah(false)} show={showUbah} delay={3000} autohide className="fixed-bottom bg-dark text-light m-2">
                <Toast.Body>Todo has been changed!</Toast.Body>
            </Toast>

            <Toast onClose={() => setShowDelete(false)} show={showUDelete} delay={3000} autohide className="fixed-bottom bg-dark text-light m-2">
                <Toast.Body>Todo was deleted!</Toast.Body>
            </Toast>
        </div>
    )
}