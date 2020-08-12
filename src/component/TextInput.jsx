import React, { useState } from 'react';
import axios from 'axios'

import {
  Form,
  Button,
  Row,
  Toast
} from "react-bootstrap";

export default function TextInput(props) {
  const [title, setTitle] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleGetProps = props.funcGetInput

  const postData = () => {
    axios.post('https://btm-rn.herokuapp.com/api/v1/todo/', {
      title: title,
    })
      .then(function (response) {
        console.log(response);
        handleGetProps()
        setTitle("")
        setShowInput(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Form inline>
          <Form.Control type="text" placeholder="Add your to do" className="m-2 " style={{ width: '20rem' }} value={title} onChange={e => setTitle(e.target.value)} />
          <Button variant="dark" style={{ width: '5rem' }} onClick={postData}>Add</Button>
        </Form>
      </Row>
      <Toast onClose={() => setShowInput(false)} show={showInput} delay={3000} autohide className="fixed-bottom bg-dark text-light m-2">
        <Toast.Body>New todo has been added!</Toast.Body>
      </Toast>
    </div>
  )
}