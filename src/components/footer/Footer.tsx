import React from 'react';
import classes from "./footer.module.css";
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box className={classes.footerContainer}>
      <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>
        All rights reserved to Moti Gabay © 2025 | React | TypeScript | MUI
      </Typography>
    </Box>
  );
};

export default Footer;
