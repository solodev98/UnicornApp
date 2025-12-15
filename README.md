# Unicorn Dashboard 🦄

A Vue.js web application for managing unicorn data with full CRUD operations, pagination, sorting, and responsive design.

## Features

- ✅ List paginated unicorns (5 per page)
- ✅ Create new unicorns
- ✅ Edit existing unicorns
- ✅ Delete unicorns
- ✅ Sort by name (alphabetically) or age
- ✅ Status calculation based on age:
  - Age 0-8: Baby Unicorn
  - Age 9-25: Mature Unicorn
  - Age 26+: Old Unicorn
- ✅ Fully responsive design
- ✅ Loading states and error handling
- ✅ Form validation
- ✅ State management with Pinia

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool
- **Axios** - HTTP client

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FrontEnd-Takehome
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Get your unique ID from [crudcrud.com](https://crudcrud.com/)
   - Update `VITE_API_BASE_URL` in `.env` with your unique ID:
     ```
     VITE_API_BASE_URL=https://crudcrud.com/api/YOUR_UNIQUE_ID_HERE
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/       # Vue components
│   ├── UnicornCard.vue      # Individual unicorn card display
│   ├── UnicornForm.vue      # Create/Edit form
│   ├── UnicornList.vue      # List of unicorns with pagination
│   ├── Pagination.vue       # Pagination controls
│   └── SortControls.vue     # Sorting controls
├── stores/          # Pinia stores
│   └── unicornStore.js      # Main application state
├── services/        # API service layer
│   └── api.js               # API calls abstraction
├── utils/           # Utility functions
│   └── statusUtils.js       # Status calculation utilities
├── assets/          # Static assets
│   └── main.css             # Tailwind CSS imports
├── App.vue          # Root component
└── main.js          # Application entry point
```

## Design Decisions

- **Component-based architecture**: Each feature is broken down into reusable components for better maintainability
- **Pinia for state management**: Centralized state management for better data flow and easier debugging
- **Service layer**: API calls are abstracted into a service layer for easier testing and maintenance
- **Responsive design**: Mobile-first approach with Tailwind CSS breakpoints (sm, md, lg)
- **Error handling**: Comprehensive error handling with user-friendly messages
- **Form validation**: Client-side validation for better UX and data integrity
- **Computed properties**: Efficient reactive data transformations for sorting and pagination

## API Integration

The application uses the CRUD CRUD API. Make sure to:
1. Get a unique ID from https://crudcrud.com/
2. Update the `.env` file with your unique ID
3. **Note**: The unique ID expires after 24 hours, so you'll need to update it periodically

## Features Implementation

### Pagination
- Displays 5 unicorns per page
- Previous/Next navigation buttons
- Shows current page and total pages
- Automatically adjusts when sorting or filtering

### Sorting
- Sort by name (alphabetically, ascending/descending)
- Sort by age (numerically, ascending/descending)
- Visual indicators for active sort field and direction
- Clear sort option to reset to default order

### Status Logic
- Automatically calculates status based on age:
  - **Baby Unicorn**: Age 0-8 (blue badge)
  - **Mature Unicorn**: Age 9-25 (green badge)
  - **Old Unicorn**: Age 26+ (purple badge)

### CRUD Operations
- **Create**: Form with validation for name, age, and optional colour
- **Read**: Fetches and displays all unicorns with pagination
- **Update**: Edit form pre-populated with existing data
- **Delete**: Confirmation dialog before deletion

## Challenges & Solutions

- **Pagination with sorting**: Implemented computed properties in Pinia store to handle both pagination and sorting efficiently, ensuring data is sorted before pagination
- **Form state management**: Used reactive forms with validation to ensure data integrity and provide immediate feedback
- **API error handling**: Wrapped all API calls in try-catch blocks and provided user-friendly error messages
- **Responsive design**: Used Tailwind's responsive utilities to ensure the application works well on all screen sizes

## Future Improvements

- [ ] Add unit tests with Vitest
- [ ] Implement search/filter functionality
- [ ] Add animations and transitions for better UX
- [ ] Deploy to Netlify/Vercel
- [ ] Add more comprehensive form validation (e.g., max age limits)
- [ ] Add loading skeletons instead of spinner
- [ ] Implement optimistic UI updates
- [ ] Add toast notifications for success/error messages

## Development Notes

- The application uses Vue 3 Composition API with `<script setup>` syntax
- All components are written in Single File Components (SFC) format
- Tailwind CSS is used for all styling - no custom CSS files needed
- The API base URL is stored in environment variables for easy configuration

## License

This project is part of a take-home assignment.

