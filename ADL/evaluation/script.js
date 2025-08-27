function checkNameEmpty(name){
    if(name.length === 0){
        return true;
    }
    else{
        return false;
    }
}

function checkEmail(email){
    for(var i=0;i<email.length; i++){
        if(email[i] == '@'){
            return true;
        }
    }
    return false;
}

function checkPassword(p1,p2){
    if(p1 === p2){
        return true;
    }
    else{
        return false;
    }
}

document.getElementById("registrationForm").addEventListener("submit",function(event){
    var fn = document.getElementById("firstName").value.trim();
    var ln = document.getElementById("lastName").value.trim();
    var email = document.getElementById("email").value.trim();
    var p1 = document.getElementById("password").value;
    var p2 = document.getElementById("conf-pass").value;
    
    if(checkNameEmpty(fn) || checkNameEmpty(ln)){
        alert("name is required");
    }
    else if(checkEmail(email) == false){
        alert("incorrect email format");
    }
    else if(checkPassword(p1,p2) == false){
        alert("both passwords must match");
    }
    else{
        alert("registration succesfull");
    }
});