💧 Water Tracker App

A simple and clean water intake tracking application built using React and CSS. The app helps users monitor and manage their daily hydration goals with ease. It offers a minimal UI, quick add buttons, manual input, progress visualization, and daily history — all stored locally in the browser.


Features
- Track daily water intake (default goal: 2000 ml)
- Add intake manually or with quick +250ml / +500ml buttons
- View real-time progress bar and stats
- Automatically resets tracking each day
- Stores per-day history in browser localStorage
- Alerts when daily goal is reached
- Option to clear all saved history


Tech Stack
- React JS
- CSS
- JavaScript (ES6+)
- Browser LocalStorage (for saving daily data)


Installation & Setup Instructions
Follow these steps to get the app running on your local machine:

1. Clone the Repository
- git clone https://github.com/your-username/water-tracker.git
- cd water-tracker

2. Install Dependencies
- npm install

3. Start the React App
- npm start
The app will run on:
🌐 http://localhost:5173


**How to Use**
- On app load, you’ll see your daily goal (2000 ml) and a progress bar.
- Use the input box to manually enter the amount in ml.
- Or use the quick add buttons:
+250 ml
+500 ml
- The app saves the data locally in your browser.
- If you refresh or reopen, the app continues tracking for the same day.
- You’ll see a congratulatory alert once the goal is reached.
- The History section at the bottom shows all previous days' intake.
- You can Clear History any time using the button below.
