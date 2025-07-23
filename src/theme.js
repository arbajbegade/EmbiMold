import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    customColor: {
      main: '#3D3A89',
      contrastText: '#FFFFFF',
    },
  },
  components: {
    MuiSelect: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            fontSize: '16px',
          },
        },
        {
          props: { size: 'large' },
          style: {
            fontSize: '20px',
          },
        },
      ],
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#3A3D89',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#3A3D89',
          fontSize: '0.75rem',
          '&.Mui-selected': {
            color: '#3A3D89',
          },
        },
      },
    },

  },
});

export default theme