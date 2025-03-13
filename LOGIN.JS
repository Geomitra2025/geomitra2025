let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;
let generatedOTP = null;
let currentUsername = null;
let currentPassword = null;
let isPasswordReset = false;

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users)); 
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store full user data
        window.location.href = "dashboard.HTML"; // Redirect to profile page
    } else {
        alert("Invalid Username or Password");
    }
}


function register() {
    const name = document.getElementById("regName").value.trim();
    const number = document.getElementById("regNumber").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !number || !username || !password) {
        alert("All fields are required!");
        return;
    }

    if (!username.endsWith("@nmamit.in")) {
        alert("Invalid Username! Please use your college email (e.g., example@nmamit.in).");
        return;
    }

    // Check if the user already exists
    if (users.some(user => user.username === username)) {
        alert("User already exists! Try logging in.");
        return;
    }

    // Store user data
    let newUser = { name, number, username, password };
    users.push(newUser);
    saveUsers();

    alert("Registration Successful!");
    
    // Clear input fields
    document.getElementById("regName").value = "";
    document.getElementById("regNumber").value = "";
    document.getElementById("regUsername").value = "";
    document.getElementById("regPassword").value = "";

    showLogin(); // Automatically go back to the login page
}


function verifyOTP() {
    const enteredOTP = document.getElementById("otp").value;

    if (parseInt(enteredOTP) === generatedOTP) {
        if (isPasswordReset) {
            document.getElementById("userDetails").textContent = `Username: ${currentUsername}, Password: ${currentPassword}`;
            document.getElementById("resetPasswordContainer").style.display = "block";
            isPasswordReset = false;
        } else {
            users.push(currentUser);
            saveUsers();
            alert("Registration Successful!");
            showLogin();
        }
    } else {
        alert("Invalid OTP. Please try again.");
    }
}
function showLogin() {
    // Show only the login page and hide everything else
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("forgotPasswordContainer").style.display = "none"; // Hide Forgot Password page

    // Hide recovery details and clear input field
    document.getElementById("recoveryDetails").style.display = "none";
    document.getElementById("forgotNumber").value = "";
}

function showRegister() {
    // Show the Register page
    document.getElementById("registerContainer").style.display = "block";

    // Hide other pages
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("forgotPasswordContainer").style.display = "none"; 
}



function showOTP() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("forgotPasswordContainer").style.display = "none";
    document.getElementById("otpContainer").style.display = "block";
    document.getElementById("resetPasswordContainer").style.display = "none"; 
}

function showForgotPassword() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("forgotPasswordContainer").style.display = "block";

    // Hide recovery details and second back button initially
    document.getElementById("recoveryDetails").style.display = "none";
    document.getElementById("backButton").style.display = "none";
}

function forgotPassword() {
    const number = document.getElementById("forgotNumber").value;
    const user = users.find(u => u.number === number);
    const recoveryDetails = document.getElementById("recoveryDetails");
    const backButton = document.getElementById("backButton");

    if (user) {
        console.log("Retrieved Email:", user.username); // Debugging: Check full email
        recoveryDetails.innerHTML = 
            `<b>College Email:</b> ${user.username} <br> 
             <b>Password:</b> ${user.password}`;
        recoveryDetails.style.display = "block";
        backButton.style.display = "block"; // Show Back Button after entering a number
    } else {
        alert("Mobile number not found. Please check and try again.");
    }
}

function resetPassword() {
    const newPassword = document.getElementById("newPassword").value;
    const userIndex = users.findIndex(u => u.username === currentUsername);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        saveUsers();
        alert("Password reset successful!");
        showLogin();
    } else {
        alert("An error occurred. Please try again.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const loginPage = document.querySelector('.login-page');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? 1 : 0;
        });
    }

    function showLoginPage() {
        slides.forEach(slide => slide.style.display = 'none');
        loginPage.style.opacity = 1;
    }

    showSlide(0); // Show sky-blue initially

    setTimeout(function() {
        showSlide(1); // Show RIC text
        setTimeout(showLoginPage, 2000); // Show login page
    }, 2000); // Delay before showing RIC text
});
