import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles} from '@material-ui/core';
import LoadingIcon from './../../assets/dot-loading.gif'
import { compose } from 'redux';
import { connect } from 'react-redux';

class GlobalLoading extends Component   {

  render(){
      const {classes, showLoading} = this.props;
      // let xhtml = null;
      
      //return xhtml;
    return(
      showLoading === true ?
        (
          <div className={classes.globalLoading}>
            <img src={LoadingIcon} alt="loading" className={classes.icon} />
          </div>
        ):( null)
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);
export default compose(
  withStyles(styles),
  withConnect,
)(GlobalLoading);

