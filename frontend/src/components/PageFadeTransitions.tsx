import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import BlogPost from './BlogPost';
import NotFoundPage from '../pages/NotFoundPage';
import Sabios from '../pages/Sabios';

const PageFadeTransitions = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.2,
          ease: "easeInOut"
        }}
        className="flex-grow w-full"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/articles/:id" element={<BlogPost />} />
          <Route path="/sabios" element={<Sabios />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageFadeTransitions;