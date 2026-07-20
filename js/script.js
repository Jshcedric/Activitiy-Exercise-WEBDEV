// ===== Portfolio card interactions =====
const projectCards = document.querySelectorAll(".project-card");

function toggleSelectedCard(selectedCard) {
    const wasSelected = selectedCard.classList.contains("is-selected");

    // Keep only one project selected at a time.
    projectCards.forEach((card) => {
        card.classList.remove("is-selected");
    });

    // Clicking the selected card again removes the selected state.
    if (!wasSelected) {
        selectedCard.classList.add("is-selected");
    }
}

projectCards.forEach((card) => {
    card.addEventListener("click", () => {
        toggleSelectedCard(card);
    });

    // Allow keyboard users to select a card with Enter or Space.
    card.addEventListener("keydown", (event) => {
        if (event.target !== card) {
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleSelectedCard(card);
        }
    });
});

// ===== Contact form validation =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const emailField = document.getElementById("email");
        const email = emailField.value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Check if any field is empty.
        if (
            fullName === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate Gmail address.
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
}
