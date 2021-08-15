const handleError = (elem) => (m) => elem.append(m)
const checkEmpty = (elem) => elem === "" || undefined;
const handleEmptyString = (s) => `**Please enter a ${s}`;
function validateEmail($email) {
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test( $email );
  }

jQuery(document).ready(function($) {

    $('.btn-submit').click(function(e){
        e.preventDefault();

        $(".is-invalid").removeClass("is-invalid");
        const errorContainer = $(".errorCode");
        errorContainer.empty();  
        const setError = handleError(errorContainer)
        var error =  [];
    
        var fullName = $('#inputFullName');
        var email = $('#inputEmail');
        var phone = $('#inputPhone');
        var petName = $('#inputPetName');
        var petAge = $('#inputPetAge');

        var preferred = $('#inputPreferred').val();
       

        var date = $('#inputDate').val();
        var dateTwo = $('#inputDateTwo').val();
       
        var dateTwo = $('#inputDateTwo').val();
        var daycare = $("#checkDayCare").is(":checked");
        var pickup = $("#checkPickUp").is(":checked");
        var sleepover = $("#checksleepover").is(":checked");
        var houseSitting = $("#checkHouseSitting").is(":checked");
        var houseSitting = $("#checkGrooming").is(":checked");
        var referred = $('#inputReferred').val();
        var addlInfo = $("textarea").val();
        console.log("error array", error)
        
        if(checkEmpty(fullName.val())) {
            console.log("infull name", fullName.val())
            error.push({
                elem: fullName,
                message: handleEmptyString("valid name")
            });
        }

        if( !validateEmail(email.val())){
            error.push({
                elem: email,
                message: handleEmptyString("valid email")
            })
        }

        if(phone.val().length !== 10) {
            console.log(phone.length)
            error.push({
                elem: phone,
                message: handleEmptyString("valid 10 digit number")
            });
        }

        if(checkEmpty(petName.val())) {
            error.push({
                elem: petName,
                message: handleEmptyString("pet name")
            });
        }

        if(checkEmpty(petAge.val())) {
            error.push({
                elem: petAge,
                message: handleEmptyString("pet age")
            });
        }

        if(error.length > 0){
            setError("***Please complete all the required fields");

            $.each(error, function(index, value){
                console.log("inloop", value.elem)
                console.log(value, index);
                // $(fullName).addClass("is-invalid")
                value.elem.addClass("is-invalid")
            });
            return;
        }  
         
        $.ajax({
            url: "script/sendMail.php", 
            type: "post",
            success: function(result){
            console.log('success', result)            
            },
            error: () => setError ("something went wrong please try again later"),
            data: {
                petAge: petAge.val(),
                fullName: fullName.val(),
                email: email.val(),
                phone: phone.val(),
                petName: petName.val(),
            }
        });

        console.log(error, "error")
    });

});

