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

const url = "http://localhost:3300/books";
export default function BooksList() {
  let [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  let [itemToDelete, setItemToDelete] = useState([]);

  let getBooks = async () => {
    let response = await fetch(url);
    let data = await response.json();
    setBooks(data);
    setLoading(false);
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
            {books.map((book) => (
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
        {itemToDelete.length > 0 && (
          <DeleteConfirmationDialog
            bookID={itemToDelete[0]}
            bookTitle={itemToDelete[1]}
            setItemToDelete={setItemToDelete}
            deleteBooks={deleteBooks}
          />
        )}
      </Paper>
    </Container>
  );
}
