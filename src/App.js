import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Book, Category, Menu, People, PlayCircleFilledWhiteTwoTone } from "@material-ui/icons";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BooksList from "./components/BooksList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CategoryList from "./components/CategoryList";
import setupInterceptors from "./interceptors";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  login: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1.2em',
  }
}));
export default function App() {
  let history = useHistory();
  setupInterceptors(history);
  return (
    // <Router>
    <Wrapper>
      <Switch>
        <Route exact path="/">
          Welcome to Library
        </Route>
        <Route exact path="/books">
          <BooksList />
        </Route>
        <Route exact path="/categories">
          <CategoryList />
        </Route>
        <Route exact path="/members">
          List of Members
        </Route>
        <Route exact path="/issues">
          List of Issued Books
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Wrapper>
    // </Router>
  );
}
function Wrapper(props) {
  const classes = useStyles();
  let [drawerOpen, setDrawerOpen] = useState(false);
  let toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            McLaren College Library
          </Typography>
          <Button><Link to="/login" className={classes.login} color="inherit">Login</Link> </Button>
        </Toolbar>
      </AppBar>
      <React.Fragment>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <Box m={2} />
            <Typography align="center" variant="h5">
              Menu
            </Typography>
            <Box m={2} />
            {[
              { text: "Books", icon: <Book />, link: "/books" },
              { text: "Categories", icon: <Category />, link: "/categories" },
              { text: "Members", icon: <People />, link: "/members" },
              { text: "Books Issued", icon: <Book />, link: "/issues" },
            ].map(({ text, icon, link }, index) => (
              <Link to={link} onClick={toggleDrawer} key={text}>
                <ListItem className={classes.list} button key={text}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
      {props.children}
    </div>
  );
}