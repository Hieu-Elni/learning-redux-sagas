import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles} from '@material-ui/core';

import { ThemeProvider } from '@material-ui/styles';
import TaskBoard from '../TaskBoard/index.js';
import LoadingGlobal from './../../components/LoadingGlobal'
import CommonModal from './../../components/Modal/CommonModal'
import theme from './../../commons/Theme'

import { Provider } from 'react-redux';
import configureStore from '../../redux/configureStore';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();
class App extends Component   {
  render(){
    return(
    <Provider store={store}>
      <ThemeProvider theme = {theme}>
        <ToastContainer/>
        <LoadingGlobal/>
        <TaskBoard>
        </TaskBoard>
        <CommonModal />
      </ThemeProvider>
      </Provider>
    );
  }
}

export default  withStyles(styles)(App);
