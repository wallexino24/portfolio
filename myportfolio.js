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


// ================= PROJECT SLIDERS =================

document.querySelectorAll('.project-slider').forEach(slider => {
  const track  = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const dots   = slider.querySelectorAll('.dot');
  const leftBtn  = slider.querySelector('.slider-arrow.left');
  const rightBtn = slider.querySelector('.slider-arrow.right');
  let current = 0;

  function goTo(index) {
  current = index;
  track.style.transform = `translateX(-${current * 100}%)`;

  // Update dots
  dots.forEach((d, i) => d.classList.toggle('active', i === current));

  // Show/hide arrows
  leftBtn.classList.toggle('hidden', current === 0);
  rightBtn.classList.toggle('hidden', current === slides.length - 1);

  // Toggle mobile-view class on the slider based on which slide is active
  // Assumes slide 0 = desktop, slide 1 = mobile
  slider.classList.toggle('mobile-view', current === 1);
}

  // Init — hide left arrow on load since we start at slide 0
  goTo(0);

  leftBtn.addEventListener('click',  () => { if (current > 0) goTo(current - 1); });
  rightBtn.addEventListener('click', () => { if (current < slides.length - 1) goTo(current + 1); });

  // Optional: swipe support for mobile
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  slider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50 && current < slides.length - 1) goTo(current + 1);
    if (diff < -50 && current > 0) goTo(current - 1);
  });
});


// ====== CONTACT PAGE ===== // 

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


// ---- LIGHTBOX ----
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Collect all images you want to be clickable
// Add class="lightbox-img" to any <img> tag you want to trigger the lightbox
const lightboxImages = document.querySelectorAll('.lightbox-img');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = lightboxImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.classList.add('menu-open'); // reuse scroll lock

  // Show/hide arrows
  lightboxPrev.classList.toggle('hidden', currentIndex === 0);
  lightboxNext.classList.toggle('hidden', currentIndex === lightboxImages.length - 1);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('menu-open');
}

// Attach click to each image
lightboxImages.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(index));
});

// Close on X button or clicking the dark overlay
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Arrow navigation
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent overlay click from closing
  if (currentIndex > 0) openLightbox(currentIndex - 1);
});
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentIndex < lightboxImages.length - 1) openLightbox(currentIndex + 1);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft'  && currentIndex > 0) openLightbox(currentIndex - 1);
  if (e.key === 'ArrowRight' && currentIndex < lightboxImages.length - 1) openLightbox(currentIndex + 1);
});

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


// ================= PROJECT SLIDERS =================

document.querySelectorAll('.project-slider').forEach(slider => {
  const track  = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const dots   = slider.querySelectorAll('.dot');
  const leftBtn  = slider.querySelector('.slider-arrow.left');
  const rightBtn = slider.querySelector('.slider-arrow.right');
  let current = 0;

  function goTo(index) {
  current = index;
  track.style.transform = `translateX(-${current * 100}%)`;

  // Update dots
  dots.forEach((d, i) => d.classList.toggle('active', i === current));

  // Show/hide arrows
  leftBtn.classList.toggle('hidden', current === 0);
  rightBtn.classList.toggle('hidden', current === slides.length - 1);

  // Toggle mobile-view class on the slider based on which slide is active
  // Assumes slide 0 = desktop, slide 1 = mobile
  slider.classList.toggle('mobile-view', current === 1);
}

  // Init — hide left arrow on load since we start at slide 0
  goTo(0);

  leftBtn.addEventListener('click',  () => { if (current > 0) goTo(current - 1); });
  rightBtn.addEventListener('click', () => { if (current < slides.length - 1) goTo(current + 1); });

  // Optional: swipe support for mobile
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  slider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50 && current < slides.length - 1) goTo(current + 1);
    if (diff < -50 && current > 0) goTo(current - 1);
  });
});


// ====== CONTACT PAGE ===== // 

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



