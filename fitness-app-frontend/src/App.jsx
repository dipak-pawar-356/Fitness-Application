import { Box, Button, Typography, Paper } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { setCredentials } from "./store/authSlice";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetails from "./components/ActivityDetails";

const ActivitiesPage = () =>  (
  <Box component="main" sx={{ p: 2, border: '1px dashed gray' }}>
    <ActivityForm onActivityAdded={() => window.location.reload()} />
    <ActivityList />
  </Box>
);

function App() {
  const { token, tokenData, login, logout } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token){
      dispatch(setCredentials({ token, user: tokenData }));
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f5f5f5"
          }}
        >
          <Paper elevation={3} sx={{ p: 5, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom color="primary">
              Fitness Application
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Welcome! Please log in to access your fitness dashboard.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={login}
              sx={{ mt: 2 }}
            >
              LOGIN
            </Button>
          </Paper>
        </Box>
      ) : (
        <Box component="section" sx={{ p: 2, border: '1px dashed gray' }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                 localStorage.clear();
                 sessionStorage.clear();
                logout();
                window.location.href = "/"; // Force redirect to login
              }}
             
              
            >
              LOGOUT
            </Button>
          </Box>
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetails />} />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App;