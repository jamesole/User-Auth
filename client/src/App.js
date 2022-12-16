import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
import PrivateScreen from './pages/PrivateScreen';

export default function App(props) {

  return (
    <div>
      <div className='nav'>
        <h2>WeLit</h2>
      </div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/private' element={
          <PrivateRoute>
            <PrivateScreen />
          </PrivateRoute>
        }/>
        </Routes>
      </Router>
    </div>
  );
}
