import './App.css';


//import comps
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';


//import router
import { BrowserRouter, Route, Routes } from 'react-router-dom';






function App() {
  return (
    <div className="App">

      <div className="badge bg-primary text-wrap p-2 w-50 m-4">
        <h1 >-Stock Maganment-</h1>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Show />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>

      </BrowserRouter>

      <div className="mt-5 pt-5">

        <h5>Developed by <b><a className="url" href="https://www.giorgioruanova.com/" target="_blank" rel="noreferrer" >Giorgio Ruanova</a></b></h5>


      </div>

    </div>
  );
}

export default App;
