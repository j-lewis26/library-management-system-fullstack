import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

import AddBookForm from "./components/AddBookForm";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import BookTable from './components/BookTable';
import EditBookModal from "./components/EditBookModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "./config/api";

function App() {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("edit");

    const fetchBooks = async () => {

        try {

            const response =
                await axios.get(
                    `${API_BASE_URL}/books`
                );

            setBooks(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchBooks();

    }, []);

    const totalAuthors =
        new Set(
            books.map(book => book.author)
        ).size;

    const totalValue =
        books.reduce(
            (sum, book) =>
                sum + Number(book.price),
            0
        );

        const filteredBooks = books.filter(book =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(book.price).includes(searchTerm)
        );

        const indexOfLastBook =
            currentPage * booksPerPage;

        const indexOfFirstBook =
            indexOfLastBook - booksPerPage;

        const currentBooks =
            filteredBooks.slice(
                indexOfFirstBook,
                indexOfLastBook
            );

        const totalPages =
            Math.ceil(
                filteredBooks.length /
                booksPerPage
            );

    return (
        <div>

            <Navbar />

            <div className="container">

                <Sidebar />

                <div className="content">

                    <div className="cards">

                        <DashboardCard
                            title="Total Books"
                            value={books.length}
                        />

                        <DashboardCard
                            title="Authors"
                            value={totalAuthors}
                        />

                        <DashboardCard
                            title="Total Value"
                            value={`$${totalValue.toFixed(2)}`}
                        />

                        <EditBookModal
                            book={selectedBook}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            fetchBooks={fetchBooks}
                            mode={modalMode}
                        />

                    </div>

                    <AddBookForm
                        fetchBooks={fetchBooks}
                    />

                    <div className="search-container">

                        <input
                            type="text"
                            placeholder="Search books by name, author or price..."
                            value={searchTerm}
                           onChange={(e) => {

                               setSearchTerm(e.target.value);

                               setCurrentPage(1);

                           }}
                        />

                    </div>

                   <BookTable
                       books={currentBooks}
                       fetchBooks={fetchBooks}
                       setSelectedBook={setSelectedBook}
                       setModalMode={setModalMode}
                       setIsModalOpen={setIsModalOpen}
                   />

                   <div className="pagination">

                       <button
                           disabled={currentPage === 1}
                           onClick={() =>
                               setCurrentPage(currentPage - 1)
                           }
                       >
                           Previous
                       </button>

                       <span>
                           Page {currentPage} of {totalPages}
                       </span>

                       <button
                           disabled={
                               currentPage === totalPages ||
                               totalPages === 0
                           }
                           onClick={() =>
                               setCurrentPage(currentPage + 1)
                           }
                       >
                           Next
                       </button>

                   </div>

                </div>

            </div>

            <ToastContainer />

        </div>
    );
}

export default App;