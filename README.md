
# Language Learning App

This is a professional, responsive language learning web application built with PHP and Bootstrap. The app uses a structured JSON file (`data.json`) to provide educational units, stories, exercises, and vocabulary for language learners.

## Features
- Display all educational units with images and descriptions
- View details of each unit: stories, listening exercises, pronunciation, and more
- Interactive vocabulary list with images and audio
- Responsive design for mobile and desktop
- Modern UI with Bootstrap

## Getting Started
1. **Clone or download the repository.**
2. Make sure you have PHP installed (version 7+ recommended).
3. Place your educational content and media files in the `data/` folder as referenced in `data.json`.
4. Run the app locally:

```bash
php -S localhost:8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## File Structure
- `index.php` — Main application file
- `data.json` — Language learning content (units, stories, vocabulary)
- `data/` — Images and audio files referenced in JSON
- `README.md` — Project documentation

## Customization
- To add or edit units, stories, or vocabulary, update `data.json` and add corresponding media files to `data/`.
- The UI is fully responsive and can be customized via Bootstrap classes in `index.php`.

## License
This project is open source and free to use for educational purposes.