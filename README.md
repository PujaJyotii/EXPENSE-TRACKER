## React Expense Tracker Application
The app offers a personalized experience, showing users only their specific data. Secure authentication ensures that only authorized users can access and manage their expenses. Users can add, update, and delete expenses, and premium features like expense downloads and dark theme activation are available for expenses over 10,000.
**Welcome to my project!**

## Key Features
- **User Authentication**: Secure login and sign-up functionality using Firebase REST API. A special token is created upon successful login, stored locally for further actions, ensuring the application remains user-specific.
- **Forgot Password**: Provides a way for users to reset their password if forgotten, enhancing the application's user-friendliness.
- **Expense Management**: Users can add, update, and delete expenses. Each expense entry can be edited, and modifications are reflected in real-time. Users can download their expenses in an Excel sheet format.
- **User Profile**: Logged-in users can fill or update their personal details, which are stored securely in Firebase.
- **Email Verification**: A dedicated page allows users to verify their email, ensuring account security.
- **Premium Features**: If an expense exceeds 10,000, users are eligible to access premium features, such as downloading their expense list and enabling dark mode.
- **Theme Toggle**: Users can switch between light and dark themes for a personalized experience.
- **Logout Functionality**: Users can log out securely, which clears their session and returns them to the starting page.
## Installation
1. **Clone the repository to your local machine:**

   ```bash
   git clone https://https://github.com/PujaJyotii/EXPENSE-TRACKER.git
2. **Navigate to the project directory:**

   ```bash
   cd EXPENSE-TRACKER
3. **Install the required dependencies:**

   ```bash
   npm install
4. **Start the development server:**

   ```bash
   npm start
   ```
## Usage
- **Navigate through the application** using the top navigation bar to explore different sections such as the expenses page, profile page, and settings.
- **Log in or sign** up to access personalized features like managing expenses and updating user details.
- **Add and manage** expenses easily through the form and interactive list, with options to edit, update, or delete entries.
- **Download expenses in Excel sheet format** using the provided functionality.
- **Access premium features** once eligible, such as downloading expenses and toggling dark mode.
- **Log out** securely when finished to end your session.
## Technologies Used
- **React:** Front-end library for building the user interface.
- **Firebase:** Used for authentication, real-time database management, and backend services.
- **React Bootstrap:** For responsive and modular styling.
- **Local Storage:** Used to store user tokens and other relevant data for session persistence.
- **Redux and Context API** is used for state management.

### Dependencies
 - **axios:** ^1.5.1
 - **bootstrap:** ^5.3.2
 - **react:** ^18.0.0
 - **react-bootstrap:** ^2.9.0
 - **react-csv:** ^2.2.2
 - **react-dom:** ^18.0.0
 - **react-redux:** ^8.1.3
 - **react-router-dom:** ^5.3.4
 - **react-scripts:** ^5.0.1
 - **redux:** ^4.2.1
