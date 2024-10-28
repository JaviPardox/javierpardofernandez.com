import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
//import LoadingScreen from './components/LoadingScreen';
import { useAppSelector } from './store/hooks';
import Navbar from './components/Navbar';
import ResponsiveCenterLayout from './components/ResponsiveCenterLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get current loading state from Redux store
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <>
      {isLoading && <div> TEST</div>}
      {children}
    </>
  );
};


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <ResponsiveCenterLayout>
              <div className="pt-1">
                <Navbar />
                <main className="p-4 sm:p-6 lg:p-8">
                  <PageWrapper>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/blog" element={<Blog />} />
                    </Routes>
                  </PageWrapper>
                </main>
              </div>
        </ResponsiveCenterLayout>
      </Router>
    </Provider>
  );
}

export default App;