<?php
    $errors = array();
    function keyToString($k, $s = "") {
        $str = $s == "" ? $k : $s;
        return array_key_exists($k, $_POST) ? ", {$str}: {$_POST[$k]}"  : "";
    }
    
    if(empty($_POST["fullName"])) {
        array_push($errors, "#inputFullName");
    }
    if(
        empty($_POST["email"]) 
        || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)
    ) {
        array_push($errors, "#inputEmail");
    }
    if(
        empty($_POST["phone"]) 
        || strlen($_POST["phone"]) != 10
        || !is_numeric($_POST["phone"])
    ) {
        array_push($errors, "#inputPhone");
    }
    if(empty($_POST["petName"])){
        array_push($errors, "#inputPetName");
    }
    if(empty($_POST["petAge"])){
        array_push($errors, "#inputPetAge");
    }
    
    if (count($errors) > 0) {
        echo json_encode(array(
            'type' => 'error', 
            'message' => "***Please complete all the required fields", 
            'selectors' => $errors
        ));
    }
    
    else{
        $em = "email: {$_POST['email']}"
            . keyToString("fullName", "name")
            . keyToString("phone") 
            . keyToString("petName", "pet name") 
            . keyToString("petName", "pet age") 
            . keyToString("date")
            . keyToString("addInfo", "additional info")
            . keyToString("referred", "referred by")
            . keyToString("daycare")
            . keyToString("pickup")
            . keyToString("sleepover")
            . keyToString("houseSitting", 'house sitting')
            . keyToString("grooming")
        ;
        
        
        $send_to = "jaclynantreasian@gmail.com, 7812666499@vtext.com";
        $email = mail(
            $send_to,
            "New Booking.",
            $em,
            'From: <noreply@seasidek9s.com>'
        );
    
        if($email){
            echo json_encode(array('type' => 'success', "message" => $em));
        }
        else{
            echo json_encode(array('type' => 'error', 'message' => "failed to send email"));
        } 

    }
?>