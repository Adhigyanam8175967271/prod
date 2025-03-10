function validationnew(sno)
{
    let error = {}
    

        if(sno === "")
        {
            error.sno = "Field cannot be empty"
        }
        else
        {
            error.sno = ""
        }
        
      

        return error;

}

export default validationnew;