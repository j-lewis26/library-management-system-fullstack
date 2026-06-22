
function BookTable({
    books,
    fetchBooks,
    setSelectedBook,
    setIsModalOpen,
    setModalMode
}) {

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

                {books.length === 0 ? (

                    <tr>
                        <td colSpan="5">
                            No books found
                        </td>
                    </tr>

                ) : (

                    books.map((book) => (

                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>${book.price}</td>

                            <td>

                                <button
                                    onClick={() => {
                                        setSelectedBook(book);
                                        setModalMode("edit");
                                        setIsModalOpen(true);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedBook(book);
                                        setModalMode("delete");
                                        setIsModalOpen(true);
                                    }}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}



                </tbody>

            </table>

        </div>

    );
}

export default BookTable;