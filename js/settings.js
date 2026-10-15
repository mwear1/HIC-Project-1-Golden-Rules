// Find the settings controls on the page.
// These IDs must match the IDs used in settings.html.
const darkModeSelect = document.querySelector("#theme");
const ticketNotificationsCheckbox = document.querySelector("#ticket-updates");
const emailNotificationsCheckbox = document.querySelector("#email-notifications");
const saveSettingsButton = document.querySelector("#save-settings");
const resetSettingsButton = document.querySelector("#reset-settings");
const settingsMessage = document.querySelector("#settings-message");

// Name used to store preferences in the browser.
const settingsStorageKey = "helpDeskSettings";

// Default preferences used when no saved settings exist.
const defaultSettings = {
    darkMode: false,
    ticketNotifications: true,
    emailNotifications: false
};

// Apply the selected theme by adding or removing a CSS class on the body.
function applyTheme(darkMode) {
    document.body.classList.toggle("dark-theme", darkMode === true);
}

// Load saved settings and apply them to the page.
function loadSettings() {
    // Start with the default settings.
    let settings = defaultSettings;

    // Retrieve previously saved preferences from local storage.
    const savedSettingsText = localStorage.getItem(settingsStorageKey);

    // Use saved preferences if they exist.
    if (savedSettingsText !== null) {
        try {
            // Combine saved values with defaults in case a setting is missing.
            settings = {
                ...defaultSettings,
                ...JSON.parse(savedSettingsText)
            };
        } catch (error) {
            // Use defaults if the saved data cannot be read.
            settings = defaultSettings;
        }
    }

    // Apply the saved theme, including on pages without the settings form.
    applyTheme(settings.darkMode);

    // Update the theme dropdown if it exists on this page.
    if (darkModeSelect !== null) {
        darkModeSelect.value = settings.darkMode ? "dark" : "light";
    }

    // Update the ticket notification checkbox if it exists.
    if (ticketNotificationsCheckbox !== null) {
        ticketNotificationsCheckbox.checked = settings.ticketNotifications;
    }

    // Update the email notification checkbox if it exists.
    if (emailNotificationsCheckbox !== null) {
        emailNotificationsCheckbox.checked = settings.emailNotifications;
    }
}

// Read the settings form and save the selected preferences.
function saveSettings() {
    // Build an object containing the current form values.
    const settings = {
        darkMode: darkModeSelect.value === "dark",
        ticketNotifications: ticketNotificationsCheckbox.checked,
        emailNotifications: emailNotificationsCheckbox.checked
    };

    // Save the preferences as a JSON string.
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings));

    // Apply the selected theme immediately.
    applyTheme(settings.darkMode);

    // Display a confirmation message if the message element exists.
    if (settingsMessage !== null) {
        settingsMessage.textContent = "Settings saved.";
    }
}

// Restore the default preferences and save them.
function resetSettings() {
    // Save the default settings to local storage.
    localStorage.setItem(
        settingsStorageKey,
        JSON.stringify(defaultSettings)
    );

    // Update the controls and theme to match the defaults.
    loadSettings();

    // Display a confirmation message.
    if (settingsMessage !== null) {
        settingsMessage.textContent = "Settings restored to defaults.";
    }
}

// Preview theme changes immediately when the dropdown changes.
if (darkModeSelect !== null) {
    darkModeSelect.addEventListener("change", function () {
        // Apply dark mode when Dark Mode is selected.
        applyTheme(darkModeSelect.value === "dark");
    });
}

// Add the save button action if the button exists on this page.
if (saveSettingsButton !== null) {
    saveSettingsButton.addEventListener("click", saveSettings);
}

// Add the reset button action if the button exists on this page.
if (resetSettingsButton !== null) {
    resetSettingsButton.addEventListener("click", resetSettings);
}

// Load saved preferences whenever a page using this script opens.
loadSettings();
