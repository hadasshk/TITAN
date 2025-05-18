# Quotes of the Day

A full-stack application that fetches and displays random quotes from the FavQs API.

## Features

- Display random quotes
- Filter quotes by tag
- Customizable number of quotes to display
- Responsive design
- Caching to handle API rate limits

## Technology Stack

- **Frontend**: React, TypeScript, Styled Components, Vite
- **Backend**: Node.js, Express, TypeScript
- **API**: FavQs API (https://favqs.com/api)

## Prerequisites

- Node.js (version 12 or higher)
- npm or yarn
- A FavQs API key (get one at https://favqs.com/api)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd TITAN-Quotes/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=3001
   FAVQS_API_KEY=your-api-key
   ```
   Replace `your-api-key` with your actual FavQs API key.

4. Build the TypeScript code:
   ```
   npm run build
   ```

5. Start the server:
   ```
   npm start
   ```
   
   Or for development mode with hot-reloading:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd TITAN-Quotes/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/quotes?count=5` - Get a specified number of random quotes
- `GET /api/quotes/tag/:tag?count=5` - Get a specified number of quotes filtered by tag

## Deployment

### Backend

Build the TypeScript code before deployment:
```
npm run build
```

This will create a `dist` directory with the compiled JavaScript files.

### Frontend

Build the React application for production:
```
npm run build
```

This will create a `dist` directory with optimized production files.

## License

ISC 