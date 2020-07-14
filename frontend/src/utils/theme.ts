import { NONAME } from "dns";

export default {
  global: {
    colors: {
      brand: '#333',
      focus: '#666',
    },
    font: {
      family: 'Work Sans',
      size: '18px',
      height: '20px',
    },
    focus: {
      border: {
        color: 'none',
      },
    },
  },
  anchor: {
    color: 'dark-1',
    hover: {
      extend: () => {
        return {
          color: '#555555',
        };
      },
      textDecoration: 'none',
    },
  },
};
