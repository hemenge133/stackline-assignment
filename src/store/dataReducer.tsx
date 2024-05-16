interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface Product {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: {
    customer: string;
    review: string;
    score: number;
  }[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sale[];
}

interface DataState {
  products: Product[];
}

const initialState: DataState = {
  products: [],
};

const dataReducer = (state = initialState, action: any): DataState => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
