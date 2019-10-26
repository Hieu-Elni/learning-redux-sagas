import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
class SearchBox extends Component   {

  render(){
      const {classes,handleChange} = this.props;
    return(
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
            id="outlined-name"
            label="Search"
            className={classes.textField}
             onChange={handleChange}
           //?? ko tr
            margin="normal"
            placeholder="Nhập từ khóa"
            />
        </form>
    );
  }

}

SearchBox.propTypes = {
    classes: PropTypes.object,
    handleChange: PropTypes.func,
  };

export default  withStyles(styles)(SearchBox);
