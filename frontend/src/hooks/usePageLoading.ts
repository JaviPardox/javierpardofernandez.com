import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
//import { setLoading } from '../store/loadingSlice';

export const usePageLoading = (loadingTime: number = 1500) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    //dispatch(setLoading(true));

    const timer = setTimeout(() => {
      //dispatch(setLoading(false));
    }, loadingTime);

    return () => {
      clearTimeout(timer);
      //dispatch(setLoading(false));
    };
  }, [location.pathname, dispatch, loadingTime]);
};