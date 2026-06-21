import { useState, useEffect } from "react";
import axios from "axios";

function EditBookModal({
    book,
    isOpen,
    onClose,
    fetchBooks
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

    const handleSave = async () => {

        try {

            await axios.put(
                `http://localhost:8080/books/${book.id}`,
                {
                    name,
                    author,
                    price
                }
            );

            alert("Book Updated Successfully");

            fetchBooks();

            onClose();

        } catch (error) {

            console.error(error);

            alert("Update Failed");
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">

            <div className="modal">

               <h2>Edit Book</h2>

               <label>Book Name</label>
               <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               />

               <label>Author</label>
               <input
                   type="text"
                   value={author}
                   onChange={(e) => setAuthor(e.target.value)}
               />

               <label>Price</label>
               <input
                   type="number"
                   value={price}
                   onChange={(e) => setPrice(e.target.value)}
               />

                <div className="modal-buttons">

                    <button onClick={handleSave}>
                        Save Changes
                    </button>

                    <button onClick={onClose}>
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditBookModal;