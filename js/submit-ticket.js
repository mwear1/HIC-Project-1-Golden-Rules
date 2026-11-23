// Return all saved tickets.
function getTickets() {
    const savedTickets = localStorage.getItem("helpDeskTickets");

    if (savedTickets) {
        return JSON.parse(savedTickets);
    }

    return [];
}


// Save the ticket list.
function saveTickets(tickets) {
    localStorage.setItem("helpDeskTickets", JSON.stringify(tickets));
}


// Create the next ticket number.
function getNextTicketId(tickets) {
    if (tickets.length === 0) {
        return 1001;
    }

    let highestId = tickets[0].id;

    for (let ticket of tickets) {
        if (ticket.id > highestId) {
            highestId = ticket.id;
        }
    }

    return highestId + 1;
}


// Handle the Submit Ticket form.
function setupTicketForm() {
    const form = document.getElementById("ticket-form");

    // Only run if we are on the Submit Ticket page.
    if (!form) {
        return;
    }

    const errorMessage = document.getElementById("form-error");
    const successMessage = document.getElementById("ticket-success");

    form.addEventListener("submit", function(event) {
        // Prevent the page from refreshing when the form is submitted.
        event.preventDefault();

        const category = document.getElementById("category").value;
        const subject = document.getElementById("subject").value.trim();
        const priority = document.getElementById("priority").value;
        const device = document.getElementById("device").value.trim();
        const description = document.getElementById("description").value.trim();
        const submitButton = form.querySelector('button[type="submit"]');

        // Clear old feedback before checking the form again.
        errorMessage.textContent = "";

        // Validate required fields.
        if (category === "") {
            errorMessage.textContent =
                "Please select an issue category.";
            return;
        }

        if (subject === "") {
            errorMessage.textContent =
                "Please enter a subject for the ticket.";
            return;
        }

        if (description === "") {
            errorMessage.textContent =
                "Please describe the problem you are experiencing.";
            return;
        }

        // Give immediate feedback while the ticket is being submitted.
        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;

        // Allow the browser to display the progress feedback before saving.
        requestAnimationFrame(function() {
            const tickets = getTickets();

            // Create the new ticket.
            const newTicket = {
                id: getNextTicketId(tickets),
                category: category,
                subject: subject,
                priority: priority,
                description: description,
                device: device,
                status: "Open",
                dateCreated: new Date().toLocaleDateString()
            };

            // Add and save the new ticket.
            tickets.push(newTicket);
            saveTickets(tickets);

            // Reset the form after a successful submission.
            form.reset();

            // Give the user clear confirmation that the action succeeded.
            successMessage.hidden = false;
            successMessage.innerHTML =
                "<strong>Ticket submitted successfully.</strong><br>" +
                "Ticket #" + newTicket.id + " has been created." +
                "<br><br>" +
                '<a href="index.html" class="button">Return to Dashboard</a>';

            // Restore the submit button.
            submitButton.textContent = "Submit Ticket";
            submitButton.disabled = false;

            // Move the user to the confirmation message.
            successMessage.scrollIntoView();
        });
    });
}

// Show the user's current network connection status.
function showNetworkStatus(message, statusType) {
    const networkStatus = document.getElementById("network-status");

    networkStatus.textContent = message;
    networkStatus.className = "network-status " + statusType;
    networkStatus.hidden = false;
}


// Show an offline message when the connection is lost.
window.addEventListener("offline", function() {
    showNetworkStatus(
        "You are offline. Tickets will still be saved on this device.",
        "network-offline"
    );
});


// Show confirmation when the connection returns.
window.addEventListener("online", function() {
    showNetworkStatus(
        "Back online. Your network connection has been restored.",
        "network-online"
    );
});


// Check whether the page was opened while already offline.
if (!navigator.onLine) {
    showNetworkStatus(
        "You are offline. Tickets will still be saved on this device.",
        "network-offline"
    );
}



// Set up the Submit Ticket page.
setupTicketForm();
