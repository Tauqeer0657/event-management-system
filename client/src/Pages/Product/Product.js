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

// Party Event Data
const partyEventData = [
  {
    id: 1,
    title: "Goa Beach Bash",
    description: "Party all night with DJs, bonfires, and beachside fun.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYxAovKgIPX-P5pRu4uckR09DNM2tNKSoFQ&s",
    date: "2025-06-21",
    location: "Baga Beach, Goa",
    price: "₹7,000",
  },
  {
    id: 2,
    title: "Mumbai Neon Night",
    description: "Glow in the dark party with top electronic music artists.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqCjWbqZXiT-SY1zhn8K37Ni0T5COQi23mBQ&s",
    date: "2025-07-15",
    location: "Worli, Mumbai",
    price: "₹5,500",
  },
  {
    id: 3,
    title: "Jaipur Palace Masquerade",
    description: "Royal-themed masquerade night in a stunning heritage setting.",
    image: "https://i.pinimg.com/736x/36/eb/dd/36ebdd42187b02cdbfa093ea3a2cdc4e.jpg",
    date: "2025-08-12",
    location: "City Palace, Jaipur",
    price: "₹6,200",
  },
  {
    id: 4,
    title: "Bangalore Rooftop Sundowner",
    description: "Chill with great music and cocktails at a rooftop venue.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvTJUhigLugmQYNg5OFjMRso9VxoXEn7jZw&s",
    date: "2025-09-03",
    location: "Indiranagar, Bangalore",
    price: "₹1,500",
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
          {partyEventData.map((event) => (
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
                    <Typography variant="body2">
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
