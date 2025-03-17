import './App.css';
import "./i18n";
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';
import { I18nextProvider } from 'react-i18next';

function App() {
  return (
    <div className="App">
      <I18nextProvider >
      <Header />
      <Hero/>
      <Portfolio />
      <Contact />
      </I18nextProvider>
    </div>


  );
}

export default App;
