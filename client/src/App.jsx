import { Footer, Navbar, Services, Transactions, Welcome } from './components'

function App() {
    return (
        <div className="min-h-screen">
            <div className="gradient-bg-welcome">
                <div className="main_max_width">
                    <Navbar />
                    <Welcome />
                </div>
            </div>
            <div className="main_max_width">
                <Services />
                <Transactions />
            </div>
            <Footer />
        </div>
    )
}

export default App;
