import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles, Grid, Box, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from './../../actions/modal';
import * as taskActions from './../../actions/task';
import renderTextField from './../FormHelper/TextField';
import renderSelectField from './../FormHelper/Select';
import { Field, reduxForm } from 'redux-form';
import validate from './validate'

class TaskForm extends Component   {

  handerSubmitForm = data =>{
    const { taskActionsCreators, taskEditing } = this.props;
    const { addTask, updateTask } = taskActionsCreators;
    const { title, description, status } = data;
    if (taskEditing && taskEditing.id) {
      updateTask(title, description, status);
    } else {
      addTask(title, description);
    }
      
  }
  required = value => {
   
    let error = 'Title is required';
    if(value !== null && typeof value !== 'undefined' && value.trim() !== ''){
      error = null;
      console.log('1',value)
    }
    return error;
  }
  renderStatusSelection() {
    let xhtml = null;
    const { taskEditing, classes } = this.props;
    if (taskEditing && taskEditing.id) {
      xhtml = (
        <Field
          id="status"
          label="Trạng thái"
          className={classes.select}
          name="status"
          component={renderSelectField}
        >
          <MenuItem value={0}>Ready1</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Field>
      );
    }
    return xhtml;
  }

   render(){
      const { classes, modalActionsCreators,handleSubmit, submitting, invalid } = this.props;
      const {hideModal} = modalActionsCreators;
    return(
      <form onSubmit={handleSubmit(this.handerSubmitForm)}>
      <Grid container >
          <Grid item md={12}>
         
          <Field 
            id="title"
            label ="Tieu de"
            className={classes.textField}
            name="title"
           component={renderTextField}
           
          />
          </Grid>
          <Grid item md={12}>
          <Field 
            id="description"
            label ="Mô tả"
            className={classes.textField}
            rowsMax="4"
            name="description"
           component={renderTextField}
          />
            {/* <TextField
              id="description"
              label="Mô tả"
              multiline
              rowsMax="4"
              className={classes.textField}
              margin="normal"
              name="description"
            
            /> */}
          </Grid>
          {this.renderStatusSelection()}
          <Grid item md={12}>
            <div className={classes.wrapBox}>
            <Box display="flex" flexDirection="row-reverse">
            <Button  variant="contained" onClick={hideModal}>
                Cancel
            </Button>
            <Button  variant="contained" onClick={this.onSave}  color="primary" type="submit" disabled={invalid || submitting}>
                Save
            </Button>
            </Box>
            </div>
          </Grid>
      </Grid>
      </form>
    );
  }

 
}
TaskForm.propTypes = {
  classes: PropTypes.object,
  handleSubmit:PropTypes.func,
  submitting: PropTypes.bool, 
  invalid: PropTypes.bool,
  modalActionsCreators: PropTypes.shape({
    hideModal:PropTypes.func
  }),
  taskActionsCreators: PropTypes.shape({
    addTask: PropTypes.func,
    updateTask: PropTypes.func,
  })
};


const mapStateToProps = state => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: {
      title: state.task.taskEditing ? state.task.taskEditing.title : null,
      description: state.task.taskEditing
        ? state.task.taskEditing.description
        : null,
      status: state.task.taskEditing ? state.task.taskEditing.status : null,
    },
  };
};
const mapDispatchToProps = dispatch => {
  return{
    modalActionsCreators: bindActionCreators(modalActions,dispatch),
    taskActionsCreators: bindActionCreators(taskActions,dispatch),
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const FORM_NAME = 'TASK_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate
});
export default compose(
  withConnect,
  withReduxForm,
  withStyles(styles),
)(TaskForm)
