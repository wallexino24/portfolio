(function () {
  emailjs.init("h0ekK-33aRgPNd1SX");
})();

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


const openBtn = document.querySelector(".open-modal");
const closeBtn = document.querySelector(".close-modal");
const overlay = document.querySelector(".modal-overlay");

function openModal() {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", function(e) {
  if (e.target === overlay) {
    closeModal();
  }
});

  document.addEventListener("keydown", function(e) {
    if (e.key === "escape") {
      closeModal();
    }
  });


  // for contact form //
   const form = document.querySelector(".contact-form");
   const message = document.querySelector(".message");
   
   const nameInput = document.getElementById("name");
   const emailInput = document.getElementById("email");

   const nameError = document.querySelector(".name-error");
   const emailError = document.querySelector(".email-error");

   function isValidEmail(email) {
     return email.includes("@") && email.includes(".");
   }

  nameInput.addEventListener("input", function() {
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required";
      nameInput.classList.add("error");
    } else {
      nameError.textContent = "";
      nameInput.classList.remove("error");
      nameInput.classList.add("success");
    }
    });

  emailInput.addEventListener("input", function() {
    if (!isValidEmail(emailInput.value)) {
      emailError.textContent = "Enter a valid email";
      emailError.style.color = "red";
      emailInput.classList.add("error");
    } else {
      emailError.textContent = "✓";
      emailError.style.color = "green";
      emailInput.classList.remove("error");
      emailInput.classList.add("success");
    }
  });


  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = document.getElementById("message").value.trim();

    let isValid = true;

    if (name === "") {
      nameError.textContent = "Name is required";
      name.classList.add("error");
      isValid = false;
    }

    if (!isValidEmail(email)) {
      emailError.textContent = "Enter a valid email";
      email.classList.add("error");
      isValid = false;
    }

    if (msg === "") {
      message.textContent = "Please fill all feilds";
      isValid = false;
    }

    if (!isValid) return;

    emailjs.send("service_wd8x0u4", "template_7nzj65a", {
      name: name,
      email: email,
      message: msg
    })

    .then(function () {
      message.textContent = "message successfully sent!";
      emailError.textContent = "";
      form.reset();
  })

  .catch(function(error) {
    console.log(error);
    alert("Failed to send, Please try aagin");
  });
});



