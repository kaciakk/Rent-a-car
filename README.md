## Car Rental Application

This is a car rental application built using React, MongoDB, Express.js, and Node.js. Users can view available cars, reserve them for a specified period, and admin users can manage car rentals and add new cars to the inventory.

### Technologies Used:
- React
- MongoDB
- Express.js
- Node.js

### Installation:

1. **Clone the repository:**

    ```
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```
    cd <project-directory>
    ```

3. **Install dependencies:**

    ```
    npm install
    ```

4. **Set up MongoDB:**

   - Ensure MongoDB is installed and running on your local machine.
   - Update MongoDB connection details in the application code if necessary.

5. **Start the server:**

    ```
    npm start
    ```

6. **Access the application in your browser:**

    ```
    http://localhost:3000
    ```

### Code Overview:

- `server.js`: Entry point of the server application.
- `routes/cars.js`: Defines routes for managing cars.
- `routes/carRentals.js`: Defines routes for managing car rentals.
- `routes/auth.js`: Defines routes for user authentication.
- `models/Car.js`: Defines the MongoDB schema for cars.
- `models/CarRental.js`: Defines the MongoDB schema for car rentals.
- `models/User.js`: Defines the MongoDB schema for users.
- `client/src/components`: Contains React components for different parts of the application, including car listing, reservation, user management, etc.

### Usage:

1. **User Authentication**: Users can log in or sign up to access the application features.
2. **View Available Cars**: Users can browse through the list of available cars for rental.
3. **Make Reservations**: Users can reserve a car by selecting the desired dates and confirming the reservation.
4. **Admin Panel**: Admin users have access to additional functionalities such as adding new cars to the inventory and managing car rentals.
5. **Delete Reservations**: Admin users can delete reservations for rented cars.


Enjoy using the Car Rental Application!
