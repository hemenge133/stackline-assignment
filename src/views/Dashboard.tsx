import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Card, CardContent, Box, Paper, Chip, Button, Stack } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale,
  ChartOptions,
  ChartData,
  Plugin
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/data/dataSlice';
import CustomTable from '../components/CustomTable';
import { RootState, AppDispatch } from '../store/store';
import { parseISO, format } from 'date-fns';
import 'chartjs-adapter-date-fns';
import TooltipComponent from '../components/Tooltip';
import '../styles/Dashboard.css';
import { Product, Sale } from '../types'; // Import Product and Sale types

// Register the necessary Chart.js components
ChartJS.register(LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TimeScale, CategoryScale, zoomPlugin);

const getChartOptions = (selectedProduct: Product | null): ChartOptions<'line'> => ({
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'month',
      },
      ticks: {
        color: 'rgba(0, 0, 1)',
        autoSkip: true,
      },
      grid: {
        color: 'rgba(200, 200, 200, 0.5)',
      },
    },
    y: {
      grid: {
        color: 'rgba(200, 200, 200, 0.5)',
      },
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom: {
        wheel: {
          enabled: true,
          speed: 0.01,
        },
        pinch: {
          enabled: false,
        },
        mode: 'x',
      },
    },
    tooltip: {
      callbacks: {
        title: function (tooltipItem) {
          const date = tooltipItem[0].parsed.x;
          return format(new Date(date), 'yyyy-MM-dd');
        },
      },
    },
  },
  onHover: (event, chartElement) => {
    if (event.native && event.native.target) {
      (event.native.target as HTMLElement).style.cursor = chartElement[0] ? 'pointer' : 'default';
    }
  },
});

const enforceLimitsPlugin: Plugin<'line'> = {
  id: 'enforceLimits',
  beforeUpdate: (chart) => {
    const timeScale = chart.scales['x'] as TimeScale;
    const range = timeScale.max - timeScale.min;
    const isDaily = range <= 6 * 30 * 24 * 60 * 60 * 1000;
    const xScaleOptions = chart.options.scales?.x;
    if (xScaleOptions && 'time' in xScaleOptions) {
      (xScaleOptions as { time: { unit: 'day' | 'month' } }).time.unit = isDaily ? 'day' : 'month';
    }
  }
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.data.products) as Product[];
  const chartRef = useRef<ChartJS<'line'> | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [view, setView] = useState<'chart' | 'table'>('chart'); // State to toggle between chart and table views

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0]); // Default to the first product
    }
  }, [products]);

  const handleProductSelection = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleViewChange = (newView: 'chart' | 'table') => {
    setView(newView);
  };

  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Box component="img" src={`${window.location.origin}/stackline-assignment/logo.svg`} alt="Logo" className="logo" />
        </Toolbar>
      </AppBar>
      <div className="container">
        <Paper className="card-container">
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={() => handleProductSelection(product)}
              sx={{
                cursor: 'pointer',
                marginBottom: '10px',
                backgroundColor: product.id === selectedProduct?.id ? '#f0f0f0' : 'inherit',
                boxShadow: product.id === selectedProduct?.id ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
              }}
            >
              <CardContent>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{ width: '100%', height: 'auto', maxHeight: '300px', marginBottom: '10px' }}
                />
                <Typography variant="h6">{product.title}</Typography>
                <Typography>{product.subtitle}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                  {product.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Paper>
        <div className="chart-table-container">
          <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
            <Button onClick={() => handleViewChange('chart')} variant={view === 'chart' ? 'contained' : 'outlined'}>Chart View</Button>
            <Button onClick={() => handleViewChange('table')} variant={view === 'table' ? 'contained' : 'outlined'}>Table View</Button>
          </Stack>
          {selectedProduct && (
            <>
              <div className={`chart-wrapper ${view === 'chart' ? 'visible' : ''}`}>
                <CardContent className="chart-area-wrapper">
                  <Typography variant="h6">Retail Sales vs. Wholesale Sales</Typography>
                  <div className="chart-area-wrapper">
                    <Line
                      ref={chartRef}
                      data={{
                        labels: selectedProduct.sales.map((sale: Sale) => parseISO(sale.weekEnding)),
                        datasets: [
                          {
                            label: 'Retail Sales',
                            data: selectedProduct.sales.map((sale: Sale) => ({ x: parseISO(sale.weekEnding).getTime(), y: sale.retailSales })),
                            borderColor: 'rgba(75,192,192,1)',
                            fill: false,
                          },
                          {
                            label: 'Wholesale Sales',
                            data: selectedProduct.sales.map((sale: Sale) => ({ x: parseISO(sale.weekEnding).getTime(), y: sale.wholesaleSales })),
                            borderColor: 'rgba(153,102,255,1)',
                            fill: false,
                          },
                        ],
                      }}
                      options={getChartOptions(selectedProduct)}
                      plugins={[enforceLimitsPlugin]}
                    />
                    <TooltipComponent />
                  </div>
                </CardContent>
              </div>
              <div className={`table-wrapper ${view === 'table' ? 'visible' : ''}`}>
                <CardContent className="table-content">
                  <CustomTable rows={selectedProduct.sales} />
                </CardContent>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
