function validationnew(password)
{
    let error = {}
    

        if(password === "")
        {
            error.password = "Field cannot be empty"
        }
        else
        {
            error.password = ""
        }
        
      

        return error;

}

export default validationnew;