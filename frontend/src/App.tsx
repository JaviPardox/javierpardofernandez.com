import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import ResponsiveCenterLayout from './components/ResponsiveCenterLayout';
import PageTransitions from './components/PageTransitions';
import AnimatedRouter from './components/AnimatedRouter';
import Footer from './components/Footer';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <div className="flex flex-col min-h-screen">
        <PageTransitions>
          <Navbar />  
            <ResponsiveCenterLayout>
              <main className="p-4 sm:p-6 lg:p-8">
                <AnimatedRouter />
              </main>
              <Footer />
            </ResponsiveCenterLayout>
          </PageTransitions>
        </div>
      </Router>
    </Provider>
  );
}

export default App;