This application is a virtual tour guide to museums whose themes are exhibits and technology settings. It offers the following set of functionalities:

     • Visitor login and registration
     • Overview of existing museum settings and their exhibits
     • Add desired exhibits to the tour planner
     • Create and modify tours from the planner 
     • Cancellation of scheduled tours
     • Remove canceled tours from the planner
     • Edit the user profile, which includes records of favorite types of settings and exhibits
     • Talk to a smart agent to get information about settings and exhibits based on their categories/types, names and descriptions.

This application is a prototype, so it has only a front-end implemented in the Angular v12.1.4 framework, while the backend is simulated using a NodeJS server and the data is stored in JSON format. The application is implemented in MVC architecture and has the following structure:
     1. Modules
         • App - Root module of each Angular project, it calls all other modules and components used in the project
         • Material - Angular Material module that imports all necessary materials from the
@angular/material package.
         • Router - The module responsible for routing, ie. navigating through the pages (components) of the application.
         • Planner - A specially designed module that manages the Component Planner, it was separated due to the use of "CalendarMonthViewComponent" which contains a class for working with the calendar that is different from the built-in (used in the App) module, thus resolving the conflict.
      2. Components
         • App - Root component of the application, which also contains a navigation toolbar.
         • Login - Responsible for forwarding login parameters.
         • Registration - Responsible for registering new visitors.
         • Profile - Responsible for displaying and modifying visitor data.
         • Exhibitions - Responsible for displaying both settings and exhibits. It also contains the logic for creating new tours in the planner.
         • Planner - Responsible for viewing and editing tours.
      3. Models
         • Exhibit - Contains an interface for displaying exhibits.
         • Exhibition - Contains an interface for displaying settings.
         • PlannerInstance - Contains an interface for displaying the planner tour.
         • Review - Contains an interface for displaying reviews of exhibits of completed tours.
         • Tour - Contains a tour display interface.
         • Visitor - Contains an interface for displaying visitor data.
     4. Services
         • Crypto - A service that provides AES password encryption service.
         • Exhibition - A service that provides information on exhibit settings and reviews.
         • Login - A service that communicates with the back-end and performs the process of logging visitors.
         • Registration - A service that communicates with the back-end and performs the process of registering new visitors.
         • Tour - A service that delivers and updates visitor tour data.
         • Visitor - A service that delivers and updates visitor data.

NOTE: Application uses DialogFlow Messenger for smart agent, necessary steps to setup is as follows:
     1. Start the webhook server located on the path /src/app/bot-backend by entering the command "node index.js" (note the required node module packages are already in the folder). The webhook operates on port 21683.
     2. Activate ngrok (https://ngrok.com/) by entering the command ngrok http 21683. (Note to use ngrok you need to have an account, you can use your Google or GitHub).
     3. Import the smart agent dialogflow using the Smart_Agent_Dialogflow_Export.zip file to your dialogflow account.
     4. Enter the https link obtained by ngrok as the Fulfillment Webhook URL.

