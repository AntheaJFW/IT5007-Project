import React, { useContext } from 'react';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import client from '../services/client';
import { redirect, useNavigate } from 'react-router-dom';
function Dashboard(props) {
  const userAuthContext = useContext(AuthContext);
  const { navigate } = useNavigate();
  const handleOnClick = () => {
    client
      .get('/api/v1/user/all')
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate('/login');
          return redirect('/login');
        }
      });
  };

  return (
    <div>
      <Container className={['vh-100']}>
        <Row>
          <Col className={['col-md-12', 'shadow', 'rounded']}>
            <p>
              Hi, {userAuthContext.currentUser.username}. Accessing private
              route.
            </p>
            <Button onClick={handleOnClick} label='Test API' />
            <Button onClick={userAuthContext.logout} label='Logout' />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
