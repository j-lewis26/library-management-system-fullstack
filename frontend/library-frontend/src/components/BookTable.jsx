import axios from "axios";

function BookTable({
    books,
    fetchBooks,
    setSelectedBook,
    setIsModalOpen
}) {

    const deleteBook = async (id) => {

        const confirmDelete =
            window.confirm("Delete this book?");

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/books/${id}`
            );

            alert("Book Deleted Successfully");

            fetchBooks();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");
        }
    };

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
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {books.map((book) => (

                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>${book.price}</td>
                            <td>

                              <button
                                  onClick={() => {
                                      setSelectedBook(book);
                                      setIsModalOpen(true);
                                  }}
                              >
                                  Edit
                              </button>

                                <button
                                    onClick={() => deleteBook(book.id)}
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default BookTable;