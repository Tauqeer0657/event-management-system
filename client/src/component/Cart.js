

import React, { useEffect, useState } from "react";
import {
    Container,

} from "react-bootstrap";


import {
    Box, Card, CardHeader, CardContent, Typography, Table, TableBody,
    TableCell, TableContainer, TableFooter, TableHead, TableRow, Button, IconButton,
    Avatar, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';
import SideBar from "../component/SideBar";
import { loadStripe } from '@stripe/stripe-js';

import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";


const CartDetails = () => {
    const [isSidebarOpen] = useState(true);
    const sidebarWidth = isSidebarOpen ? 200 : 0;
    const rightSidebarWidth = 250;
    const navigate = useNavigate()


    const { state: { carts }, dispatch } = useCart(); 

    console.log(carts);
    


    const [totalprice, setPrice] = useState(0);
    const [totalquantity, setTotalQuantity] = useState(0);


  



    const handleIncrement = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const handleDecrement = (id) => {
        dispatch({ type: 'REMOVE_TO_CART', payload: id });
        toast.success("Item Removed");
    };

    const handleSingleDecrement = (item) => {
        if (item.qnty <= 1) {
            handleDecrement(item.id);
        } else {
            dispatch({ type: 'REMOVE_SINGLE_ITEM', payload: item });
        }
    };

    const emptycart = () => {
        dispatch({ type: 'EMPTY_CART' });
        toast.success("Cart Emptied");
    };

    const total = () => {
        let price = 0;
        carts.forEach(item => {
            const itemPrice = parseFloat(item.price.replace('SAR', '').replace(',', '')); // Remove ₹ and commas, then convert to number
            price += itemPrice * item.qnty;
        });
        setPrice(price);
    };


  
    

    const countquantity = () => {
        let quantity = 0;
        carts.forEach(item => quantity += item.qnty);
        setTotalQuantity(quantity);
    };

    const stripePromise = loadStripe(process.env.REACT_APP_SECRET_KEY);  
    

      const makePayment = async () => {

        const stripe = await stripePromise
      
        const body = { products: carts };
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) console.error(result.error);
      };

    useEffect(() => {
        total();
        countquantity();
    }, [carts]);



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
                <div
                    style={{
                        flexGrow: 1,
                        padding: "16px",
                        marginTop: "55px",
                        // width: `calc(100vw - ${sidebarWidth + rightSidebarWidth}px)`,
                        minHeight: "calc(100vh - 60px)",
                        height: "100%",
                        background: "white",
                        overflowX: "auto",
                        transition: "width 0.3s ease",
                     
                    }}
                >
                    {isSidebarOpen && (
                        <SideBar key="sidebar" sx={{ width: sidebarWidth, flexShrink: 0 }} />
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', ml:5, }}>

                        <Card sx={{ width: '90%', maxWidth: 1000 }}>
                            <CardHeader
                                title={`Cart (${carts.length})`}
                                action={
                                    carts.length > 0 && (
                                        <Button color="error" size="small" onClick={emptycart} startIcon={<DeleteIcon />}>
                                            Empty Cart
                                        </Button>
                                    )
                                }
                                sx={{ bgcolor: 'primary.main', color: 'white' }}
                            />
                            <CardContent>
                                {
                                    carts.length === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 5 }}>
                                            <ShoppingCartIcon sx={{ fontSize: 60 }} />
                                            <Typography variant="h6">Your Cart is Empty</Typography>
                                        </Box>
                                    ) : (
                                        <TableContainer component={Paper}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Action</TableCell>
                                                        <TableCell>Event</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell>Qty</TableCell>
                                                        <TableCell align="right">Total</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {carts.map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                <IconButton color="error" onClick={() => handleDecrement(item.id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Avatar src={item.image} alt={item.title} />
                                                            </TableCell>
                                                            <TableCell>{item.title}</TableCell>
                                                            <TableCell>{item.price}</TableCell>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <IconButton
                                                                        onClick={() => handleSingleDecrement(item)}
                                                                        size="small"
                                                                    >
                                                                        <RemoveIcon fontSize="small" />
                                                                    </IconButton>
                                                                    <Typography variant="body2" sx={{ mx: 1 }}>{item.qnty}</Typography>
                                                                    <IconButton onClick={() => handleIncrement(item)} size="small">
                                                                        <AddIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell align="right">{totalprice}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                                <TableFooter>
                                                    <TableRow>
                                                        <TableCell colSpan={3} />
                                                        <TableCell colSpan={2}>
                                                            <Typography variant="subtitle1">Items in Cart: <strong>{totalquantity}</strong></Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="h6">Total: SAR {totalprice}</Typography>
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                size="small"
                                                                sx={{ mt: 1 }}
                                                                onClick={makePayment}
                                                            >
                                                                Checkout
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </TableContainer>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Box>

                </div>


            </div>


        </Container>
    );
};

export default CartDetails;
