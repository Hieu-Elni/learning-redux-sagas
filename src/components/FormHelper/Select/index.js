
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.js';
import {withStyles } from '@material-ui/styles';

import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
  }

const renderSelectField = ({
    input,
    classes,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <FormControl className={classes.formControl} error={touched && error}>
      <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
      <Select
        
        {...input}
        {...custom}
        inputProps={{
          name: 'age',
          id: 'age-native-simple'
        }}
        value={input.value}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )

  renderSelectField.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
    children: PropTypes.array,
    classes: PropTypes.object
  };
  export default withStyles(styles)(renderSelectField);