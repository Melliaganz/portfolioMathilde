import './App.css';
import "./i18n";
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero/>
      <Portfolio />
      <About />
      <Contact />
    </div>

  );
}

export default App;
