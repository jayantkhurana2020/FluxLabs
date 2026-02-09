const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const backBtns = document.querySelectorAll(".back-btn");
const form = document.getElementById("form-wizard");
const submitBtn = document.querySelector(".submit-btn");

let formStepIndex = 0;

function validateStep(index) {
  const step = steps[index];
  const inputs = step.querySelectorAll("input[required]");
  let isValid = true;

  inputs.forEach(input => {
    const group = input.parentElement;
    const error = input.nextElementSibling;

    // reset
    error.textContent = "";
    group.classList.remove("error");

    // required check
    if (!input.value.trim()) {
      error.textContent = "This field is required";
      group.classList.add("error");
      isValid = false;
      return;
    }

    // email
    if (input.id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        error.textContent = "Enter a valid email address";
        group.classList.add("error");
        isValid = false;
      }
    }

    // name
    if (input.id === "firstName" || input.id === "lastName") {
      if (input.value.trim().length < 2) {
        error.textContent = "Must be at least 2 letters";
        group.classList.add("error");
        isValid = false;
      }

      const nameRegex = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
      if (!nameRegex.test(input.value)) {
        error.textContent =
          "Only letters and spaces are allowed";
        group.classList.add("error");
        isValid = false;
      }
    }

    // phone
    if (input.id === "phone") {
      const phoneRegex = /^\+?\d{10}$/;
      if (!phoneRegex.test(input.value)) {
        error.textContent = "Enter a valid phone number";
        group.classList.add("error");
        isValid = false;
      }
    }

    // password
    if (input.id === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (!passwordRegex.test(input.value)) {
        error.textContent =
          "Min 8 chars, uppercase, lowercase, number & special char";
        group.classList.add("error");
        isValid = false;
      }
    }

    // confirm password
    if (input.id === "confirmPassword") {
      const password = document.getElementById("password").value;
      if (input.value !== password) {
        error.textContent = "Passwords do not match";
        group.classList.add("error");
        isValid = false;
      }
    }
  });

  return isValid;
}



function updateFormSteps() {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === formStepIndex)
    })
}


// Handle next button click 
nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (validateStep(formStepIndex)) {
            formStepIndex++;
            updateFormSteps();
        }
    });
});

// Handle back button click 
backBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepIndex--;
        updateFormSteps();
        
    });
});

submitBtn.addEventListener("click", () => {

    if (!validateStep(formStepIndex)) return;

    form.reset();
    formStepIndex = 0;
    updateFormSteps();

    Toastify({
      text: "Successfully Signed Up ",
      duration: 3000,
      gravity: "top",
      position: "center",
      close: true,
      stopOnFocus: true,
      style: {
        background: "linear-gradient(135deg, #00e441, #03d514)",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      },
      offset: {
        y: 120
      }
    }).showToast();


});


//for initial display
updateFormSteps();

