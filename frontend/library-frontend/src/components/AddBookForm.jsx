import { useState } from "react";
import axios from "axios";

function AddBookForm({ fetchBooks }) {

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/books",
                {
                    name,
                    author,
                    price
                }
            );

            alert("Book Added Successfully");

            fetchBooks();

            setName("");
            setAuthor("");
            setPrice("");

        } catch (error) {

            console.error(error);

            alert("Failed to add book");
        }
    };

    return (
        <div className="form-container">

            <h2>Add New Book</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Book Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button type="submit">
                    Add Book
                </button>

            </form>

        </div>
    );
}

export default AddBookForm;