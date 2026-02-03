const form = document.getElementById("contactForm");
const label = document.getElementsByTagName("label");


form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  const fields = ["name", "email", "message"];

  fields.forEach((id) => {
    const input = document.getElementById(id);
    const group = input.parentElement;
    const error = group.querySelector(".error-msg");

    group.classList.remove("error");
    error.textContent = "";

    if (!input.value.trim()) {
      error.textContent = "This field is required";
      group.classList.add("error");
      isValid = false;
    }

    if (id === "name" && input.value) {
      const nameRegex = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
      if (!nameRegex.test(input.value)){
        error.textContent = "Sorry, only letters (a-z), (A-Z) and spaces are allowed "
        group.classList.add("error");
        isValid = false;
      }
      
      if (input.value.trim().length < 2) {
        error.textContent = "Name length must be atleast 2 letters";
        group.classList.add("error");
        isValid = false;
      }
    }

    if (id === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        error.textContent = "Enter a valid email address";
        group.classList.add("error");
        isValid = false;
      }
    }

    if (id === "message" && input.value) {

      if (input.value.trim().length < 5){
        error.textContent = "Minimum 5 characters required.";
        group.classList.add("error");
        isValid = false;
      }

      if (input.value.trim().length > 250){
        error.textContent = "Maximum 250 characters allowed.";
        group.classList.add("error");
        isValid = false;
      }
    }
  });

  if (isValid) {
    form.reset();
    msgCharCount.textContent = "0";
    Toastify({
      text: "Message sent successfully",
      duration: 3000,
      gravity: "top",
      position: "center",
      close: true,
      stopOnFocus: true,
      style: {
        background: "linear-gradient(135deg, #00ade4, #0378d5)",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      },
      offset: {
        x: 50,
        y: 120
      }
    }).showToast();
  }
});


const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {

  input.addEventListener("focus", () => {
    const group = input.parentElement;

    group.classList.remove("error")
  });


  input.addEventListener("blur", () => { 
    let isValid = true;

     if (!input.value.trim()) {
      error.textContent = "This field is required";
      group.classList.add("error");
      isValid = false;
    }

    if (input.id && input.value) {

      const element = document.getElementById(input.id);
      const group = element.parentElement;
      const error = group.querySelector(".error-msg");

      if (input.id === "email") {
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          error.textContent = "Enter a valid email address";
          group.classList.add("error");
          isValid = false;
        }
      }

      if (input.id === "name") {

        const nameRegex = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
        if (!nameRegex.test(input.value)){
          error.textContent = "Sorry, only letters (a-z), (A-Z) and spaces are allowed "
          group.classList.add("error");
          isValid = false;
        }
        
        if (input.value.trim().length < 2) {
          error.textContent = "Name length must be atleast 2 letters";
          group.classList.add("error");
          isValid = false;
        }
      }

      if (input.id === "message") {

        if (input.value.trim().length < 5){
          error.textContent = "Minimum 5 characters required.";
          group.classList.add("error");
          isValid = false;
        }

        if (input.value.trim().length > 250){
          error.textContent = "Maximum 250 characters allowed.";
          group.classList.add("error");
          isValid = false;
        }
      }
    }
  })
});


const contactMsg = document.getElementById("message");
const msgCharCount = document.getElementById("msgCharCount");

contactMsg.addEventListener("input", (e) => {
  const len = e.target.value.trim().length;
  msgCharCount.textContent = len;
  msgCharCount.style.color = len > 250 ? "red" : "green"
})

