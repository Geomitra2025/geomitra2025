document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        alert("Please log in first!");
        window.location.href = "MAIN.HTML"; // Redirect if no user is found
    }
});

// Function to toggle sidebar visibility
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-250px"; // Hide Sidebar
    } else {
        sidebar.style.right = "0px"; // Show Sidebar
    }
}

// Function to load the profile page inside the sidebar
function loadProfile() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        alert("Please log in first!");
        window.location.href = "MAIN.HTML";
        return;
    }

    document.getElementById("sidebar-content").innerHTML = `
        <button class="back-btn" onclick="loadMenu()">⬅ Back</button>
        <div class="profile-card">
            <div class="profile-logo" id="profileLogo">${user.name.charAt(0).toUpperCase()}</div>
            <h2 id="profileName">${user.name}</h2>
            <p><strong>Email:</strong> <span id="profileEmail">${user.username}</span></p>
            <p><strong>Mobile:</strong> <span id="profileNumber">${user.number}</span></p>
            <p><strong>Password:</strong> 
                <span id="profilePassword">***</span>
                <button class="eye-btn" onclick="togglePassword()">👁</button>
                <button class="change-password-btn" onclick="changePassword()">Change</button>
            </p>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
    `;
}

// Function to toggle password visibility
function togglePassword() {
    let passwordSpan = document.getElementById("profilePassword");
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (passwordSpan.textContent === "***") {
        passwordSpan.textContent = user.password;
    } else {
        passwordSpan.textContent = "***";
    }
}

// Function to change password
function changePassword() {
    let newPassword = prompt("Enter your new password:");
    if (newPassword) {
        let user = JSON.parse(localStorage.getItem("loggedInUser"));
        user.password = newPassword;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Password updated successfully!");
    }
}

// Function to log out
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out!");
    window.location.href = "MAIN.HTML";
}

// Function to load the menu
function loadMenu() {
    document.getElementById("sidebar-content").innerHTML = `
        <ul>
            <li><a href="#" onclick="loadProfile()">Profile</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        </ul>
    `;
}
/* Profile Pop-up */
.popup {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1001;
}

.popup-content {
    text-align: center;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
}
