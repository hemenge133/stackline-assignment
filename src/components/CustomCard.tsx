import React from 'react';
import { Card, CardContent, Typography, Chip, Grid } from '@mui/material';

interface CustomCardProps {
  title: string;
  description: string;
  tags: string[];
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description, tags }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{description}</Typography>
        <Grid container spacing={1} style={{ marginTop: 8 }}>
          {tags.map((tag, index) => (
            <Grid item key={index}>
              <Chip label={tag} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
