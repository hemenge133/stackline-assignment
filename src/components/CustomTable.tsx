import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, TableSortLabel } from '@mui/material';

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface CustomTableProps {
  rows: Sale[];
}

type Order = 'asc' | 'desc';

const CustomTable: React.FC<CustomTableProps> = ({ rows }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Sale>('weekEnding');

  const handleRequestSort = (property: keyof Sale) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'weekEnding'}
                  direction={orderBy === 'weekEnding' ? order : 'asc'}
                  onClick={() => handleRequestSort('weekEnding')}
                >
                  Week Ending
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'retailSales'}
                  direction={orderBy === 'retailSales' ? order : 'asc'}
                  onClick={() => handleRequestSort('retailSales')}
                >
                  Retail Sales
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'wholesaleSales'}
                  direction={orderBy === 'wholesaleSales' ? order : 'asc'}
                  onClick={() => handleRequestSort('wholesaleSales')}
                >
                  Wholesale Sales
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'unitsSold'}
                  direction={orderBy === 'unitsSold' ? order : 'asc'}
                  onClick={() => handleRequestSort('unitsSold')}
                >
                  Units Sold
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'retailerMargin'}
                  direction={orderBy === 'retailerMargin' ? order : 'asc'}
                  onClick={() => handleRequestSort('retailerMargin')}
                >
                  Retailer Margin
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.weekEnding}</TableCell>
                <TableCell>{row.retailSales}</TableCell>
                <TableCell>{row.wholesaleSales}</TableCell>
                <TableCell>{row.unitsSold}</TableCell>
                <TableCell>{row.retailerMargin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomTable;
