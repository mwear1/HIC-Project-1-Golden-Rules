# HIC Project 1 - Golden Rules: IT Help Desk

## Project Description

The goal of the project is to demonstrate the Eight Golden Rules of Interface Design through a functional IT Help Desk web application.

The application provides users with a simple interface for requesting technical support, reviewing submitted tickets, finding self-service help, troubleshooting common IT problems, managing profile information, and changing application preferences.

The application was built using HTML, CSS, and JavaScript. Browser localStorage is used to save ticket information, profile information, and user settings without requiring a backend database.

## Application Pages

The application contains seven main pages:

- **Dashboard** - Displays open and resolved ticket counts, recent tickets, and quick links to common Help Desk functions.
- **Submit Ticket** - Allows users to submit IT support requests with validation and confirmation feedback.
- **My Tickets** - Displays previously submitted support tickets and their current information.
- **Knowledge Base** - Allows users to search and filter self-service IT help articles.
- **Troubleshoot** - Guides users through troubleshooting common IT problems.
- **Profile** - Allows users to save and edit basic profile and contact information.
- **Settings** - Allows users to manage application preferences, including display theme and notification settings.

The pages share a consistent navigation system and visual design. The application also supports a light and dark display theme.

## Group Members and Contributions

### Matthew Wear
- Dashboard page
- Submit Ticket page
- Initial project structure and shared application setup
- GitHub repository setup and project collaboration setup
- Ticket storage and Dashboard integration using localStorage
- Form validation and ticket submission functionality
- Integration testing and debugging
- Bug fixes across shared functionality and maintaining consistency across pages

### Josh Hillwig
- Knowledge Base page
- Knowledge Base search and filtering functionality
- Profile page
- Profile saving and undo functionality
- Settings page
- Application preference storage
- Light/Dark theme functionality

### Henry Cambell
- My Tickets page
- Ticket display functionality
- Troubleshoot page
- Troubleshooting interactions and functionality

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser localStorage
- GitHub / GitHub Pages

## Running the Application

The application can be opened through the project's GitHub Pages site or run locally.

Direct Link: https://mwear1.github.io/HIC-Project-1-Golden-Rules/

To run it locally:

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using Live Server.
4. Navigate between pages using the shared navigation bar.

Because the project uses browser localStorage, saved tickets, profile information, and settings are stored separately in each user's browser.
