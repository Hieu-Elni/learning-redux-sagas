import * as taskConstants from './../constants/task';


const initialState = {
  listTask: [],
  taskEditing: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case taskConstants.FETCH_TASK:
        return {...state,
          listTask:[]
        };
      case taskConstants.FETCH_TASK_SUCCESS:
        // state = action.data;
        return {...state,
          listTask:action.data
        };
      case taskConstants.FETCH_TASK_FAILED:
        return {
          ...state,
          listTask: [],
        };
      case taskConstants.FILTER_TASK_SUCCESS:
        return {
          ...state,
          listTask: action.payload.data,
        };
      case taskConstants.ADD_TASK:
        return {...state};
      case taskConstants.ADD_TASK_SUCCESS:
      //  const {data} = action.payload;
      const data = action.payload.data;
        console.log(data);
        return {...state,
          listTask:state.listTask.concat(data)
        };
      case taskConstants.ADD_TASK_FAILED:
        return {
          ...state
        };   
      case taskConstants.SET_TASK_EDITING: 
          const { task } = action.payload;
          return {
            ...state,
            taskEditing: task,
          };
        
        case taskConstants.UPDATE_TASK:
          return {...state};
        
        case taskConstants.UPDATE_TASK_SUCCESS:{
    
            const {data} = action.payload;
          const { listTask } = state;
          
          const index = listTask.findIndex(item => item.id === data.id);
          console.log(index,data);
            if (index !== -1) {
              listTask[index] = data;
              console.log(listTask);
            return {...state,
              listTask:[...listTask]
            };
         }
          return {...state};
        }
        case taskConstants.UPDATE_TASK_FAILED:
            const { error } = action.payload;
          return {
            ...state
          };  
          
          case taskConstants.DELETE_TASK: {
            return {
              ...state,
            };
          }
          case taskConstants.DELETE_TASK_SUCCESS: {
            const  {taskId}  = action.payload; // task id
            // toastSuccess('Xóa công việc thành công');
            console.log(taskId);
            return {
              ...state,
              listTask: state.listTask.filter(item => item.id !== taskId),
            };
          }
          case taskConstants.DELETE_TASK_FAILED: {
            const { error } = action.payload;
            // toastError(error);
            return {
              ...state,
            };
          }
        
        default: return state;
      }
}
export default reducer;