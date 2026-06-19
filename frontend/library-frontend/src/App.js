import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import BookTable from './components/BookTable';

function App() {
    return (
        <div>

            <Navbar />

            <div className="container">

                <Sidebar />

                <div className="content">

                    <div className="cards">

                        <DashboardCard
                            title="Total Books"
                            value="10"
                        />

                        <DashboardCard
                            title="Authors"
                            value="8"
                        />

                        <DashboardCard
                            title="Total Value"
                            value="$590"
                        />

                    </div>

                    <BookTable />

                </div>

            </div>

        </div>
    );
}

export default App;