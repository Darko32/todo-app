const { Validator } = require('node-input-validator');

const tasksSchema = {
        task_title: 'required|minLength:2',
       
};

const validate  = async (data, schema) => {
    let v = new Validator(data, schema);
    let res = await v.check();
    if (!res) {
        throw v.errors;
    }
    return res;
};

module.exports = {
    tasksSchema,
    validate 
};