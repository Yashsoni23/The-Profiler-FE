import './App.css';
import './output.css'
import Home from './components/Home';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
