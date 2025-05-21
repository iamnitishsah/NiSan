import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

// Components
import PrivateRoute from './components/PrivateRoute';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewPage from './pages/NewPage';
import EditPage from './pages/EditPage';
import ViewPage from './pages/ViewPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={
                    isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />
                } />
                <Route path="/login" element={
                    isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
                } />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/new-page" element={<NewPage />} />
                    <Route path="/edit-page/:id" element={<EditPage />} />
                    <Route path="/page/:id" element={<ViewPage />} />
                </Route>

                {/* Default Route */}
                <Route path="*" element={
                    isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                } />
            </Routes>
        </Router>
    );
}

export default App;