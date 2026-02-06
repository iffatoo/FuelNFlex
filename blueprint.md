# FuelNFlex Blueprint

## Overview

FuelNFlex is a web-based application designed to assist users in their fitness journey. It provides two main features: a personalized training plan generator for runners and a daily calorie calculator. The application is designed to be intuitive and user-friendly, with a modern and attractive interface.

## Implemented Styles, Designs, and Features

### Version 3.5

- **Consistent Branding & Theming:** The application now has a consistent brand identity and theme across the entire user journey.
    - **Standardized Welcome Screen:** The welcome screen has been updated to use the same typographic logo, color scheme, and background as the main application. This creates a seamless and professional experience from the moment a user lands on the page.

### Version 3.4

- **Sophisticated Text-Based Logo:** Based on user feedback, the header has been refined to be more professional and sophisticated.
    - **Typographic Logo:** The previous icon-based logo has been replaced with a clean, text-based logo. The new design uses different font weights and a touch of color to create a stylish and modern brand identity without the use of images.
    - **Professional Aesthetic:** This change elevates the overall design of the application, giving it a more polished and high-end feel.

### Version 3.3

- **Dynamic & Branded Header:** The application now features a more visually engaging and professional header.
    - **New Logo:** A new logo has been introduced, featuring a flame and a muscle icon to represent the "Fuel" and "Flex" aspects of the application. This strengthens the brand identity.
    - **Enhanced Typography & Layout:** The header has been redesigned with a more dynamic layout, and the typography of the main title and tagline has been improved for better visual appeal.

### Version 3.2

- **Immersive Layout & Enhanced Readability:** The application's layout and typography have been optimized for a more immersive and readable experience.
    - **Wider, More Immersive Layout:** The main application container now spans 95% of the viewport width, creating a more expansive and engaging user experience, especially on larger screens.
    - **Improved Visual Hierarchy & Readability:** Font sizes for headers, subheaders, navigation, and body content have been increased to establish a clearer visual hierarchy and make the text more comfortable to read.
    - **Refined Training Plan Display:** While the overall layout is wider, the generated training plan is now displayed with a maximum width and left-aligned text. This ensures the plan remains easy to read and is not stretched uncomfortably on large monitors.

### Version 3.1

- **Centered Content Layout:** The application's layout has been refined to be more visually balanced and professional.
    - **Centralized Page Content:** All main content sections ("Training Plan," "Calorie Tracker," and "Community") are now horizontally centered within their containing cards. This was achieved using CSS Flexbox, ensuring a clean and symmetrical presentation.
    - **Centered Header:** The main header content has also been center-aligned to match the overall layout.

### Version 3.0

- **Simplified & Friendlier UI:** Based on user feedback, the UI has been refined to be more legible and visually comfortable.
    - **Improved Readability:** The high-energy "Hot" color scheme has been removed to prioritize readability and a cleaner aesthetic. The application now exclusively uses the clear and high-contrast "Light" and "Dark" themes.
    - **Softer, Rounded Elements:** All input fields, select dropdowns, and buttons throughout the application have been updated with rounded corners. This removes the harsh, "boxy" feel and gives the UI a softer, more modern, and approachable look.

### Version 2.9

- **Improved Navigation:** The application's navigation has been completely overhauled to be more modern, functional, and user-friendly.
    - **Centered and Restyled Buttons:** The navigation buttons have been made larger, more prominent, and are now centered for a cleaner and more professional look.
    - **Tabbed Views:** A proper tabbed navigation system has been implemented. Clicking on a navigation button now shows the corresponding content section while hiding the others, creating a seamless, single-page application feel.
    - **Functional Tabs:** The "Training Plan," "Calorie Tracker," and "Community" tabs are now fully functional, allowing users to easily switch between the different sections of the application.

### Version 2.8

- **Glassmorphism UI:** The entire user interface has been redesigned with a modern "glassmorphism" aesthetic, inspired by the latest Apple iOS designs. This creates a sense of depth, light, and a premium feel.
    - **Abstract Gradient Backgrounds:** Vibrant, abstract gradients have been added to the background of each theme (Light, Dark, and Hot) to provide a visually interesting backdrop for the "glass" elements.
    - **Frosted Glass Effect:** UI elements such as the main container, content cards, and buttons now have a semi-transparent background and a `backdrop-filter` to create a "frosted glass" effect. This makes them appear as if they are floating on top of the background.
    - **Subtle Borders:** A subtle border has been added to the glass-like elements to define their edges and enhance the floating effect.
    - **Theme Integration:** The glass effect has been carefully integrated with all existing themes, with the core colors of each theme used for highlights and accents.

### Version 2.6

- **Exportable Training Plan:** The application now includes a feature to export the generated training plan, making it more portable and convenient for users.
    - **Copy to Clipboard:** A "Copy" button has been added, which formats the entire training plan as plain text (with checkboxes for tracking) and copies it to the user's clipboard. This allows users to easily paste the plan into their favorite notes app or any other text-based application.
    - **Print-Friendly Output:** A "Print" button has been implemented, which triggers the browser's print dialog. The application uses a print-specific stylesheet (`@media print`) to ensure that only the training plan is printed, hiding all other UI elements like the header, navigation, and buttons for a clean, paper-friendly layout.

### Version 2.5

- **Interactive Training Plan Checklist:** The training plan has been converted from a static list into an interactive checklist.
    - Each training day is now rendered with a checkbox, allowing users to mark activities as complete.
    - Completed items are visually distinguished with a strikethrough and a different color, providing clear feedback on progress.
    - This feature makes the training plan more engaging and helps users track their adherence to the schedule.
- **Standardized Page Height:** The main content cards for all pages (Training Plan, Calorie Tracker, Community) now have a consistent minimum height. This prevents the page layout from shifting or resizing when navigating between different sections, creating a more stable and visually consistent user experience.

### Version 2.4

- **Functional Settings:** The settings page is now fully functional, allowing users to customize their experience.
- **Event-Driven Architecture:** The application now uses an event-driven approach to handle settings changes. The `settings-page` component dispatches custom events (`settingChanged`, `editProfile`), which are handled by the main application logic in `main.js`.
- **Dark Mode:** A dark mode feature has been implemented. Users can switch between light and dark themes, and the application will dynamically update its color scheme.
- **Language Switching:** The application now supports internationalization (i18n) and allows users to switch between English, Spanish, and French. The text content of the application is updated dynamically based on the selected language.
- **Unit Conversion:** The application now supports both metric and imperial units. The user's weight and height are converted and displayed in the selected unit system.
- **Edit Profile:** The "Edit Profile" button on the settings page now allows users to return to the user information form to update their details.

### Version 2.3

- **Settings Page:** A new settings page has been added, accessible via a gear icon in the header.
    - The settings page is implemented as a `SettingsPage` web component, with its own HTML, CSS, and JavaScript files (`settings-page.js`, `settings-page.css`).
    - It provides options to change the Color Scheme, Language, and Units.
    - It includes a button to edit the user's profile.
    - The page appears as an overlay and can be closed by clicking the gear icon again or by clicking outside of the settings panel.
- **Layering and Z-Index:** The settings icon and page have been styled with appropriate `z-index` values to ensure they correctly layer on top of all other application content, providing a seamless user experience.


### Version 2.2

- **Personalized Ads:** The calorie tracker now displays personalized advertisements for food and nutrition products based on the user's selected goal. This provides relevant recommendations to the user and creates a potential revenue stream.
- **Meal Type Tagging:** Users can now categorize their meals by selecting a type (Breakfast, Lunch, Dinner, or Snack) before uploading a photo. This adds another layer of detail to the meal log.
- **Goal-Oriented Calorie Targets:** The calorie tracker now sets a daily calorie target based on the user's selected goal:
    - **Weight Loss:** Creates a 500-calorie deficit.
    - **Race Training:** Adds a 300-calorie surplus.
    - **General Wellness:** Calculates maintenance calories.
- **Photo-Based Meal Logging:** Users can now upload a photo of their meal to log their calorie intake. The application provides an estimated calorie count for the meal (currently simulated) and displays the uploaded photo in a meal log.
- **Dynamic Calorie Progress Bar:** The calorie tracker now features a progress bar that visually tracks the user's consumed calories against their daily goal.
- **Improved Target Time Display:** The training plan now displays the goal time in a more readable HH:MM:SS format (e.g., "1 hour, 30 minutes, and 25 seconds"), which is easier to understand than a raw minute count.
- **Consistent User Info:** The user's name, age, gender, weight, and height are now displayed on both the training plan and calorie calculator pages, ensuring a consistent and personalized experience across the application.
- **Personalized Greeting:** The application now asks for the user's name during the sign-up process and displays a personalized greeting (`Hello, [Name]!`) on the training plan and calorie calculator pages.
- **UI and Alignment Fixes:** Various alignment issues throughout the application have been fixed, resulting in a more polished and visually appealing layout. The placeholder text for the time input has been simplified.
- **Modernized Training plan Inputs:** The training plan generator form has been significantly redesigned for a more modern user experience.
    - The baseline time input now uses a sleek `HH:MM:SS` format, with smaller, more stylish fields.
    - The "Weeks to Train" input has been converted into an intuitive slider with a range of 4 to 20 weeks.
- **Dynamic Baseline Time:** The training plan generator now intelligently asks for a more relevant baseline time based on the user's goal race distance. For longer races like marathons, it will ask for a half-marathon time instead of a 5k time, leading to more accurate plan generation.
- **Streamlined Training Plan Generation:** If a user selects "Training for a Race" as their goal and provides a distance, the race-distance selection on the training plan page is automatically hidden. The plan is then generated using the pre-filled distance, creating a more seamless experience.
- **Improved Goal Selection UI:** The goal selection page has been redesigned with a more visually appealing and user-friendly card-based layout. Each card now includes an icon to represent the goal, making the options clearer and more engaging.
- **Goal Selection:** A new step in the sign-up process that asks users for their primary fitness goal: Lose Weight, Training for a Race, or General Wellness. This information is used to personalize the user experience.
- **Modern UI/UX:** The entire user interface has been redesigned to be more modern, vibrant, and visually appealing. This includes a new color scheme, typography (Poppins), and layout.
- **Welcome Prompt:** A full-screen welcome prompt that asks users if they are first-time or returning users. The prompt has a modern design with a gradient background and animated buttons.
- **User Information Form:** A form that collects basic user information (name, age, gender, weight, and height) from first-time users. This information is used to personalize the user experience.
- **User Information Display:** The user's information and goal are displayed on the running plan generator page to confirm that the plan is for the correct person.
- **Training Plan Generator:** A feature that generates a personalized training plan for runners based on their race distance, current 5k time, and the number of weeks they have to train.
- **Calorie Calculator:** A feature that calculates the user's daily calorie needs based on their age, gender, weight, height, and activity level.
- **Web Components:** The application is built using web components to create encapsulated and reusable UI elements.
- **Modern CSS:** The application uses modern CSS features, such as flexbox and grid, to create a responsive and mobile-friendly layout.

## Current Plan

- **Personalize the user experience:** Use the information collected from the user information form and goal selection to personalize the training plan and calorie calculator.
- **Add a database:** Store user information in a database so that users do not have to re-enter their information every time they visit the application.
- **Add more features:** Add more features to the 'application, such as a food log, a weight tracker, and a progress tracker.
