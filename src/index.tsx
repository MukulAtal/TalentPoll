import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import About from './components/About';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AuthGuard from './components/Authguard';
import LandingPage from './pages/LandingPage';
import UserPage from './pages/UserPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const isAuthenticated = localStorage.getItem("isAuthenticated");

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          isAuthenticated ? <Navigate to={LandingPage()} /> : <LoginPage />
        )
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
        element: (
          <AuthGuard requiredRole="admin">
            <AdminPage />
          </AuthGuard>
        )
      },
      {
        path: "/user",
        element: <UserPage />
      }
    ]
  }
])

root.render(<RouterProvider router={appRouter} />)

