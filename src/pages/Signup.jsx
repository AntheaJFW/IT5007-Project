import React, { useState } from 'react'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import './Auth.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import client from '../services/client';
import { navigate } from '@storybook/addon-links';

const Signup =()=>{

    const navigate = useNavigate();
    
    const [formData,setformData] = useState({
        email : '',
        password : '',
        re_enter_password: ''
    })

    const handlechange=(event)=>{
        setformData(prev=>({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        //promise to add record to db here
        navigate('/login')
    }

    console.log(formData)

    return (
    <Col className={'vh-100'} id='auth-background'>
      <Row
        className={[
          'shadow',
          'p-3',
          'mb-5',
          'rounded',
          'col-lg-4',
          'align-middle',
          'position-absolute',
          'top-50',
          'start-50',
          'translate-middle',
          'bg-white',
        ]}
        >
        <h2>Signup</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                placeholder='Enter Email'
                name='email'
                onChange={handlechange}
                value={formData.email}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                placeholder='Enter Password'
                name='password'
                onChange={handlechange}
                value={formData.password}
                />
            </Form.Group>

            

            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Re-enter Password</Form.Label>
                <Form.Control
                placeholder='Re-enter Password'
                name='re_enter_password'
                onChange={handlechange}
                value={formData.re_enter_password}
                />
                {(formData.password !== formData.re_enter_password) && 
                <span className='text-danger'
                >Password fields are not the same</span>}
                
            </Form.Group>
            
            
            <Button
                variant='primary'
                type='submit'
                label='Signup'
                className={['w-100']}
            />
        </Form>
        
        </Row>
    </Col>

    )
}

export default Signup