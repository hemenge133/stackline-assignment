import { Dispatch } from 'redux';

export const setData = (data: any) => ({
  type: 'SET_DATA',
  payload: data,
});

export const fetchData = () => {
  return (dispatch: Dispatch<any>) => { // Ensure correct typing here
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setData(data[0])); // Assuming we are dealing with the first product in the JSON array
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
};
