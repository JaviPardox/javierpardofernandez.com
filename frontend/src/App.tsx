import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import ResponsiveCenterLayout from './components/ResponsiveCenterLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import PageTransitions from './components/PageTransitions';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
          <PageTransitions>
            <ResponsiveCenterLayout>
              <main className="p-4 sm:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
              </main>
            </ResponsiveCenterLayout>
          </PageTransitions>
        </div>
      </Router>
    </Provider>
  );
}

export default App;