import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddBookForm({ fetchBooks }) {

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:8080/books",
                {
                    name,
                    author,
                    price
                }
            );

            toast.success("Book Added Successfully");
            setLoading(false);

            fetchBooks();

            setName("");
            setAuthor("");
            setPrice("");

        } catch (error) {

            console.error(error);
            setLoading(false);

            toast.error("Failed to add book");
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

              <button
                  type="submit"
                  disabled={loading}
              >
                  {loading ? "Saving..." : "Add Book"}
              </button>

            </form>

        </div>
    );
}

export default AddBookForm;