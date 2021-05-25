import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';
import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { orange, blue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  status: {
    danger: orange[500],
    primary: blue[500],
    secondary: red[50]
  },
  palette: {
    primary: {
      main: "#00BFFF"
    },  
    secondary: {
      main: "#FFD700"
    },
    danger: {
      main: "#8B0000"
    }
  }
});
ReactDOM.render(
  
  <React.StrictMode>
    <CssBaseline></CssBaseline>
    <MuiThemeProvider theme={theme}>
     <App />
    </MuiThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
