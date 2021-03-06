import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "24px",
    maxWidth: "400px",
  },
  input: {
    display: "none",
  },
});
export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  let classes = useStyles();
  const signUpUrl = "http://localhost:3300/auth/signup";
  let submitForm = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("name", userName);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("profilePic", image);

    for(var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
   }
    await fetch(signUpUrl, {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    }).then((resp)=> resp.json()).then((data) => {
      setError("");
      localStorage.setItem("library_access_token", data['access_token']);
      localStorage.setItem("library_refresh_token", data["refresh_token"]);
      console.log("access token is: ", localStorage.getItem("library_access_token"));
      console.log("refresh token is: ", localStorage.getItem("library_refresh_token"));
    }).catch((err)=> {
      setError(err);
    });
    // let result = await response.json();
    // console.log(result);
    // setLoading(false);
  };
  return (
    <Paper elevation={2} className={classes.container}>
      <Typography variant="h4">Sign Up</Typography>
      {/* <form autoComplete="off" method="post" action="http://localhost:3300/auth/signup"> */}
      <TextField
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        label="Name"
        name="userName"
        variant="outlined"
      />
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
      <TextField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
        type="password"
        variant="outlined"
      />
      <input
        accept="image/*"
        className={classes.input}
        id="profilePic"
        type="file"
        name="profilePic"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setImage(e.target.files[0]);
        }}
      />
      <label htmlFor="profilePic">
        <Button variant="contained" color="primary" component="span">
          Upload Avatar
        </Button>
        {image.name}
      </label>
      <Button
        variant="contained"
        disabled={
          !userName || !email || !password || password !== confirmPassword
        }
        color="primary"
        onClick={submitForm}
      >
        Submit
      </Button>
      {error.length > 0 && <Typography variant="h4">Sign Up</Typography>}
      {/* </form> */}
    </Paper>
  );
}
