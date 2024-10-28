import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setLoading } from '../store/loadingSlice';

export const usePageLoading = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setLoading(true));

    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);

    return () => {
      clearTimeout(timer);
      dispatch(setLoading(false));
    };
  }, [location.pathname, dispatch]);
};