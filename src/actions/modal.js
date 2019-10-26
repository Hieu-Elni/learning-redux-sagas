import * as modalTypes from './../constants/modal';

export const showModal = () => ({
  type: modalTypes.SHOW_MODAL,
});

export const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
});

export const changModalTitle = (title) => ({
  type: modalTypes.CHANGE_MODAL_TITLE,
  payload:{
    title
  }
});

export const changModalContent = (component) => ({
  type: modalTypes.CHANGE_MODAL_CONTENT,
  payload:{
    component
  }
});