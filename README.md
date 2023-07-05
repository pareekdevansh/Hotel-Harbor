# Hotel Harbor

![Hotel Harbor Logo](logo.png)

Hotel Harbor is a web application that allows users to explore and book rooms from a MongoDB database. It provides a range of features to enhance the user experience, including filtering, sorting, and search functionalities. The application incorporates modern technologies such as Material UI, MERN stack, JavaScript, and Stripe for secure payment integration.

## Table of Contents

- [Features](#features)
  - [Room Listing](#room-listing)
  - [Filtering](#filtering)
  - [Search](#search)
  - [Sorting](#sorting)
  - [Room Details](#room-details)
  - [Booking](#booking)
  - [User Profile](#user-profile)
  - [My Bookings](#my-bookings)
  - [Authentication and Authorization](#authentication-and-authorization)
  - [Password Security](#password-security)
  - [Email Verification](#email-verification)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Features

### <a id="room-listing"></a>Room Listing

- Hotel Harbor displays a comprehensive list of rooms available for booking.
- The rooms are fetched from a MongoDB database, ensuring accurate and up-to-date information.

### <a id="filtering"></a>Filtering

- Users can filter the displayed rooms based on their preferences.
- Filters include capacity, price range, and room type (deluxe, economy, premium).

### <a id="search"></a>Search

- The application provides a convenient search feature that allows users to find rooms by name.
- Simply enter the room name, and the search algorithm will display relevant results.

### <a id="sorting"></a>Sorting

- Users can sort the room list based on various criteria:
  - [Alphabetical order](#room-listing) (ascending and descending).
  - [Price](#room-listing) (ascending and descending).
  - [Customer ratings](#room-listing).

### <a id="room-details"></a>Room Details

- Clicking on a room item provides users with detailed information about the room.
- Details include the room name, capacity, price, and a carousel of room images.

### <a id="booking"></a>Booking

- Hotel Harbor enables users to book rooms seamlessly.
- Integration with [Stripe](https://stripe.com) allows secure and convenient online payments.

### <a id="user-profile"></a>User Profile

- The user profile screen displays information about the currently logged-in user.
- Users can view and manage their personal details.

### <a id="my-bookings"></a>My Bookings

- The My Bookings page shows users their current bookings.
- Users can track and manage their reservations in one place.

### <a id="authentication-and-authorization"></a>Authentication and Authorization

- JWT authentication is implemented to ensure secure user access.
- The application supports role-based authorization to control user permissions.

### <a id="password-security"></a>Password Security

- User passwords are securely stored in the database using salted hashing techniques.
- This ensures that user credentials remain protected even in the event of a security breach.

### <a id="email-verification"></a>Email Verification

- Hotel Harbor verifies user email addresses using Google APIs.
- When signing up, users receive a verification email to confirm their account.
- A forgot password feature is also available, allowing users to reset their password securely. Reset password tokens are generated and sent to users' email addresses.

## Tech Stack

- Material UI
- MERN stack (MongoDB, Express, React, Node.js)
- JavaScript
- Stripe

## Installation

To run Hotel Harbor locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/hotel-harbor.git`
2. Navigate to the project directory: `cd hotel-harbor`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit: `http://localhost:3000`

**Note:** Make sure to set up the required environment variables by creating a `.env` file based on the provided `.env.example` file.

## Documentation and Learning Resources

- [Material UI Documentation](https://material-ui.com/)
- [MERN Stack Tutorial](https://www.mongodb.com/mern-stack)
- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Stripe Documentation](https://stripe.com/docs)

## Tips & Tricks

- Use [Postman](https://www.postman.com/) for testing API endpoints and requests.
- [JWT.io](https://jwt.io/) is a handy tool for decoding and verifying JWT tokens.
- [MongoDB Compass](https://www.mongodb.com/products/compass) provides a user-friendly GUI for interacting with your MongoDB database.

## Contributing

Contributions to Hotel Harbor are welcome! If you would like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add your commit message"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Submit a pull request detailing your changes.

## License

Hotel Harbor is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.
