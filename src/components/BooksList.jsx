import {
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import axios from 'axios';

// const url = "http://localhost:3300/books";
const url = "/books";
export default function BooksList() {
  let [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  let [itemToDelete, setItemToDelete] = useState([]);
  let [error, setError] = useState("");

  let getBooks = async () => {
    
    // let response = await fetch(url,{
    //   headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("libraryJWT") },
    // });
    // let data = await response.json();
    // setBooks(data);
    // setLoading(false);

    // let response = await axios.get(url);
    // setBooks(response.data);
    // setLoading(false);

    // await fetch(url, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + localStorage.getItem("libraryJWT"),
    //   },
    // })
   await axios.get(url)
      .then((response) => {
        if(response.status === 403){
          console.log("line 42 response is: ", response);
          throw response;
        }else {
          console.log("reached line 45");
        setError("");
        setBooks(response.data);
        setLoading(false);
      }})
      .catch((err) => {
        console.log("error block of get-books executed: ", err);
        setLoading(false);
        setError(err.message);
      });
  };
  useEffect(() => {
    getBooks();
  }, []);
  let deleteBooks = (bookID) => {
    setBooks(books.filter((item) => item._id !== bookID));
  };

  return (
    <Container>
      <Typography align="center" variant="h5">
        List of Books
      </Typography>
      <Paper elevation={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {books && books.map((book) => (
              <ListItem key={book.title}>
                <ListItemText
                  primary={book.title}
                  secondary={book.author.join(", ")}
                />
                <ListItemIcon
                  onClick={() => setItemToDelete([book._id, book.title])}
                >
                  {" "}
                  <Delete style={{ cursor: "pointer" }} />
                </ListItemIcon>
                <Divider />
              </ListItem>
            ))}
          </List>
        )}
        {itemToDelete && itemToDelete.length > 0 && (
          <DeleteConfirmationDialog
            bookID={itemToDelete[0]}
            bookTitle={itemToDelete[1]}
            setItemToDelete={setItemToDelete}
            deleteBooks={deleteBooks}
          />
        )}
        {error !== "" && (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </Paper>
    </Container>
  );
}
