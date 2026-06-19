import { useState, useEffect } from "react";
import axios from "axios";

function BookTable() {

    const [books, setBooks] = useState([]);

    const loadBooks = async () => {

        try {

            const response =
                await axios.get("http://localhost:8080/books");

            setBooks(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <div>

            <h3>Total Books Loaded: {books.length}</h3>

            <table className="book-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>

                    {books.map((book) => (

                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>${book.price}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default BookTable;