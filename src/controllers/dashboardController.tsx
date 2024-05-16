import { AppDispatch } from '../store/store';
import { fetchData } from '../store/dataActions';

export const loadDashboardData = (dispatch: AppDispatch) => {
  dispatch(fetchData());
};
