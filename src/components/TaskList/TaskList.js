import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

import CardItem from './../TaskItem'
class TaskList extends Component   {

  render(){
      const {classes, tasks, status} = this.props;
    return(
        <Grid item md={4} xs={12} key ={status.value}>
        <Box mt={2} mb={2}> <div className={classes.status}>{status.label}</div></Box>
        {tasks.map(task => {
            return(
                <CardItem
                    key = {task.id}
                    task ={task}
                    status ={status}
                />
            )
        })}
    </Grid>      
    );
  }
}

export default  withStyles(styles)(TaskList);
