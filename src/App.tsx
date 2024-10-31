import './App.css';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/Header';

const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;
