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

function testFunction(){
    return "test text lmao";
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

    // Only run this code if we are on the Submit Ticket page.
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

        // Move the user to the confirmation message.
        successMessage.scrollIntoView();
    });
}


// Update dashboard information.
function loadDashboard() {
    const openCount = document.getElementById("open-count");
    const resolvedCount = document.getElementById("resolved-count");
    const recentTickets = document.getElementById("recent-tickets");

    // Only run this code if we are on the Dashboard.
    if (!openCount || !resolvedCount || !recentTickets) {
        return;
    }

    const tickets = getTickets();

    let open = 0;
    let resolved = 0;

    for (let ticket of tickets) {
        if (ticket.status === "Open") {
            open++;
        } else if (ticket.status === "Resolved") {
            resolved++;
        }
    }

    openCount.textContent = open;
    resolvedCount.textContent = resolved;

    if (tickets.length === 0) {
        recentTickets.innerHTML =
            "<p>You have not submitted any tickets yet.</p>";
        return;
    }

    recentTickets.innerHTML = "";

    const recent = tickets.slice(-3).reverse();

    for (let ticket of recent) {
        const item = document.createElement("p");

        item.textContent =
            "#" + ticket.id +
            " - " + ticket.subject +
            " - " + ticket.status;

        recentTickets.appendChild(item);
    }
}

function showTickets(){
    const tickets = getTickets();
    const list = document.getElementById("ticketList");

    // Only run this code if we are on the My Tickets page.
    if (!list) {
        return;
    }

    for (let i = 0; i < tickets.length; i++) {
        const ticketEntry = document.createElement("div");
        const ticketHeader = document.createElement("h3");
        ticketHeader.innerText = "ID: " + tickets[i].id;
        ticketEntry.appendChild(ticketHeader);

        const li1 = document.createElement("li");
        li1.innerText = "Category: " + tickets[i].category;
        ticketEntry.appendChild(li1);

        const li2 = document.createElement("li");
        li2.innerText = "Subject: " + tickets[i].subject;
        ticketEntry.appendChild(li2);

        const li3 = document.createElement("li");
        li3.innerText = "Priority: " + tickets[i].priority;
        ticketEntry.appendChild(li3);

        const li4 = document.createElement("li");
        li4.innerText = "Description: " + tickets[i].description;
        ticketEntry.appendChild(li4);

        const li5 = document.createElement("li");
        li5.innerText = "Device: " + tickets[i].device;
        ticketEntry.appendChild(li5);

        const li6 = document.createElement("li");
        li6.innerText = "Status: " + tickets[i].status;
        ticketEntry.appendChild(li6);

        const li7 = document.createElement("li");
        li7.innerText = "Date created: " + tickets[i].dateCreated;
        ticketEntry.appendChild(li7);
        
        list.appendChild(ticketEntry);
    }
}

//Creates fake ticket data to test tickets.html, since the browser I used would not save the ticket for whatever reason
/*function testTickets(){
    const list = document.getElementById("ticketList");

    const ticketEntry = document.createElement("div");
    const ticketHeader = document.createElement("h3");
    ticketHeader.innerText = "ID: 00000";
    ticketEntry.appendChild(ticketHeader);

    const li1 = document.createElement("li");
    li1.innerText = "Category: -testtesttest-";
    ticketEntry.appendChild(li1);

    const li2 = document.createElement("li");
    li2.innerText = "Subject: -testtesttest-";
    ticketEntry.appendChild(li2);

    const li3 = document.createElement("li");
    li3.innerText = "Priority: -testtesttest-";
    ticketEntry.appendChild(li3);

    const li4 = document.createElement("li");
    li4.innerText = "Description: -testtesttest-";
    ticketEntry.appendChild(li4);

    const li5 = document.createElement("li");
    li5.innerText = "Device: -testtesttest-";
    ticketEntry.appendChild(li5);

    const li6 = document.createElement("li");
    li6.innerText = "Status: -testtesttest-";
    ticketEntry.appendChild(li6);

    const li7 = document.createElement("li");
    li7.innerText = "Date created: -testtesttest-";
    ticketEntry.appendChild(li7);
    
    list.appendChild(ticketEntry);
}*/

// Run the appropriate functions for the current page.
setupTicketForm();
loadDashboard();
showTickets();
//testTickets();

// document.getElementById("ticketDisplay").innerHTML = 