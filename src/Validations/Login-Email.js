function validation(email)
{
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
       
        if(email === "")
        {
            error.email = "Field cannot be empty"
        }
        else if(!email_pattern.test(email))
        {
            error.email = "Please Enter a Valid Email Address"
        }
        else
        {
            error.email = ""
        }

          

        return error;

}

export default validation;