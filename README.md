# FinTrack

FinTrack is a personal finance management web application that helps users track expenses, set budgets, monitor savings, and gain insights into their financial habits. Built with React for the frontend and Node.js/Express with MongoDB for the backend, FinTrack provides a simple and intuitive interface for managing your money.

## Features

- **User Authentication:** Sign up and sign in securely.
- **Dashboard:** Visual overview of your expenses and a calendar for financial events.
- **Budget Management:** Set a monthly budget, add and remove expenses by category.
- **Expense Tracking:** Track weekly expenses across multiple categories with visual pie charts.
- **Savings Goals:** Set and monitor savings goals for different categories.
- **Settings:** Update your profile and change your password.
- **Responsive UI:** Clean, modern, and mobile-friendly design.

## Project Structure

```
fintrack/
├── backend/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── models/
│   │   └── User.js
│   └── routes/
│       └── users.js
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── components/
│   │   ├── Calendar.jsx
│   │   ├── ExpensePieChart.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── pages/
│       ├── Budget.jsx
│       ├── Dashboard.jsx
│       ├── Expenses.jsx
│       ├── Home.jsx
│       ├── Savings.jsx
│       ├── Settings.jsx
│       ├── SignIn.jsx
│       └── SignUp.jsx
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1. Navigate to the `backend` folder:

   ```sh
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` folder and add your MongoDB connection string:

   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:

   ```sh
   node index.js
   ```

   The backend will run on `http://localhost:5000` by default.

### Frontend Setup

1. In the project root, install frontend dependencies:

   ```sh
   npm install
   ```

2. Start the React development server:

   ```sh
   npm start
   ```

   The app will run on `http://localhost:3000`.

## Usage

- **Sign Up:** Create a new account.
- **Sign In:** Log in to access your dashboard.
- **Dashboard:** View your expense breakdown and use the calendar for notes.
- **Budget:** Set your monthly budget and add/remove expenses.
- **Expenses:** Track weekly expenses by category and visualize them.
- **Savings:** Set savings goals and track your progress.
- **Settings:** Update your profile and change your password.

## Deployment

To build the app for production:

```sh
npm run build
```

This will create a `build` folder with optimized static files.

For backend deployment, ensure your environment variables are set and use a process manager like `pm2` or deploy to a cloud service.

## Technologies Used

- **Frontend:** React, Chart.js, Recharts, React Router, date-fns
- **Backend:** Node.js, Express, MongoDB, Mongoose, bcrypt, dotenv, cors

## License

This project is licensed under the MIT License.

---

**FinTrack** – Your one-stop solution for all your financial tracking
