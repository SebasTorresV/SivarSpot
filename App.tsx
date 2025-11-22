import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <EventProvider>
          <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-grow bg-light">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </EventProvider>
      </AuthProvider>
    </HashRouter>
  );
}