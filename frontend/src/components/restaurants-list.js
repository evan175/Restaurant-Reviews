import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';

function RestaurantsList(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  }

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  }

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
    .then(response => {
      console.log(response.data);
      setRestaurants(response.data.restaurant);
    })
    .catch(e => {
      console.log(e);
    })
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  }

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
    .then(response => {
      console.log(response.data);
      setRestaurants(response.data.restaurants);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByName = () => {
    find(searchName, "name")
  }

  const findByZip = () => {
    find(searchZip, "zipcode")
  }

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    };
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={onChangeSearchName}
                  />
                </Col>
                <Col>
                  <Button
                    onClick={findByName}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search by zip"
                    value={searchZip}
                    onChange={onChangeSearchZip}
                  />
                </Col>
                <Col>
                  <Button
                    onClick={findByZip}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Select onChange={onChangeSearchCuisine}>
                  {cuisines?.map(cuisine => {
                    return (
                      <option value={cuisine}> {cuisine.substring(0, 20)} </option>
                    )
                  })}
                </Form.Select>
              </Col>
              <Col>
                <Button
                  onClick={findByCuisine}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Col>
          <Row>
            {restaurants?.map((restaurant) => {
              const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
              return (
                <div className="col-lg-4 pb-1">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{restaurant.name}</h5>
                      <p className="card-text">
                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                        <strong>Address: </strong>{address}
                      </p>
                      <div className="row">
                      <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                        View Reviews
                      </Link>
                      <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                      </div>
                    </div>
                  </div>
                </div>
            );
            })}
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default RestaurantsList;
