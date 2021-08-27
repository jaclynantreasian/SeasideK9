const handleError = (elem) => (m) => elem.append(m)
const checkEmpty = (elem) => elem === "" || undefined;
const handleEmptyString = (s) => `**Please enter a valid ${s}`;

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

        const setSuccess = () => {
            $('#successContainer').show();
            $('#formContainer').hide();
        }
        
        const setError = handleError(errorContainer)
        var error =  [];
    
        var fullName = $('#inputFullName');
        var email = $('#inputEmail');
        var phone = $('#inputPhone');
        var petName = $('#inputPetName');
        var petAge = $('#inputPetAge');
        var preferred = $('#inputPreferred'); 
        var date = $('#inputDate');
        var daycare = $("#checkDayCare").is(":checked");
        var pickup = $("#checkPickUp").is(":checked");
        var sleepover = $("#checksleepover").is(":checked");
        var houseSitting = $("#checkHouseSitting").is(":checked");
        var grooming = $("#checkGrooming").is(":checked");
        var referred = $('#inputReferred');
        var addInfo = $("textarea");
        
        if(checkEmpty(fullName.val())) {
            error.push({
                elem: fullName,
                message: handleEmptyString("valid name")
            });
        }
        if(preferred.val() == "Choose..."){
            error.push({
                elem: preferred,
                message: handleEmptyString("contact method")
            })
        }
        if(!validateEmail(email.val())) {
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
        
        if(isNaN(parseInt(phone.val()))) {
            error.push({
                elem: phone,
                message: handleEmptyString("must be a number")
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
                value.elem.addClass("is-invalid")
            });
            return;
        }  
         
        $.ajax({
            url: "./script/sendMail.php", 
            type: "post",
            success: (result) =>{
                const r = JSON.parse(result);
                if (r.type == 'error') {
                    setError(r.message);
                    $.each(r.selectors, (i, v) => {
                        $(v).addClass("is-invalid");
                    });
                }      
                else if(r.type == 'success') {
                    setSuccess();
                }     
            },
            error: () => setError ("something went wrong please try again later"),
            data: {
                petAge: petAge.val(),
                fullName: fullName.val(),
                email: email.val(),
                phone: phone.val(),
                petName: petName.val(),
                
                date: date.val(),
                addInfo: addInfo.val(),
                referred: referred.val(),
                daycare: daycare,
                pickup: pickup,
                sleepover: sleepover,
                houseSitting: houseSitting,
                grooming: grooming
            }
        });

        console.log(error, "error")
    });

});

