window.onload = function(){
    const isLoggedIn = localStorage.getItem("token");
    if(isLoggedIn)
    {
        window.location.href = "dashboard.html";
    }
}

function toggleAuth(){
    const loginCard = document.querySelector(`#login_card`);
    const signupCard = document.querySelector(`#signup_card`);
    loginCard.style.display = loginCard.style.display === "none" ? "flex" : "none";
    signupCard.style.display = signupCard.style.display === "none" ? "flex" : "none";
}


//Login form
const loginform = document.querySelector("#loginForm");
if(loginform){
    loginform.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const email = document.querySelector(`input[type="email"]`).value;
        const password = document.querySelector(`input[type="password"]`).value;

        try {
            const response = await fetch('http://localhost:3000/api/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if(data.success){
                alert("Login successful! Welcome, " + data.admin.fullname);
                localStorage.setItem("adminData", JSON.stringify(data.admin));
                localStorage.setItem("token", "true");
                window.location.href = "dashboard.html"; 
            } else {
                alert("Invalid credentials: " + data.message);
            }
        }catch(err){
            console.error("Login Error:", err);
            alert("An error occurred during login. Please try again.");
        }
    })
}

//Signup form
const signupForm = document.querySelector("#signupForm");
if(signupForm){
    signupForm.addEventListener("submit", (ev)=>{
        ev.preventDefault();
        signUp();
    });
}

async function signUp(){
    const fullname = document.querySelector(`input[name="full_name"]`).value;
    const email = document.querySelector(`input[name="reg_email"]`).value;
    const password = document.querySelector(`input[name="reg_password"]`).value;
    const role = document.querySelector(`select[name="role"]`).value;
    
    const val = {fullname, email, password, role};

    try{
        const response = await fetch('http://localhost:3000/api/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });

        const result = await response.json()

        if (response.ok) {
            alert(`Welcome! Your generated Admin ID is: ${result.newAdminId}`);
            toggleAuth(); // Switch to login form after successful registration
        }else {
            alert(`Error: Hello${result.error}`);
        }
    }catch(err){
        console.error("Signup Error:", err);
        alert("An error occurred during signup. Please try again.");
    }
}