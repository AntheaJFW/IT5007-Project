import React, { useContext } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import './Auth.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function Auth(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userAuthContext = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log('form submission', data);
    userAuthContext.login(data.email, data.password).then((e) => {
      if (e.status === 'success') {
        localStorage.setItem('userGlobals', JSON.stringify(e.data));
        return navigate(location?.state?.from || '/');
      } else {
        // Todo: need to implement login error
        console.log('Error logging in');
      }
    });
  };

  return Object.keys(userAuthContext.currentUser)?.length === 0 ? (
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
          <Button
            variant='primary'
            type='submit'
            label='Submit'
            className={['w-100']}
          />
        </Form>
      </Row>
    </Col>
  ) : (
    <Navigate to={location?.state?.from || '/dashboard'} />
  );
}
