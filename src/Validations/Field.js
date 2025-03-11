const validationnew = (fieldName, value) => {
    let errorsfield = {};
    
    if (!value.trim()) {
        errorsfield[fieldName] = "This field is required";
    }

    return errorsfield;
};

export default validationnew;