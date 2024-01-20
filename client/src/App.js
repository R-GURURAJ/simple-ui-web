import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import StudLogin from './components/Login/StudLogin';
function App() {
  return (
    <div className="App w-full h-screen" data-theme="night" >
      <div className='h-screen flex flex-col'>
        <NavBar />
        {/* <Hero /> */}
        <StudLogin/>
      </div>
    </div>
  );
}

export default App;
