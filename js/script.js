// ============================================================
// FEATURE 4: Portfolio Card Click + Background Color Change
// ============================================================

// Grab all the project cards (Money Converter, World Clock, Todo List Student)
const projectCards = document.querySelectorAll(".project-card");

// Grab the whole Portfolio section (this is what changes background color)
const portfolioSection = document.getElementById("portfolio");

// Grab all three Bootstrap modals (popup boxes for "View Details")
const projectModals = document.querySelectorAll(".project-modal");

// ---- Helper function: resets everything back to default ----
// This runs when a modal is closed, so the highlight/color doesn't stay stuck.
function resetPortfolioState() {
    // Remove the background color from the Portfolio section
    if (portfolioSection) {
        portfolioSection.style.backgroundColor = "";
    }

    // Remove the "selected" look from every card (border/background highlight)
    projectCards.forEach((card) => {
        card.classList.remove("is-selected");
        card.setAttribute("aria-pressed", "false"); // for accessibility (screen readers)
    });
}

// ---- Helper function: handles what happens when a card is clicked ----
function toggleSelectedCard(selectedCard) {
    // Check if this card was ALREADY selected before this click
    const wasSelected = selectedCard.classList.contains("is-selected");

    // First, un-select every card (so only one card can be active at a time)
    projectCards.forEach((card) => {
        card.classList.remove("is-selected");
        card.setAttribute("aria-pressed", "false");
    });

    // If the user clicked the SAME card that was already selected,
    // treat it like an "undo" — reset background to default and stop here.
    if (wasSelected) {
        if (portfolioSection) {
            portfolioSection.style.backgroundColor = "";
        }
        return;
    }

    // Otherwise, mark this card as the new selected one
    selectedCard.classList.add("is-selected");
    selectedCard.setAttribute("aria-pressed", "true");

    // Read the custom color assigned to this card (set in HTML as data-color="#FFF3B0" etc.)
    const selectedColor = selectedCard.dataset.color;

    // Apply that color to the Portfolio section's background
    if (portfolioSection && selectedColor) {
        portfolioSection.style.backgroundColor = selectedColor;
    }
}

// ---- Attach click + keyboard events to every project card ----
projectCards.forEach((card) => {
    // Set the starting accessibility state
    card.setAttribute("aria-pressed", "false");

    // When a card is clicked with the mouse, run toggleSelectedCard()
    card.addEventListener("click", () => {
        toggleSelectedCard(card);
    });

    // Allow keyboard users (Tab + Enter/Space) to "click" a card too
    card.addEventListener("keydown", (event) => {
        // Make sure the key press happened directly on the card,
        // not on a child element like the button inside it
        if (event.target !== card) {
            return;
        }

        // Enter or Spacebar acts like a mouse click
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // stop page from scrolling on Spacebar
            toggleSelectedCard(card);
        }
    });
});

// ---- Reset everything once a modal popup is closed ----
// "hidden.bs.modal" is a built-in Bootstrap event that fires after a modal fully closes
projectModals.forEach((modal) => {
    modal.addEventListener("hidden.bs.modal", resetPortfolioState);
});


// ============================================================
// FEATURE 1, 2 & 3: Contact Form Validation
// ============================================================

// Grab the contact form element
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    // Listen for when the user clicks "Submit"
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop the page from refreshing (default form behavior)

        // Get the current values typed into each field, trimming extra spaces
        const fullName = document.getElementById("fullName").value.trim();
        const emailField = document.getElementById("email");
        const email = emailField.value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // ----- FEATURE 1: Required Field Check -----
        // If any field is left empty, stop and alert the user
        if (
            fullName === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {
            alert("Please fill in all required fields.");
            return; // Stop here — do not continue to email check or submission
        }

        // ----- FEATURE 2: Gmail Format Validation -----
        // This regex pattern only accepts emails ending in @gmail.com
        // Example match: john123@gmail.com
        // Example non-match: john123@yahoo.com, john123@gmail,com, johngmail.com
        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!gmailPattern.test(email)) {
            emailField.classList.add("is-invalid"); // Turns the input box red (Bootstrap style)
            alert("Please enter a valid Gmail address (example@gmail.com).");
            return; // Stop here — do not submit yet
        }

        // If email passed validation, remove any leftover red/error styling
        emailField.classList.remove("is-invalid");

        // ----- FEATURE 3: Successful Submission -----
        // If we reach this point, all checks passed
        alert("Thank you! Your message has been submitted successfully.");

        // Clear all form fields back to empty/default after user clicks OK
        contactForm.reset();
    });
}