const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const emailField = document.getElementById("email");
    const email = emailField.value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check if any field is empty
    if (
        fullName === "" ||
        email === "" ||
        subject === "" ||
        message === ""
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate Gmail
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailPattern.test(email)) {
        emailField.classList.add("is-invalid");
        alert("Please enter a valid Gmail address (example@gmail.com).");
        return;
    }

    emailField.classList.remove("is-invalid");

    alert("Thank you! Your message has been submitted successfully.");
    contactForm.reset();
});