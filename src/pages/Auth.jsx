import React, { useContext, useState, useEffect } from 'react';

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

export default function Auth(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userAuthContext = useContext(AuthContext);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const dateNow = new Date();
        if (decodedToken.exp > dateNow.getTime() / 1000) {
          client.setToken(token);
          client
            .get('/api/v1/user')
            .then((response) => {
              userAuthContext.setCurrentUserCallback({
                token,
                ...response.data.data,
              });
              navigate(location?.state?.from || '/dashboard');
            })
            .catch((err) => {
              userAuthContext.logout();
            });
        }
      } catch (e) {
        console.log('token invalid');
      }
    }
  }, [userAuthContext.token]);

  const onSubmit = (data) => {
    return userAuthContext
      .login(data.email, data.password)
      .then((e) => {
        if (e.status === 200) {
          client.setToken(e.data.token);
          localStorage.setItem('userToken', e.data.token);

          client.get('/api/v1/user').then((response) => {
            userAuthContext.setCurrentUserCallback({
              token: e.data.token,
              ...response.data,
            });
          });

          navigate(location?.state?.from?.pathname || '/dashboard', {
            replace: true,
          });
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

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
        <h2>Login</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='text-danger'>This field is required</span>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='text-danger'>This field is required</span>
            )}
          </Form.Group>
          {location?.state?.message && (
            <Alert variant='info'>{location?.state?.message}</Alert>
          )}
          {error && <Alert variant='danger'>{error}</Alert>}
          <Button
            variant='primary'
            type='submit'
            label='Submit'
            className={['w-100']}
          />
        </Form>
      </Row>
    </Col>
  );
}
