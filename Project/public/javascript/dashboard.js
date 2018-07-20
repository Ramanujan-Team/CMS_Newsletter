var c1 = document.getElementById("temp1");
var c2 = document.getElementById("temp2");
var c3 = document.getElementById("temp3");
var c4 = document.getElementById("temp4");

c1.onclick = function(e) {
    c1.checked = true;
    c2.checked = false;
    c3.checked = false;
    c4.checked = false;
};

c2.onclick = function (e) {
    c2.checked = true;
    c1.checked = false;
    c3.checked = false;
    c4.checked = false;
};

c3.onclick = function (e) {
    c3.checked = true;
    c1.checked = false;
    c2.checked = false;
    c4.checked = false;
};

c4.onclick = function (e) {
    c4.checked = true;
    c1.checked = false;
    c2.checked = false;
    c3.checked = false;
};

var sendButton = document.getElementById('mailButton');

sendButton.onclick = function (e) {
    var id;
    if(c1.checked){
        id = c1.value;
    }
    else if (c2.checked)
    {
        id = c2.value;
    }
    else if (c3.checked){
        id = c3.value;
    }
    else {
        id = c4.value;
    }

    $.ajax({
        type: 'POST',
        url: '/send',
        data: {
            'from': 'vktg797@gmail.com',
            'to': $('#mail').val().split(';'),
            'autotext': 'true',
            'subject': $('#subject').val(),
            'html': $('#msg').val(),
            templateId: id
        },
        success: function(data) {
            if(data['success']){
                alert("Message sent");
            }
        }
    })
};