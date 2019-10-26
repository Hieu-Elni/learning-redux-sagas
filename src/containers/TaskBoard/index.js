import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'; //https://material.io/resources/icons/?style=baseline
import Grid from '@material-ui/core/Grid';


import {STATUSES}  from './../../constants/constants';
import TaskList from './../../components/TaskList/TaskList';
import TaskForm from './../../components/TaskForm';
import SearchBox from './../../components/SearchBox/searchBox'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as taskActions from './../../actions/task';
import * as modalActions from './../../actions/modal'

class TaskBoard extends Component   {

    loadingData = () =>{
        const {taskActionsCreators} = this.props;
        const {fetchListTask} = taskActionsCreators;
        fetchListTask();
    }

    handleFilter = e => {
        const { value } = e.target;
        const {taskActionsCreators} = this.props;
        const {filterTask} = taskActionsCreators;
        filterTask(value);
    };
    renderSearchBox() {
        let xhtml= null;
        xhtml = 
            <SearchBox handleChange={this.handleFilter} />;
        
        return xhtml;
    }
    renderBoard(){
        const {listTask} = this.props;
        console.log(listTask);
        let xhtml = null;
            xhtml = (
                <Grid container spacing={2}>
                    {
                        STATUSES.map((status,index) => {
                            const taskFilter = listTask.filter(task => task.status === status.value);

                            return (
                              <TaskList
                              key= {status.value}
                              tasks={taskFilter}
                              status = {status}
                              ></TaskList>     
                            )
                        })
                    }
                </Grid>
            )
        return xhtml;
    }

   
    openAddForm = () =>{
        const {
            taskActionsCreators,
            modalActionCreators} = this.props;
        const {showModal,changModalTitle, changModalContent} = modalActionCreators;
        const {setTaskEditing} = taskActionsCreators;
        setTaskEditing(null);
        showModal();
        changModalTitle('Add task');
        changModalContent(<TaskForm/>);
    }
  render(){
    const {classes} = this.props
    return(
        <div>
            <Button variant="contained" color="primary" onClick= {this.loadingData} style={{marginRight:15}}>
                Load Data
            </Button>
            <Button variant="contained" color="primary" onClick= {this.openAddForm}>
                    <AddIcon /> Add
            </Button>
            {this.renderSearchBox()}
            <div className={classes.taskboard}>
                
                {this.renderBoard()}
            {/* {this.renderForm()} */}
            </div>
        </div>
    );
  }
}
TaskBoard.propTypes = {
    classes: PropTypes.object,
    taskActionsCreators: PropTypes.shape({
        fetchListTask: PropTypes.func,
        filterTask: PropTypes.func,
        setTaskEditing: PropTypes.func    
    }),
    modalActionCreators: PropTypes.shape({
        showModal:PropTypes.func,
        changModalTitle: PropTypes.func,
        changModalContent: PropTypes.func
    }),
    listTask: PropTypes.array
}
const mapStateToProps = state => {
    return{
        listTask: state.task.listTask
    }
};
const mapDispatchToProps = dispatch => {
    return {
        taskActionsCreators: bindActionCreators(taskActions,dispatch),
        modalActionCreators: bindActionCreators(modalActions, dispatch),
    }
};
export default  withStyles(styles)(
    connect(mapStateToProps,mapDispatchToProps)(TaskBoard)
);