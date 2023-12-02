const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-container.sign-up form");
  
  loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); 
      
      const playerName = document.querySelector(".form-container.sign-up input[type='text']").value;
      if (playerName.trim() !== "") {
        localStorage.setItem("playerName", playerName);

        window.location.href = "info.html?name=" + encodeURIComponent(playerName);
      } else {
          alert("Please enter your name");
      }
  });
});
