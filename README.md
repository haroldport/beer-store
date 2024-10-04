# Beer Store Project

This project consists of a backend API built with Django and a frontend application built with Next.js for managing a beer store.

## Prerequisites

- Python 3.12
- Node.js 20.17.0 or later
- npm 9.0.0 or later
- pipenv
- Docker and Docker Compose (for Docker-based setup)
- Make (optional, but recommended for easier command execution)

## Project Structure

```
beer-store/
├── backend/         # Django backend
├── frontend/        # Next.js frontend
│   └── beer-store-ui/
├── docker-compose.yml
├── Makefile
└── README.md
```

## Setup and Running (without Docker)

### Backend Setup

1. Install dependencies:

   ```
   make install-backend
   ```

   or without make:

   ```
   cd backend && pipenv --python 3.12 install --dev
   ```

2. Run the backend server:
   ```
   make run-backend
   ```
   or without make:
   ```
   cd backend && pipenv run python manage.py runserver
   ```

### Frontend Setup

1. Install dependencies:

   ```
   make install-frontend
   ```

   or without make:

   ```
   cd frontend/beer-store-ui && npm install
   ```

2. Run the frontend development server:
   ```
   make run-frontend
   ```
   or without make:
   ```
   cd frontend/beer-store-ui && npm run dev
   ```

## Running Tests

### Without Docker

- Backend tests:

  ```
  make test-backend
  ```

  or without make:

  ```
  cd backend && pipenv run test
  ```

- Frontend tests:

  ```
  make test-frontend
  ```

  or without make:

  ```
  cd frontend/beer-store-ui && npm test
  ```

- All tests:
  ```
  make test-all
  ```

## Setup and Running (with Docker)

1. Build the Docker images:

   ```
   make docker-build
   ```

   or

   ```
   docker-compose build
   ```

2. Start the containers:

   ```
   make docker-up
   ```

   or

   ```
   docker-compose up -d
   ```

3. To stop the containers:
   ```
   make docker-down
   ```
   or
   ```
   docker-compose down
   ```

## Running Tests

### Without Docker

- Backend tests:

  ```
  make test-backend
  ```

- Frontend tests:

  ```
  make test-frontend
  ```

- All tests:
  ```
  make test-all
  ```

### With Docker

- Backend tests:

  ```
  make docker-test-backend
  ```

- Frontend tests:

  ```
  make docker-test-frontend
  ```

- All tests:
  ```
  make docker-test-all
  ```

## Additional Commands

- View Docker logs:

  ```
  make docker-logs
  ```

- Run both backend and frontend (without Docker):
  ```
  make run-all
  ```

## Version Compatibility

- This project is designed to work with Python 3.12 and Node.js 20.17.0 or later.
- The Django backend uses Django 5.0 and Django REST Framework.
- The frontend uses Next.js (version specified in package.json).

## Notes

- Make sure to set up your environment variables properly for both development and production environments.
- For production deployment, additional configuration might be necessary, especially regarding security settings.
