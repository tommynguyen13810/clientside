

$(function () {

    var emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var strongPwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#\$%\^&\*])(?=.{8,})");

    // To enable or disable login button
    $("#signinForm").bind('keyup', function (e) {

        var email = $("#email").val();
        var password = $("#password").val();

        if (emailRegex.test(email) == true && strongPwdRegex.test(password) == true) {
            $("#signin").attr('disabled', false);
        }
        else {
            $("#signin").attr('disabled', true);
        }
    });


    // To validate email entry
    $("#email").on("keyup", function (e) {

        var email = $("#email").val();

        if (email.length == 0) {
            $("#email_error").text("");
        }
        else if (emailRegex.test(email) == false) {
            $("#email_error").text("Invalid email");
        }
        else {
            $("#email_error").text("");
        }
    });


    // To validate password entry
    $("#password").on("keyup", function (e) {

        var passwordValue = $("#password").val();

        if (passwordValue.length == 0) {
            $("#passsword_error").text("");
        }
        else if (passwordValue.length < 8) {
            $("#passsword_error").text("8 characters at least");
        }
        else if (strongPwdRegex.test(passwordValue) == false) {
            $("#passsword_error").text("Unsecured password");
        }
        else {
            $("#passsword_error").text("");
        }
    });


});

//sign in button, checks if user exists and pass is correct, then redirects to user page
$("#signin").on("click", async (e) => {
    try {
        console.log("triggered")
        const data = {
            email: `${$("#email").val()}`,
            password: `${$("#password").val()}`
        }
        const newUser = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const datajson = await newUser.json()
        console.log(datajson)
        if (datajson == "User does not exist") {
            $("#passsword_error").text("User Does Not Exist Or Info Is Incorrect");
        }
        else {
            storage = window.localStorage
            storage.setItem('id', datajson._id)
            window.location = './views/user.html'
        }
    }
    catch (e) {
        console.log("Error creating user")
        console.log(e)
    }
})

$("#signinForm").submit(function (e) {
    e.preventDefault();
});