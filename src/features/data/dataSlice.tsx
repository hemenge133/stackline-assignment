import { Dispatch } from 'redux';

export const setData = (data: any[]) => ({
  type: 'SET_DATA',
  payload: data,
});

export const fetchData = () => {
  return (dispatch: Dispatch<any>) => {
    fetch(`${window.location.origin}/stackline-assignment/data.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Add this line to log the fetched data
        dispatch(setData(data)); // Dispatch the entire array
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
};
