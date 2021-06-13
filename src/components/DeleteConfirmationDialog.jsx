import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { useState } from "react";

const url = "http://localhost:3300/books/";
export default function DeleteConfirmationDialog({
  bookTitle,
  setItemToDelete,
  bookID,
  deleteBooks
}) {
  console.log(bookTitle, bookID);
  let [open, setOpen] = useState(true);
  let [content, setContent] = useState(`Do you want to Delete ${bookTitle}?`);
  let [showControllers, setShowControllers] = useState(true);
  let handleClose = () => {
    console.log("disagreed to delete the book");
    setOpen(false);
    setItemToDelete([]);
  };
  let handleAgree = async () => {
    console.log("Agreed to delete the book");
    setShowControllers(false);
    await fetch(url + bookID, {
      method: "delete",
    })
      .then((doc) => {
        deleteBooks(bookID);
        console.log(` ${doc} Deleted successfully`);
        setContent(`Deleted successfully`);
      })
      .catch((err) => {
        console.log(err);
        setContent(`Following error occured: ${err}`);
      })
      .finally(() => {
        console.log("done with the delete call");
        setTimeout(() => {
          setOpen(false);
          setItemToDelete([]);
        }, 5000);
      });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{content}</DialogTitle>
      { showControllers && <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleAgree} color="secondary">
          Agree
        </Button>
      </DialogActions> }
    </Dialog>
  );
}
