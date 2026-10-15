// Identify the profile form and its fields.
const profileForm = document.querySelector("#profile-form");
const nameField = document.querySelector("#profile-name");
const emailField = document.querySelector("#profile-email");
const departmentField = document.querySelector("#profile-department");
const phoneField = document.querySelector("#profile-phone");
const undoButton = document.querySelector("#undo-profile");
const profileMessage = document.querySelector("#profile-message");

// This key is the name used to store profile information in localStorage.
const profileStorageKey = "helpDeskProfile";

// Read the saved profile from the browser.
function loadProfile() {
    const savedProfile = localStorage.getItem(profileStorageKey);

    // If a profile was saved before, fill in the form with its values.
    if (savedProfile !== null) {
        const profile = JSON.parse(savedProfile);

        nameField.value = profile.name || "";
        emailField.value = profile.email || "";
        departmentField.value = profile.department || "";
        phoneField.value = profile.phone || "";
    }
}

// Save the current form values to localStorage.
function saveProfile() {
    const profile = {
        name: nameField.value,
        email: emailField.value,
        department: departmentField.value,
        phone: phoneField.value
    };

    // Convert the profile object to text because localStorage stores strings.
    localStorage.setItem(profileStorageKey, JSON.stringify(profile));

    // Tell the user the save action completed.
    profileMessage.textContent = "Profile saved.";
}

// When the form is submitted, save it instead of refreshing the page.
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // The browser checks required fields and email format before submission.
    saveProfile();
});

// Undo unsaved edits by reloading the last saved profile.
undoButton.addEventListener("click", function () {
    loadProfile();
    profileMessage.textContent = "Changes undone.";
});

// Fill the form with saved values when the page opens.
loadProfile();
