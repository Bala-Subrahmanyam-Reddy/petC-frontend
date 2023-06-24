import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Home from './screens/Home';
import ViewAll from './screens/ViewAll';
import Search from './screens/Search';
import Cart from './screens/Cart';
import Registration from './screens/Registration';
import Login from './screens/Login';
import Successful from './screens/Successful';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/viewAll/:isCategory/:id' element={<ViewAll />} />
        <Route path='/search/:text' element={<Search />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signUp' element={<Registration />} />
        <Route path='/logIn' element={<Login />} />
        <Route path='/successful' element={<Successful />} />
      </Routes>
    </div>
  );
}

export default App;
