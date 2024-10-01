import * as React from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

const MyComponent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSuccessClick = () => {
    enqueueSnackbar('This is a success message!', { variant: 'success' });
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleSuccessClick}>
        Show Success Snackbar
      </Button>
    </React.Fragment>
  );
};

export default MyComponent;
