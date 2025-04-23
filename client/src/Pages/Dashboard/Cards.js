import React from 'react';
import { Card, CardContent, Grid, Box, Typography } from '@mui/material';

const Cards = () => {
  // Sample data for the cards
  const cardData = [
    { id: 1, title: 'Card 1', content: 'Content for Card 1' },
    { id: 2, title: 'Card 2', content: 'Content for Card 2' },
    { id: 3, title: 'Card 3', content: 'Content for Card 3' },
    { id: 4, title: 'Card 4', content: 'Content for Card 4' },
    { id: 5, title: 'Card 5', content: 'Content for Card 5' },
  ];

  return (
    <Box sx={{ backgroundColor: '#D2E0FB', overflow: 'hidden', padding: '8px' }}>
      <Grid container spacing={1} >
        {cardData.map((card) => (
          <Grid item xs={6} sm={4} md={2.4} key={card.id} >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
              <CardContent sx={{ flexGrow: 1, padding:"0px" }}>
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="body2">{card.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cards;
