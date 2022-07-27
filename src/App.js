import './App.css';
import { Route, Routes } from 'react-router-dom';

import Workout from './components/Workout';
import Home from './components/Home';
import Nutrition from './components/Nutrition';


function App() {
  return (

    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/workout/:id' element={<Workout />} />
      <Route path='/nutrition/:id' element={<Nutrition />} />
    </Routes>

  )
}

export default App;
