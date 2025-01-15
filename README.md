# Jokes Web Application

A web application that displays jokes and weather information to help users start their day with a smile. The application fetches jokes from multiple APIs and allows users to rate them while tracking usage statistics.

## Features

### Core Features (Level 1)
- Display random jokes from different APIs
- "Next Joke" button to fetch and display new jokes
- Basic layout and styling
- User rating system (1-3 stars)
- Tracking system that stores:
  - Joke content
  - User rating (optional)
  - Date of rating (ISO format)

### Advanced Features (Level 2)
- Weather information display
- Multiple joke sources integration
- Alternating joke sources (either sequential or random)

### Premium Features (Level 3)
- Responsive design
- Enhanced user interface
- Modern styling and animations

## Technical Implementation

### Data Structure
The application uses a `reportJokes` array to track joke interactions:
```javascript
const reportJokes = [
  {
    joke: "joke content",
    score: 1-3,  // Optional rating
    date: "ISO date string"
  }
];
```

### API Integration
The application integrates with:
- Jokes APIs (multiple sources)
- Weather API for current conditions

## Setup Instructions

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Configure API keys in environment variables
4. Start the development server
```bash
npm start
```

## Usage

1. When the application loads, it displays:
   - Current weather information
   - Initial joke
   - Rating buttons (1-3 stars)
   - "Next Joke" button

2. Users can:
   - Read the current joke
   - Optionally rate the joke (1-3 stars)
   - Change their rating before moving to next joke
   - Request a new joke using the "Next Joke" button

3. The application tracks:
   - All jokes displayed
   - User ratings
   - Timestamp of interactions

## Development Notes

### API Requirements
- Jokes APIs
  - Primary jokes API
  - Secondary jokes API(s) for variety
- Weather API access

### State Management
- Track current joke
- Maintain ratings history
- Store weather data
- Handle API responses

### Responsive Design
- Mobile-first approach
- Tablet and desktop layouts
- Accessible interface

## Testing

Ensure to test:
- API integrations
- Rating system functionality
- Data storage and tracking
- Responsive layouts
- Error handling

## Future Enhancements
- User accounts
- Favorite jokes collection
- Share functionality
- Dark/Light mode
- Localization support

## Contributing
Feel free to submit issues and enhancement requests.

## License
[Add your chosen license]