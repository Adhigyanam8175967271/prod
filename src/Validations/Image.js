function validation(values)
{
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const letter_pattern = /^[a-zA-Z\s]+$/
    const pan_pattern = /^[a-zA-Z0-9]{10}$/;
    // const number_pattern = /^[0-9\b]+$/     
    // Above is number pattern validation but without lenth limiter
    const contact_pattern = /^\d{10}$/
    // Above is experimental contact no pattern validation with lenth limiter


   
        if(values.name === "")
        {
            error.name = "Field cannot be empty"
        }
        else if(!letter_pattern.test(values.name))
        {
            error.name = "Please Enter a Valid Name"
        }
        else
        {
            error.name = ""
        }

        if(values.panno === "")
            {
                error.panno = "Field cannot be empty"
            }
            else if(!pan_pattern.test(values.panno))
            {
                error.panno = "Please Enter a Valid PAN No."
            }
            else
            {
                error.panno = ""
            }
    
    


        if(values.contact === "")
        {
            error.contact = "Field cannot be empty"
        }
        else if(!contact_pattern.test(values.contact))
        {
            error.contact = "Please Enter a Valid Contact No"
        }
        else
        {
            error.contact = ""
        }
        
      
        if(values.email === "")
        {
            error.email = "Field cannot be empty"
        }
        else if(!email_pattern.test(values.email))
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