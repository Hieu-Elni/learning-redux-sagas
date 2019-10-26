const validate = values =>{
const errors= {};
//value 1 object title va des

const {title } = values;
    if(!title) {
        errors.title ='Title is required';
    }else if(title && title.length < 5) {
        errors.title =" Title length >5"
    }
return errors;
}

export default validate;