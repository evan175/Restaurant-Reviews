import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams, useLocation } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = props => {
  const { id } = useParams();
  const { state } = useLocation();

  let initialReviewState = ""

  let editing = false;

  if (state && state.currentReview) {
    console.log('editing')
    editing = true;
    initialReviewState = state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id
    };

    if (editing) {
      data.review_id = state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <Container>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + id} className="btn btn-success">
              Back to Restaurant
            </Link>
          </Container>
        ) : (
          <Container>
            <Form>
              <Form.Group>
                <Form.Label htmlFor="description">{ editing ? "Edit" : "Create" } Review</Form.Label>
                <Form.Control
                  type="text"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </Form.Group>
              <Button onClick={saveReview} className="mt-2">
                Submit
              </Button>
            </Form>
          </Container>
        )}
      </div>

      ) : (
      <Container>
        Please log in to add a review.
      </Container>
      )}

    </div>
  );
};

export default AddReview;