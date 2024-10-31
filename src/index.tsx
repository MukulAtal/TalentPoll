import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './components/LoginPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './components/About';
import RegisterPage from './components/RegisterPage';
import Home from './components/Home';
import AdminPage from './components/AdminPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/admin",
        element: <AdminPage />
      },
      {
        path: "/home",
        element: <Home />
      }
    ]
  }
])

root.render(<RouterProvider router={appRouter} />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
