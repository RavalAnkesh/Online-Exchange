import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Footer from './components/Footer'; // Import the Footer component

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer /> 
    </div>
  );
}

export default App;
