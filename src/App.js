import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  Container,
  Row,
} from 'react-bootstrap';

import Navigation from './component/Navigation';
import TextInput from './component/TextInput';
import TodoLists from "./component/TodoLists";


export default function App() {
  const [todo, setTodo] = useState({ results: [] })

  const fetchData = async () => {
    try {
      const result = await axios('https://btm-rn.herokuapp.com/api/v1/todo/');
      setTodo(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Navigation />

      <Container>
        <TextInput
          funcGetInput={fetchData}
        />

        <Row className="justify-content-center">
          <TodoLists
            handleDataTodo={todo}
            funcGetInput={fetchData}
          />
        </Row>
      </Container>
      
    </div>
  );
};

