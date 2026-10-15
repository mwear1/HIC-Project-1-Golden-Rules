// Find the settings controls on the page.
// Some pages include this script only to apply the saved theme.
const darkModeCheckbox = document.querySelector("#dark-mode");
const ticketNotificationsCheckbox = document.querySelector("#ticket-notifications");
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
    if (darkMode === true) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}

// Load saved settings and apply them to the page.
function loadSettings() {
    const savedSettingsText = localStorage.getItem(settingsStorageKey);

    // Start with the defaults unless the user has saved preferences.
    let settings = defaultSettings;

    if (savedSettingsText !== null) {
        settings = JSON.parse(savedSettingsText);
    }

    // Apply the saved theme even on pages without the settings form.
    applyTheme(settings.darkMode);

    // Only update form controls if this page contains them.
    if (darkModeCheckbox !== null) {
        darkModeCheckbox.checked = settings.darkMode;
    }

    if (ticketNotificationsCheckbox !== null) {
        ticketNotificationsCheckbox.checked =
            settings.ticketNotifications;
    }

    if (emailNotificationsCheckbox !== null) {
        emailNotificationsCheckbox.checked =
            settings.emailNotifications;
    }
}

// Read the settings form and store the selected preferences.
function saveSettings() {
    const settings = {
        darkMode: darkModeCheckbox.checked,
        ticketNotifications: ticketNotificationsCheckbox.checked,
        emailNotifications: emailNotificationsCheckbox.checked
    };

    // Store the preferences as a JSON string.
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings));

    // Update the page theme immediately.
    applyTheme(settings.darkMode);

    settingsMessage.textContent = "Settings saved.";
}

// Restore the default preferences and save them.
function resetSettings() {
    // Save a separate object with the default values.
    localStorage.setItem(
        settingsStorageKey,
        JSON.stringify(defaultSettings)
    );

    // Update the controls and theme to match the defaults.
    loadSettings();

    if (settingsMessage !== null) {
        settingsMessage.textContent = "Settings restored to defaults.";
    }
}

// If the dark mode checkbox exists, preview theme changes immediately.
if (darkModeCheckbox !== null) {
    darkModeCheckbox.addEventListener("change", function () {
        applyTheme(darkModeCheckbox.checked);
    });
}

// Add the save/reset button actions only on the Settings page.
if (saveSettingsButton !== null) {
    saveSettingsButton.addEventListener("click", saveSettings);
}

if (resetSettingsButton !== null) {
    resetSettingsButton.addEventListener("click", resetSettings);
}

// Load saved preferences whenever a page using this script opens.
loadSettings();
