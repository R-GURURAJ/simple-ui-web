import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
function App() {
  return (
    <div className="App w-full h-[100vh]" data-theme="nord" >
      <NavBar/>
      <Hero/>
    </div>
  );
}

export default App;
