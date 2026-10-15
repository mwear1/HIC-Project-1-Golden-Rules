// Find the settings controls on the page.
// These elements exist only on settings.html.
const darkModeSelect = document.querySelector("#theme");
const ticketNotificationsCheckbox =
    document.querySelector("#ticket-updates");
const emailNotificationsCheckbox =
    document.querySelector("#email-notifications");
const saveSettingsButton = document.querySelector("#save-settings");
const resetSettingsButton = document.querySelector("#reset-settings");
const settingsMessage = document.querySelector("#settings-message");

// Key used to save settings in this browser.
const settingsStorageKey = "helpDeskSettings";

// Default preferences used when no saved settings exist.
const defaultSettings = {
    darkMode: false,
    ticketNotifications: true,
    emailNotifications: false
};

// Apply or remove dark mode on the current page.
function applyTheme(darkMode) {
    document.body.classList.toggle("dark-theme", darkMode === true);
}

// Load saved preferences and apply them to the current page.
function loadSettings() {
    // Start with a copy of the default settings.
    let settings = { ...defaultSettings };

    // Read saved preferences from local storage.
    try {
        const savedSettingsText =
            localStorage.getItem(settingsStorageKey);

        if (savedSettingsText !== null) {
            // Keep defaults for any values missing from saved settings.
            settings = {
                ...defaultSettings,
                ...JSON.parse(savedSettingsText)
            };
        }
    } catch (error) {
        // Use default settings if saved preferences cannot be read.
        settings = { ...defaultSettings };
    }

    // Apply the saved theme on every page using this script.
    applyTheme(settings.darkMode);

    // Update the settings controls if they exist on this page.
    if (darkModeSelect !== null) {
        darkModeSelect.value = settings.darkMode ? "dark" : "light";
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

// Save the current settings form values.
function saveSettings() {
    // Read the form controls and create the preferences object.
    const settings = {
        darkMode: darkModeSelect.value === "dark",
        ticketNotifications: ticketNotificationsCheckbox.checked,
        emailNotifications: emailNotificationsCheckbox.checked
    };

    // Save preferences in the browser.
    try {
        localStorage.setItem(
            settingsStorageKey,
            JSON.stringify(settings)
        );
    } catch (error) {
        if (settingsMessage !== null) {
            settingsMessage.textContent =
                "Could not save settings in this browser.";
        }
        return;
    }

    // Apply the chosen theme immediately.
    applyTheme(settings.darkMode);

    // Show confirmation.
    if (settingsMessage !== null) {
        settingsMessage.textContent = "Settings saved.";
    }
}

// Restore the default settings.
function resetSettings() {
    // Save the defaults so they remain active on future visits.
    try {
        localStorage.setItem(
            settingsStorageKey,
            JSON.stringify(defaultSettings)
        );
    } catch (error) {
        if (settingsMessage !== null) {
            settingsMessage.textContent =
                "Could not save the default settings.";
        }
        return;
    }

    // Update the theme and controls.
    loadSettings();

    if (settingsMessage !== null) {
        settingsMessage.textContent =
            "Settings restored to defaults.";
    }
}

// Preview theme changes immediately when the dropdown changes.
if (darkModeSelect !== null) {
    darkModeSelect.addEventListener("change", function () {
        applyTheme(darkModeSelect.value === "dark");
    });
}

// Connect the save and reset buttons on the Settings page.
if (saveSettingsButton !== null) {
    saveSettingsButton.addEventListener("click", saveSettings);
}

if (resetSettingsButton !== null) {
    resetSettingsButton.addEventListener("click", resetSettings);
}

// Apply saved preferences when this script loads.
loadSettings();
