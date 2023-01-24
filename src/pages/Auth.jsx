import React from "react"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from '../components/Button';
import './Auth.css';

export default function Auth(props) {
    return (
        <Col className={'vh-100'} id="auth-background">
            <Row className={["shadow",
                            'p-3',
                            'mb-5',
                            'rounded',
                            'col-lg-4',
                            'align-middle',
                            'position-absolute',
                            'top-50',
                            'start-50',
                            'translate-middle',
                            'bg-white'
                ]}>
                <h2>Login</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </ Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" label="Submit" className={["w-100"]}/>
                </Form>
            </Row>
        </Col>
    )
}