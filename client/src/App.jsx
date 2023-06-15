import { Footer, Navbar, Services, Transactions, Welcome } from './components'
import './App.css'

function App() {
    return (
        <div className="app min-h-screen">
            <div className="gradient-bg-welcome">
                <Navbar />
                <Welcome />
            </div>
            <Services />
            <Transactions />
            <Footer />
        </div>
    )
}

export default App;
