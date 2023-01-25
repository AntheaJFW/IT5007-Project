import React, { useContext } from 'react';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
function Dashboard(props) {
  const userAuthContext = useContext(AuthContext);
  const handleOnClick = () => {
    userAuthContext
      .fetchAPI('/api/v1/users', null, { method: 'get' })
      .then((response) => response.json())
      .then((d) => console.log(d));
  };

  return (
    <div>
      <Container className={['vh-100']}>
        <Row>
          <Col className={['col-md-12', 'shadow', 'rounded']}>
            <p>Hi, {userAuthContext.currentUser.username}</p>
            <Button onClick={handleOnClick} label='Test API' />
            <Button onClick={userAuthContext.logout} label='Logout' />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
