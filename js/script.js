// ===== Portfolio card interactions =====
const projectCards = document.querySelectorAll(".project-card");
const portfolioSection = document.getElementById("portfolio");
const projectModals = document.querySelectorAll(".project-modal");

function resetPortfolioState() {
    // Restore the portfolio section to its default background color.
    if (portfolioSection) {
        portfolioSection.style.backgroundColor = "";
    }

    // Remove the selected appearance from every project card.
    projectCards.forEach((card) => {
        card.classList.remove("is-selected");
        card.setAttribute("aria-pressed", "false");
    });
}

function toggleSelectedCard(selectedCard) {
    const wasSelected = selectedCard.classList.contains("is-selected");

    // Keep only one project selected at a time.
    projectCards.forEach((card) => {
        card.classList.remove("is-selected");
        card.setAttribute("aria-pressed", "false");
    });

    // Clicking the selected card again returns the portfolio to default.
    if (wasSelected) {
        if (portfolioSection) {
            portfolioSection.style.backgroundColor = "";
        }
        return;
    }

    selectedCard.classList.add("is-selected");
    selectedCard.setAttribute("aria-pressed", "true");

    // Change the portfolio background using the card's data-color value.
    const selectedColor = selectedCard.dataset.color;

    if (portfolioSection && selectedColor) {
        portfolioSection.style.backgroundColor = selectedColor;
    }
}

projectCards.forEach((card) => {
    card.setAttribute("aria-pressed", "false");

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

// Reset the portfolio background after any project modal is closed.
projectModals.forEach((modal) => {
    modal.addEventListener("hidden.bs.modal", resetPortfolioState);
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