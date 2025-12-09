# JSON Server Setup Instructions

## Running the JSON Server

To use the FitFlex app with JSON server (database), you need to run the JSON server in a separate terminal.

### Step 1: Start the JSON Server

Open a new terminal window and run:

```bash
npm run server
```

This will start the JSON server on `http://localhost:3001`

### Step 2: Start the React App

In another terminal window, run:

```bash
npm start
```

This will start the React app on `http://localhost:3000`

## Important Notes

- The JSON server must be running before using the app
- All data (activities, goals, memberships, payments, users) will be stored in `db.json`
- The server runs on port 3001
- **If the server is not running, the app will automatically use localStorage as a fallback**
- User registration and login will work even without JSON server (using localStorage fallback)
- For best experience, keep JSON server running to persist all data in `db.json`

## API Endpoints

The JSON server provides the following endpoints:

- `GET /activities` - Get all activities
- `POST /activities` - Create a new activity
- `PATCH /activities/:id` - Update an activity
- `DELETE /activities/:id` - Delete an activity
- `GET /goals` - Get goals
- `PATCH /goals/1` - Update goals
- `GET /memberships` - Get all memberships
- `POST /memberships` - Create a new membership
- `GET /payments` - Get all payments
- `POST /payments` - Create a new payment
- `GET /users` - Get all users
- `POST /users` - Create a new user (registration)

