import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
function App() {
  return (
    <div className="App w-full h-screen" data-theme="nord" >
      <div className='h-screen flex flex-col'>
        <NavBar />
        <Hero />
      </div>
    </div>
  );
}

export default App;
