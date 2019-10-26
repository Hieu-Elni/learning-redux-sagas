import React, { Component } from 'react';
import styles from './styles.js'
import {withStyles, Modal} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from './../../actions/modal'
class CommonModal extends Component{

  render(){
      const { classes, modalActionsCreators,isShowing,title,component} = this.props;
      const{ hideModal} = modalActionsCreators;

    return(
      <Modal open={isShowing} onClose={hideModal}>
        <div className = {classes.modal}>
          <div className={classes.header}>
            <span>{title}</span>
            <CloseIcon className={classes.icon} onClick={hideModal}/>
          </div>
          <div className={classes.content}>
            {component}
          </div>
        </div>
      </Modal>
    );
  }

}
CommonModal.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  component:PropTypes.object,
  modalActionsCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal:PropTypes.func
}),
};

const mapStateToProps = state => {
    return{
        isShowing: state.modal.showModal,
        title:state.modal.title,
        component: state.modal.component
    }
};
const mapDispatchToProps = dispatch => {
    return {
        modalActionsCreators: bindActionCreators(modalActions,dispatch)
    }
};
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
export default compose(
     withStyles(styles),
     withConnect
)(CommonModal)
