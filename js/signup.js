

$(function () {
    
    var emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var strongPwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#\$%\^&\*])(?=.{8,})");
    
    // To enable or disable login button
    $("#signupForm").bind('keyup', function (e) {
        
        var email=$("#email").val();
        var password=$("#password").val();
        
        if(emailRegex.test(email)==true && strongPwdRegex.test(password)==true)
        {
            $("#signup").attr('disabled',false);
        }
        else
        {
            $("#signup").attr('disabled',true);
        }
    });
    
    
    // To validate email entry
    $("#email").on("keyup", function (e) {
        
        var email=$("#email").val();
        
        if(email.length==0){
            $("#email_error").text("");
        }
        else if(emailRegex.test(email)==false)
        {
            $("#email_error").text("Invalid email");
        }
        else
        {
            $("#email_error").text("");
        }             
    });
    
    
    // To validate password entry
    $("#password").on("keyup", function (e) {
        
        var passwordValue=$("#password").val();
        
        if(passwordValue.length==0){
            $("#passsword_error").text("");
        }
        else if(passwordValue.length<8)
        {
            $("#passsword_error").text("8 characters at least");
        }
        else if(strongPwdRegex.test(passwordValue)==false)
        {
            $("#passsword_error").text("Unsecured password");
        }
        else
        {
            $("#passsword_error").text("");
        }             
    });
    
    
});

$("#signup").on("click", async (e) => {
    try{
        console.log("triggered")
        const data = {
            email: `${$("#email").val()}`,
            password: `${$("#password").val()}`
        }
        const newUser = await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const datajson = await newUser.json()
        if(datajson == "User already exists") {
            $("#passsword_error").text("User Already Exists");
        }
        else {
            storage = window.localStorage
            storage.setItem('id', datajson._id)
            window.location = '../views/user.html'
        }
    }
    catch(e) {
        console.log("Error creating user")
        console.log(e)
    }
})

$("#signupForm").submit(function(e) {
    e.preventDefault();
});