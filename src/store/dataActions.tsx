import { Dispatch } from 'redux';

export const setData = (data: any[]) => ({
  type: 'SET_DATA',
  payload: data,
});

export const fetchData = () => {
  return (dispatch: Dispatch<any>) => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setData(data)); // Dispatch the entire array
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
};
