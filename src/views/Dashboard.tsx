import React, { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, Box } from '@mui/material';
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
import CustomCard from '../components/CustomCard';
import CustomTable from '../components/CustomTable';
import { RootState, AppDispatch } from '../store/store';
import { parseISO, format } from 'date-fns';
import 'chartjs-adapter-date-fns';
import TooltipComponent from '../components/Tooltip';
import '../styles/Dashboard.css';

// Register the necessary Chart.js components
ChartJS.register(LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TimeScale, CategoryScale, zoomPlugin);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.data.product);
  const chartRef = useRef<ChartJS<'line'> | null>(null); // Reference to the chart instance

  // Get JSON Data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Loading Indicator
  if (!product) {
    return <div>Loading...</div>;
  }

  // ChartJS ChartData Options
  const salesData: ChartData<'line'> = {
    labels: product.sales.map((sale: any) => parseISO(sale.weekEnding)),
    datasets: [
      {
        label: 'Retail Sales',
        data: product.sales.map((sale: any) => ({ x: parseISO(sale.weekEnding).getTime(), y: sale.retailSales })),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Wholesale Sales',
        data: product.sales.map((sale: any) => ({ x: parseISO(sale.weekEnding).getTime(), y: sale.wholesaleSales })),
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
    ],
  };


  // ChartJS Chart Optioins
  const options: ChartOptions<'line'> = {
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
        }
      }
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // Only allow panning in the x direction
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.01,
          },
          pinch: {
            enabled: false,
          },
          mode: 'x', // Only allow zooming in the x direction
        },
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem: any) {
            const date = tooltipItem[0].parsed.x;
            return format(new Date(date), 'yyyy-MM-dd'); // Correct date formatting
          },
        },
      },
    },
  };

  //Change to daily ticks at a given zoom threshold
  const enforceLimitsPlugin: Plugin<'line'> = {
    id: 'enforceLimits',
    beforeUpdate: (chart) => {
      const timeScale = chart.scales['x'] as TimeScale;
      const range = timeScale.max - timeScale.min;
      const isDaily = range <= 6 * 30 * 24 * 60 * 60 * 1000; // 6 months threshold
      const xScaleOptions = chart.options.scales?.x;
      if (xScaleOptions && 'time' in xScaleOptions) {
        (xScaleOptions as { time: { unit: 'day' | 'month' } }).time.unit = isDaily ? 'day' : 'month';
      }
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box component="img" src="/logo.svg" alt="Logo" sx={{ width: '15%', marginRight: 2, marginY: 2 }} />
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} style={{ padding: 24 }}>
        <Grid item xs={3}>
          <CustomCard title={product.title} description={product.subtitle} tags={product.tags} />
        </Grid>
        <Grid item xs={9}>
          <Card>
            <CardContent>
              <Typography variant="h6">Retail Sales vs. Wholesale Sales</Typography>
              <div className="chartWrapper">
                <div className="chartAreaWrapper">
                  <Line
                    ref={chartRef}
                    data={salesData}
                    options={options}
                    plugins={[enforceLimitsPlugin]}
                  />
                  <TooltipComponent />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <CustomTable rows={product.sales} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
