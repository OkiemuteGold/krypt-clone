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

            <Services />
            <Transactions />
            <Footer />
        </div>
    )
}

export default App;
