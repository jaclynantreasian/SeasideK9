const checkEmpty = (s) => s == "" || undefined;
const handleEmptyString = (s) => `**Please enter a ${s}`;
function validateEmail($email) {
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test( $email );
  }

jQuery(document).ready(function($) {

    $('.btn-submit').click(function(e){
        e.preventDefault();
        const errorContainer = $(".errorCode");
        errorContainer.empty();  
    
        var fullName = $('#inputFullName').val();
        
        var email = $('#inputEmail').val();
        var phone = $('#inputPhone').val();
        var preferred = $('#inputPreferred').val();
        var date = $('#inputDate').val();
        var dateTwo = $('#inputDateTwo').val();
        var petName = $('#inputPetName').val();
        var petAge = $('#inputPetAge').val();
        var dateTwo = $('#inputDateTwo').val();
        var daycare = $("#checkDayCare").is(":checked");
        var pickup = $("#checkPickUp").is(":checked");
        var sleepover = $("#checksleepover").is(":checked");
        var houseSitting = $("#checkHouseSitting").is(":checked");
        var houseSitting = $("#checkGrooming").is(":checked")




        var referred = $('#inputReferred').val();
        var addlInfo = $("textarea").val();

        var error =  [];
        

        console.log(fullName, email, phone, preferred, date, dateTwo,
        petName, daycare, pickup, houseSitting, sleepover, petAge, referred, addlInfo);


        // an example error
        /* var error = {
            error: string,
            message: string
        }
        */

        // push errors to error array

        if(checkEmpty(fullName)) {
            error.push({
                type: "name",
                message: handleEmptyString("valid name")
            });
            }


        if( !validateEmail(email)){
            error.push({
                type: "email",
                message: handleEmptyString("valid email")
            })
        }

        if(phone.length !== 10) {
            error.push({
                type: "number",
                message: handleEmptyString("valid 10 digit number")
            });
            }


        if(checkEmpty(petName)) {
            error.push({
                type: "pet name",
                message: handleEmptyString("pet name")
            });
            }

            if(checkEmpty(petAge)) {
                error.push({
                    type: "pet age",
                    message: handleEmptyString("pet age")
                });
                }

             if(error.length > 0){
                errorContainer.append("***Please complete all the required fields");
             }   

console.log(error, "error")
    // if(phone.length !== 10)  // a 10 digit phone number with no slashes is required aka 6172222020
    // if (petAge == "") // Pet's age is required
    });

});

