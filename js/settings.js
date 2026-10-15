<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IT Help Desk - Settings</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header>
    <div class="navbar">
        <h1>IT Help Desk</h1>
        <nav>
            <a href="index.html">Dashboard</a>
            <a href="submit-ticket.html">Submit Ticket</a>
            <a href="tickets.html">My Tickets</a>
            <a href="knowledge-base.html">Knowledge Base</a>
            <a href="troubleshoot.html">Troubleshoot</a>
            <a href="profile.html">Profile</a>
            <a href="settings.html">Settings</a>
        </nav>
    </div>
</header>

<main>
    <h2 class="page-title">Settings</h2>
    <p class="page-description">
        Customize the appearance and notification preferences of your IT Help Desk.
    </p>

    <section class="card">
        <h2>Appearance</h2>

        <div class="setting-option">
            <label for="theme">Display Theme</label>
            <p>Choose the appearance that is most comfortable for you.</p>

            <select id="theme">
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
            </select>
        </div>
    </section>

    <section class="card">
        <h2>Notifications</h2>

        <div class="setting-option">
            <label class="checkbox-label" for="ticket-updates">
                <input type="checkbox" id="ticket-updates">
                <span>Ticket Updates</span>
            </label>
            <p>Set your preference for updates about ticket progress.</p>
        </div>

        <div class="setting-option">
            <label class="checkbox-label" for="email-notifications">
                <input type="checkbox" id="email-notifications">
                <span>Email Notifications</span>
            </label>
            <p>Set your preference for email notifications.</p>
        </div>

        <p class="help-text">
            These preferences are saved in this browser. This prototype
            does not send emails or change real ticket notifications.
        </p>
    </section>

    <section class="card">
        <h2>Save Preferences</h2>
        <p>Save your choices to keep them available when you return.</p>

        <button type="button" id="save-settings">Save Settings</button>
        <button type="button" id="reset-settings"
                class="button-secondary">Restore Defaults</button>

        <p id="settings-message" role="status" aria-live="polite"></p>
    </section>
</main>

<script src="js/settings.js"></script>
</body>
</html>
