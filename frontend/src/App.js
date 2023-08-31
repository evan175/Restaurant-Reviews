import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() { 
    setUser(null);
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary " style={{ paddingLeft: '10px', paddingRight: '10px', marginBottom: '15px' }}>
        <Container style={{ maxWidth: '100%' }}>
          <Navbar.Brand href="/restaurants">
            Restaurant Reviews
          </Navbar.Brand>
          <Nav className="me-auto"> 
            <Nav.Link href="/restaurants">
              Restaurants
            </Nav.Link>
            <li className="nav-item">
              {
                user ? (
                  <a onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>
                    Logout {user.name}
                  </a>
                ) : (
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                )
              }
            </li>
          </Nav>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route exact path="/restaurants" element={<RestaurantsList />} />
          <Route
            path="/restaurants/:id/review"
            element={<AddReview user={user}/>}
          />
          <Route
            path="/restaurants/:id"
            element={<Restaurant user={user}/>}
          />
          <Route
            path="/login"
            element={<Login login={login}/>} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
