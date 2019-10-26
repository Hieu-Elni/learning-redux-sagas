import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles , Typography} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';


import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from './../../actions/task';
import * as modalActions from './../../actions/modal';
import TaskForm from '../TaskForm';
// tên là TaskList khi import bên TaskList(import CardItem from './../TaskItem') vẫn ok

class TaskItem extends Component   {


    onClickEdit = task =>{
        const { taskActionCreators, modalActionCreators } = this.props;
        const { setTaskEditing } = taskActionCreators;
        console.log('task',task)
        setTaskEditing(task);
        const {
          showModal,
          changModalTitle,
          changModalContent,
        } = modalActionCreators;
        showModal();
        changModalTitle('Cập nhật công việc');
        changModalContent(<TaskForm />);
    }

    handleDeleteTask(task) {
        const { id } = task;
        const { taskActionCreators } = this.props;
        const { deleteTask } = taskActionCreators;
        deleteTask(id);
      }
    
  render(){
      const {classes, task, status} = this.props;
    
      const {id , title} = task;
    return(
      
            <Card key={id} className={classes.card}>
                <CardContent>
                    <Grid container justify="space-between">
                        <Grid item md={8}>
                            <Typography>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            {status.label}
                        </Grid>
                    </Grid>
                    <p>{task.description}</p>
                </CardContent>
                <CardActions size="small" className={classes.cardActions}>
                    <Fab
                        color="primary"
                        aria-label="Edit"
                        className={classes.Fab}
                        size="small"
                        onClick={()=>this.onClickEdit(task)}
                    >
                        <Icon fontSize="small">edit_icon</Icon>
                    </Fab>
                    <Fab
                        color="primary"
                        aria-label="Delete"
                        className={classes.fab}
                        size="small"
                        onClick={() => this.handleDeleteTask(task)}
                    >
                        <Icon fontSize="small">delete_icon</Icon>
                    </Fab>
                    </CardActions>
            </Card>   
    );
  }
}

TaskItem.propTypes ={
    classes: PropTypes.object,
    task: PropTypes.object,
    status: PropTypes.object,
    taskActionCreators: PropTypes.shape({
        setTaskEditing: PropTypes.func,
        deleteTask: PropTypes.func,
      }),
    modalActionCreators: PropTypes.shape({
        showModal: PropTypes.func,
        hideModal: PropTypes.func,
        changModalTitle: PropTypes.func,
        changModalContent: PropTypes.func,
      }),
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
      taskActionCreators: bindActionCreators(taskActions, dispatch),
      modalActionCreators: bindActionCreators(modalActions, dispatch),
    };
  };

export default withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps)(TaskItem));
