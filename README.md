# Customer Management App

A customer management application built with **React, TypeScript, and Vite**. This project demonstrates component-based architecture, state management, asynchronous data fetching, and automated testing.

## Features

- **Customer Management:** Display and manage a list of customers.
- **Search:** Search customers by name, family name, email, and phone number.
- **Filtering:** Filter customers by active and inactive status.
- **Sorting:** Sort customers alphabetically (A–Z / Z–A).
- **Status Management:** Toggle customer status.
- **Delete Customers:** Delete inactive customers with a confirmation dialog.
- **Customer Details:** Expand and collapse additional customer information.
- **Async Data Fetching:** Simulate API requests with loading and error states.
- **Automated Testing:** Test application behavior and user interactions.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Vitest
- React Testing Library
- @testing-library/user-event

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/elnaz-shojaei/react-customer-management.git
```

Navigate to the project directory:

```bash
cd react-customer-management
```

Install dependencies:

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm run test
```

## Project Structure

```text
src/
├── services/
│   └── customer.service.ts
├── test/
│   └── setup.ts
├── type/
│   └── customer.ts
├── utils/
│   ├── customer.utils.ts
│   └── customerUtils.test.ts
├── App.tsx
├── App.test.tsx
├── CustomerCard.tsx
└── CustomerCard.test.tsx
```

## Testing

The project uses Vitest and React Testing Library to verify application behavior, including:

- Customer search and filtering
- Sorting
- Customer status changes
- Delete confirmation and cancellation
- Loading and error states
- User interactions

## Purpose

This project is part of my hands-on React and TypeScript learning journey, focusing on writing maintainable code, understanding React fundamentals, and building reliable applications through automated testing.

## Author

**Elnaz Shojaei**

[GitHub](https://github.com/elnaz-shojaei)
