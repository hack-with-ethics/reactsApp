import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Stack,
  Divider,
} from '@mui/material';

const ListFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ open: false, message: '', severity: 'error' });

  const fetchFlights = async () => {
    try {
      const res = await axios.get('https://192.168.115.161:7101/flightinfo', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
          'Content-Type': 'application/json',
        },
      });
      setFlights(res.data);
    } catch (error) {
      setPopup({ open: true, message: 'Failed to load flights.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <Box sx={{ padding: 4 ,marginTop:"100px"}}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Available Flights
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {flights.map((flight, index) => (
            <Paper
              key={flight.flightId}
              elevation={3}
              sx={{
                padding: 2,
                borderLeft: '5px solid #1976d2',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f5faff',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {flight.flightName} <Typography variant="body2" component="span" color="text.secondary">#{flight.flightNumber}</Typography>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography><strong>Airline:</strong> {flight.airlineName}</Typography>
              <Typography><strong>From:</strong> {flight.origin}</Typography>
              <Typography><strong>To:</strong> {flight.destination}</Typography>
              <Typography><strong>Owner ID:</strong> {flight.ownerId}</Typography>
            </Paper>
          ))}
        </Stack>
      )}

      <Snackbar
        open={popup.open}
        autoHideDuration={4000}
        onClose={() => setPopup({ ...popup, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setPopup({ ...popup, open: false })}
          severity={popup.severity}
          sx={{ width: '100%' }}
        >
          {popup.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListFlights;
