import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import SideBar from "../../component/SideBar";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";  // Import the context

// Event Data
const eventData = [
  {
    id: 1,
    title: "AI & Robotics Symposium",
    description: "Explore the future of Artificial Intelligence and Robotics with leading researchers.",
    image: "https://worldkings.org/Userfiles/Upload/images/sara-1.png",
    date: "2025-06-21",
    location: "King Abdullah University of Science and Technology (KAUST), Thuwal",
    price: "₹1500",
  },
  {
    id: 2,
    title: "Cultural Diversity Festival",
    description: "Celebrate Saudi Arabia's diverse cultural heritage with music, food, and art.",
    image: "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2018/12/23/1408586-2053602578.jpg?itok=El7cY-FF",
    date: "2025-07-15",
    location: "King Saud University, Riyadh",
    price: "₹1000",
  },
  {
    id: 3,
    title: "Entrepreneurship Bootcamp",
    description: "Hands-on training for aspiring student entrepreneurs and startups.",
    image: "https://srmap.edu.in/wp-content/uploads/2024/04/IMG_7592-1024x683.jpg",
    date: "2025-08-12",
    location: "Prince Sultan University, Riyadh",
    price: "SAR 500",
  },
  {
    id: 4,
    title: "Green Energy Innovation Forum",
    description: "Discuss sustainable energy innovations and environmental research projects.",
    image: "https://miro.medium.com/v2/resize:fit:640/format:webp/0*upX8NtE2BAMxMu-5",
    date: "2025-09-03",
    location: "King Fahd University of Petroleum and Minerals (KFUPM), Dhahran",
    price: "₹800",
  },
];


// Styles
const headerStyle = {
  height: "50px",
  backgroundColor: "#e9ecef",
  borderBottom: "2px solid #ced4da",
  margin: "0px",
};

const headerTextStyle = {
  fontSize: "14px",
  textTransform: "uppercase",
  fontWeight: "600",
  color: "#003c78",
};

const Product = () => {
  const [isSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 200 : 0;
  const rightSidebarWidth = 250;
  const navigate = useNavigate();
  const { state, dispatch } = useCart();  // Access cart state and dispatch function

  const handleEnrollClick = (event) => {
    // Dispatch action to add the event to the cart
    dispatch({ type: 'ADD_TO_CART', payload: event });
    
    // Apply a small transition effect before navigating
    setTimeout(() => {
      navigate("/cart"); // Navigate to the cart page
    }, 300); // Wait 300ms for the transition effect
  };

  return (
    <Container
      fluid
      style={{
        display: "flex",
        width: "100vw",
        overflow: "hidden",
        padding: 0,
      }}
    >
      {isSidebarOpen && (
        <SideBar key="sidebar" sx={{ width: sidebarWidth, flexShrink: 0 }} />
      )}

      <div
        style={{
          flexGrow: 1,
          padding: "16px",
          marginTop: "55px",
          width: `calc(100vw - ${sidebarWidth + rightSidebarWidth}px)`,
          minHeight: "calc(100vh - 60px)",
          height: "100%",
          background: "white",
          overflowX: "auto",
          transition: "width 0.3s ease",
        }}
      >
        <Row className="mt-2" style={headerStyle}>
          <Col className="d-flex align-items-center">
            <h3 className="mb-0" style={headerTextStyle}>
              Upcoming Party Events
            </h3>
          </Col>
        </Row>

        {/* MUI Event Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {eventData.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Box mt={1}>
                    <Typography variant="body2">
                      📍 <strong>Location:</strong> {event.location}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      📅 <strong>Date:</strong> {event.date}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    {event.price}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleEnrollClick(event)}  // Add to cart on click
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Product;
