import './App.css';
import "./i18n";
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero/>
      <Portfolio />
    </div>

  );
}

export default App;
