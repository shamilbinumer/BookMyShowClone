
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);
//////////up-frontend///////////////

document.getElementById("btn-register").addEventListener("click",function(e){
    e.preventDefault()
    window.location.href="../login.html";   
})
function reg(){
    let name = document.getElementById('fullname').value;
    let user = document.getElementById('username').value;
    let password = document.getElementById('pwd').value;

    if (name===''||user===''||password===''){
        alert('Fields Are Empty');
        return;
    }

    fetch('http://localhost:3004/BookMyShow/adduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            user: user,
            password: password
        }),
    })
        .then((res) => {
            console.log(res.status);
            if (res.status !== 404) {
                alert('Registration Successful');
            } else {
                alert('Registration Failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Server not connected');
        });

        
}


// document.getElementById("btn-register").addEventListener('click', (e) => {
//     e.preventDefault();
    // let name = document.getElementById('fullname').value;
    // let user = document.getElementById('username').value;
    // let password = document.getElementById('pwd').value;

    // if (name===''||user===''||password===''){
    //     alert('Fields Are Empty');
    //     return;
    // }

    // fetch('http://localhost:3004/BookMyShow/adduser', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         name: name,
    //         user: user,
    //         password: password
    //     }),
    // })
    //     .then((res) => {
    //         console.log(res.status);
    //         if (res.status !== 404) {
    //             alert('Registration Successful');
    //         } else {
    //             alert('Registration Failed');
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         alert('Server not connected');
    //     });
// });


