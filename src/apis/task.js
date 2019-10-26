import axiosService from './../commons/axiosServices';
import { API_ENDPOINT } from './../constants/constants';
import qs from 'query-string';
const url = 'tasks';

export const getList = (params ={}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
    return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
}

export const postAddTask = data => {
    return axiosService.post(`${API_ENDPOINT}/${url}`,data);
}

export const updateTask = (id,data) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${id}`,data);
}

// http://localhost:3000/tasks/:id METHOD: DELETE
export const deleteTask = taskId => {
  return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};