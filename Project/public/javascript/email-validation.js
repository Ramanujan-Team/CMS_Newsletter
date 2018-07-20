
function send() {

    //var uname = document.getElementById('name');
    var email = document.getElementById('editoremail');
    var pass = document.getElementById('password');

    if (email_validation(email)) {
        if (password_validation(pass)) {
            $.ajax({
                type: 'POST',
                url: '/login',
                data: {
                    //'username': $('#name').val(),
                    'email': $('#editoremail').val(),
                    'password': $('#password').val()
                }, success: function(data) {
                    if (data.validUser) {
                        return window.location.href = "../dashboard.html";
                    }
                    alert('Either email or password is wrong. Try again!')
                    }
                })
            }
    }
    return false;
}

/*
function username_validation(uname) {
    var letters = /^[A-Za-z]+$/;
    var ustr = uname.value;

    if (ustr === "") {
        alert("Enter username");
        return false;
    }
    else if (ustr.match(letters)) {
        return true;
    }
    else {
        alert('Username must contain alphabet characters only');
        ustr.focus();
        return false;
    }
}   */

function email_validation(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var uemail = email.value;

    if (uemail.trim() === "") {
        alert("Enter Email id");
        return false;
    }
    else if (uemail.match(mailformat)) {
        //console.log(uemail);
        return true;
    }
    else {
        alert("Invalid email address!");
        uemail.focus();
        return false;
    }
}

function password_validation(pass) {
    var passid_len = pass.value.length;

    if (passid_len === 0) {
        alert("Enter Password");
        return false;
    }
    else if (passid_len < 6) {
        alert("Password should contain more than 6 characters");
        return false;
    }
    else {
        return true;
    }
}

