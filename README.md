# Expense Tracker REST API

A lightweight REST API built with **Node.js**, **Express**, and **TypeScript** for managing personal expenses. The application stores data in a local JSON file and provides CRUD operations along with expense summaries.

---

## Features

- Create a new expense
- Retrieve all expenses
- Filter expenses by category
- Get total expense summary
- Get category-wise expense summary
- Delete an expense
- JSON file-based storage (no database)
- TypeScript with modular architecture
- Error handling and input validation

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- UUID
- Jest
- Supertest

---

## Project Structure

```
expense-tracker-api/
│
├── src/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── tests/
│
├── README.md
├── AI_NOTES.md
├── package.json
└── tsconfig.json
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
cd expense-tracker-api
```

Install dependencies

```bash
npm install
```

---

## Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

---

## Running Tests

```bash
npm test
```

---

# API Endpoints

## Health Check

GET `/health`

Response

```json
{
  "success": true,
  "message": "Expense Tracker API is running."
}
```

---

## Create Expense

POST `/api/expenses`

Request

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-07-31"
}
```

---

## Get All Expenses

GET `/api/expenses`

---

## Filter Expenses

GET

```
/api/expenses?category=Food
```

---

## Get Expense Summary

GET

```
/api/expenses/summary
```

---

## Get Category Summary

GET

```
/api/expenses/summary?category=Food
```

---

## Delete Expense

DELETE

```
/api/expenses/:id
```



# Validation

The API validates:

- Required fields
- Positive expense amount
- Invalid routes
- Non-existent expense deletion

Returns appropriate HTTP status codes:

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error

---

# Design Decisions

- Layered architecture (Routes → Controllers → Services → Storage)
- JSON file storage instead of a database
- UUID used for unique expense IDs
- Async file operations using `fs/promises`
- Strong typing with TypeScript interfaces

---

# Bonus Feature

Implemented:

- Swagger/OpenAPI Documentation



# Author

Ayyaluri Chennakeshava Reddy
