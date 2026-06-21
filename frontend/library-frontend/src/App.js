import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

import AddBookForm from "./components/AddBookForm";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import BookTable from './components/BookTable';
import EditBookModal from "./components/EditBookModal";

function App() {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBooks = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/books"
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
                        />

                    </div>

                    <AddBookForm
                        fetchBooks={fetchBooks}
                    />

                   <BookTable
                       books={books}
                       fetchBooks={fetchBooks}
                       setSelectedBook={setSelectedBook}
                       setIsModalOpen={setIsModalOpen}
                   />

                </div>

            </div>

        </div>
    );
}

export default App;