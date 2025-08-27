function validateForm() {
    let isValid = true;

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value.trim();
    
    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required.";
        isValid = false;
    }
    
    if (email === "" || !email.includes("@")) {
        document.getElementById("emailError").innerText = "Enter a valid email.";
        isValid = false;
    }
    
    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters.";
        isValid = false;
    }
    
    if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById("phoneError").innerText = "Enter a valid 10-digit phone number.";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
    }
}