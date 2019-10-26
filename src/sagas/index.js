import {fork,take,call,put, delay, 
    takeLatest, select,takeEvery
} from 'redux-saga/effects'

import * as taskTypes from './../constants/task';

import { STATUS_CODE, STATUSES } from './../constants/constants';
import { getList, postAddTask,updateTask, deleteTask} from './../apis/task';
import {
    fetchListTask,
    fetchListTaskSuccess,fetchListTaskFailed,
    filterTaskSuccess,
    addTaskSuccess,addTaskFailed,
    updateTaskFailed,
    updateTaskSuccess,
    deleteTaskFailed,
    deleteTaskSuccess,
}
from '../actions/task';
import { hideModal } from '../actions/modal';

import { hideLoading, showLoading } from '../actions/ui';
/**
 B1: Thực thi fetch-task action ,gọi showloading 
 B2: gọi api getList Task về
 B3: Nếu thành công thì gọi put action 
    Nếu thất bai thì gọi action FAILED
 B4: Thực thi action tắt showloading dù thành công hay thất bại
 B5: next
 Note: take sẽ gọi 1 lần nên cần while(true)
 */

function* watchFetchListTaskAction() {
    while(true){
        const action = yield take(taskTypes.FETCH_TASK);
        yield put(showLoading());
        // ====== block chay lenh duoi khi cau lenh tren chay done===
        const { params } = action.payload;
        const resp = yield call(getList,params);
        const { status, data } = resp;
        if(status === STATUS_CODE.SUCCESS) {
            //dispatch
            yield put(fetchListTaskSuccess(data));
        }else{
            yield put(fetchListTaskFailed(data));
        }
        yield delay(1000);
        yield put(hideLoading());
    }
 
}

// filter theo store
function* filerTaskSaga({payload}) {
//payload lay tu action truyen vao la FILTER_TASK

// khi nhập vào input => handle => lấy value input => gọi action filterTask(trong containers/TaskBoard/index.js) 
//  lấy ra đc payload
// saga theo dõi filter
yield delay(500);
const {keyword} = payload;
// keyword sẽ filter để lấy ra task, làm thế nào lấy đc listTask từ store => t dùng select
const list = yield select(state => state.task.listTask);
const filterTask = list.filter(task => 
    task.title
    .trim().toLowerCase()
    .includes(keyword.trim().toLowerCase()));
    yield put(filterTaskSuccess(filterTask));
}

function* filerTaskApiSaga({payload}){
    yield delay(500);
    const { keyword } = payload;
  yield put(
    fetchListTask({
      q: keyword,
    }),
  );
}

function* addTaskSaga({payload}){
    const {title, description} = payload;
    yield put(showLoading());

    const resp = yield call(postAddTask,{
        title,
        description,
        status: STATUSES[0].value,
    });
    const { status, data } = resp;
    if(status === STATUS_CODE.CREATED) {
        //dispatch
        yield put(addTaskSuccess(data));
        yield put(hideModal());
    }else{
        yield put(addTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
}

function* updateTaskApiSaga({payload}){
    const {title, description, status} = payload;
    yield put(showLoading());
    const taskEditing = yield select(state => state.task.taskEditing);
    const resp = yield call(updateTask,
    taskEditing.id,
    {
        title,
        description,
        status
    }
    );
    const { status: statusCode, data } = resp;
    if(statusCode === STATUS_CODE.SUCCESS) {
        //dispatch
    //   console.log('run');
        yield put(updateTaskSuccess(data));
        yield put(hideModal());
    }else{
        yield put(updateTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
    const { id } = payload;
    yield put(showLoading());
    const resp = yield call(deleteTask, id);
    const { data, status: statusCode } = resp;
    if (statusCode === STATUS_CODE.SUCCESS) {
      yield put(deleteTaskSuccess(id));
    //   yield put(hideModal());
    
    } else {
      yield put(deleteTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }

function* rootSaga() {
    yield fork(watchFetchListTaskAction);
    yield takeLatest(taskTypes.FILTER_TASK, filerTaskApiSaga);
    yield takeEvery(taskTypes.ADD_TASK, addTaskSaga)
    yield takeLatest(taskTypes.UPDATE_TASK, updateTaskApiSaga);
    yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}

export default rootSaga;