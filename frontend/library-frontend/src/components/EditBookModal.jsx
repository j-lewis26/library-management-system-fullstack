import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditBookModal({
    book,
    isOpen,
    onClose,
    fetchBooks,
    mode // "edit" or "delete"
}) {

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {

        if (book) {
            setName(book.name);
            setAuthor(book.author);
            setPrice(book.price);
        }

    }, [book]);

    // ESC key support
    useEffect(() => {

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () =>
            window.removeEventListener("keydown", handleEsc);

    }, [onClose]);

const handleUpdate = async () => {

    try {

        await axios.put(
            `http://localhost:8080/books/${book.id}`,
            {
                name,
                author,
                price
            }
        );

        toast.success("Book Updated Successfully");

        fetchBooks();
        onClose();

    } catch (error) {

        console.error(error);

        toast.error("Update Failed");
    }
};

   const handleDelete = async () => {

       try {

           await axios.delete(
               `http://localhost:8080/books/${book.id}`
           );

           toast.success("Book Deleted Successfully");

           fetchBooks();
           onClose();

       } catch (error) {

           console.error(error);

           toast.error("Delete Failed");
       }
   };

    if (!isOpen) return null;

    return (

        // CLICK OUTSIDE TO CLOSE
        <div
            className="modal-overlay"
            onClick={onClose}
        >

            {/* STOP CLICK PROPAGATION */}
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* EDIT MODE */}
                {mode === "edit" && (
                    <>
                        <h2>Edit Book</h2>

                        <label>Book Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Author</label>
                        <input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                        <label>Price</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <div className="modal-buttons">
                            <button onClick={handleUpdate}>
                                Save Changes
                            </button>
                        </div>
                    </>
                )}

                {/* DELETE MODE */}
                {mode === "delete" && (
                    <>
                        <h2>Confirm Delete</h2>

                        <p>
                            Are you sure you want to delete:
                        </p>

                        <strong>{book?.name}</strong>

                        <div className="modal-buttons">

                            <button
                                onClick={handleDelete}
                                style={{ background: "red", color: "white" }}
                            >
                                Delete
                            </button>

                            <button onClick={onClose}>
                                Cancel
                            </button>

                        </div>
                    </>
                )}

            </div>

        </div>
    );
}

export default EditBookModal;