import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header2 from "../../component/Header2";

const customTheme = createTheme({
  palette: {
    background: {
      default: "#c3ddd9",
    },
  },
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    USER_CD: "",
    PASS_CD: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "api/login",
        {
          USER_CD: formData.USER_CD,
          PASS_CD: formData.PASS_CD,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const token = response.headers["x-gl-auth-token"];
        const userDetails = response.data[0];
        console.log(userDetails)
        if (token && userDetails) {
          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails)); 
          navigate("/dashboard");
        } else {
          setError("Failed to retrieve token");
        }
      } else {
        setError("Invalid Employee ID or Password");
      }
    } catch (error) {
      setError("An error occurred while logging in");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



 









  return (
    <ThemeProvider theme={customTheme}>
      <Header2 />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardContent>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "#055f85", color: "white" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </span>
              <Typography
                style={{ display: "flex", justifyContent: "center" }}
                component="h1"
                variant="h5"
              >
                Sign in
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="USER_CD"
                    label="Email"
                    name="USER_CD"
                    autoComplete="email"
                    value={formData.USER_CD}
                    onChange={handleInputChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="PASS_CD"
                    label="Password"
                    type="password"
                    id="PASS_CD"
                    autoComplete="current-password"
                    value={formData.PASS_CD}
                    onChange={handleInputChange}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#055f85" }}
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link to={"/forgetPassword"}>Forgot password?</Link>
                    </Grid>
                  </Grid>
                  {error && (
                    <Typography color="error" align="center" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  )}
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}