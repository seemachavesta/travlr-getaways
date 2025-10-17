Travlr Getaways – Full Stack Web Application

 Architecture

The Travlr Getaways application was built using the MEAN stack (MongoDB, Express, Angular, Node.js) to support both public and admin interfaces. The customer-facing site uses Express with Handlebars templates for server-side rendering, while the admin SPA is built with Angular for a faster, more dynamic experience. MongoDB was chosen for its flexibility and scalability as a NoSQL database, which works well with JSON-based data and integrates smoothly with Node.js through Mongoose.

 Functionality

JSON serves as the link between the Angular frontend and the Express backend, transferring trip data and authentication details. During development, I refactored the project to use reusable Angular components (like trip-list and trip-edit), improving organization and efficiency. These modular components made updates easier and reduced code duplication across the application.

 Testing

I tested all RESTful API endpoints (GET, POST, PUT, DELETE) using Postman to verify data flow between the Angular SPA, Express API, and MongoDB. After implementing JWT-based authentication, I confirmed that admin features required valid tokens, ensuring secure CRUD operations. These tests validated both functionality and security across the stack.

Reflection

This project helped me strengthen my full stack development skills — from connecting an API to a secure Angular frontend to handling authentication and data management. I learned how to design and test a complete MEAN stack system, which has made me more confident and better prepared for real-world development roles.
