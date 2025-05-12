import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useChatStore } from './store/chatStore';
import Login from './pages/Login';
import Chat from './pages/Chat';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useChatStore();
  return user ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;