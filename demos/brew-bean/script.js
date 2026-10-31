
// =================================
// BREW & BEAN JAVASCRIPT
// =================================


// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});


// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// PREVENT PAST RESERVATION DATES

const dateInput = document.getElementById("reservation-date");

const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// RESERVATION FORM

const reservationForm =
  document.getElementById("reservation-form");

const formStatus =
  document.getElementById("form-status");

reservationForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!reservationForm.reportValidity()) {
    return;
  }

  const formData = new FormData(reservationForm);

  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date");
  const time = formData.get("time");
  const guests = formData.get("guests");
  const request = formData.get("request") || "None";

  const subject = encodeURIComponent(
    `Reservation inquiry from ${name}`
  );

  const body = encodeURIComponent(
    `Hello Brew & Bean!\n\n` +
    `I would like to inquire about a reservation.\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Preferred date: ${date}\n` +
    `Preferred time: ${time}\n` +
    `Number of guests: ${guests}\n` +
    `Special requests: ${request}\n\n` +
    `Thank you!`
  );

  // Replace this with a real business email
  // before using this form for an actual business.

  const businessEmail = "hello@brewandbean.example";

  const emailLink =
    `mailto:${businessEmail}?subject=${subject}&body=${body}`;

  formStatus.textContent =
    "Opening your email application...";

  window.location.href = emailLink;

  reservationForm.reset();
  dateInput.min = localToday;
});
