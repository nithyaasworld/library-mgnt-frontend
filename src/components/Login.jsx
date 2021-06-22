import {
  Button,
  TextField,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "24px",
    maxWidth: "400px",
  },
});

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let classes = useStyles();

  const loginUrl = "http://localhost:3300/auth/login";
  const onFormSubmit = async () => {
   let response =  await fetch(loginUrl, {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
   })
   .catch((err) => {
     console.log("error", err);
     setError(err.message);
   });
    console.log(response.status);
    if (response.status === 400) {
      setError("Please check email/password");
      return;
    }
    
    let data = await response.json();
      // .then((resp) => ({ data: resp.json(), status: resp.status })).then((data) => {
        setError("");
        localStorage.setItem("library_access_token", data["access_token"]); 
        localStorage.setItem("library_refresh_token", data["refresh_token"]);
        console.log("access token is: ", localStorage.getItem("library_access_token"));
        // console.log("refresh token is: ", localStorage.getItem("library_refresh_token"));
        window.location.href = "http://localhost:3000/books";
      // })
  };
  return (
    <Paper elevation={2} className={classes.container}>
      <Typography variant="h4">Login Form</Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        name="email"
        variant="outlined"
        type="email"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        name="password"
        variant="outlined"
      />
      <Button
        onClick={onFormSubmit}
        variant="contained"
        color="primary"
        style={{ cursor: "pointer" }}
      >
        Submit
      </Button>
      <Button variant="contained" color="primary" style={{ cursor: "pointer" }}>
        <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
          New User? Sign Up here!
        </Link>
      </Button>
      {error && (
        <Typography variant="p" style={{ color: "red" }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
}
