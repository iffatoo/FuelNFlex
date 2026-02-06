
document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT SELECTORS --- //
    const welcomePrompt = document.querySelector('welcome-prompt');
    const userInfoForm = document.querySelector('user-info-form');
    const goalSelection = document.querySelector('goal-selection');
    const appContainer = document.getElementById('app-container');
    const userInfoDisplay = document.getElementById('user-info-display');
    const calorieUserInfoDisplay = document.getElementById('calorie-user-info-display');
    const raceDistanceSelectionGroup = document.getElementById('race-distance-selection-group');
    const baselineTimeLabel = document.getElementById('baseline-time-label');
    const raceDistanceSlider = document.getElementById('race-distance-slider');
    const sliderValue = document.getElementById('slider-value');
    const weeksToTrainSlider = document.getElementById('weeks-to-train-slider');
    const weeksSliderValue = document.getElementById('weeks-slider-value');
    const generatePlanBtn = document.getElementById('generate-plan-btn');
    const uploadMealPhotoBtn = document.getElementById('upload-meal-photo-btn');
    const mealPhotoInput = document.getElementById('meal-photo-input');
    const mealTypeSelect = document.getElementById('meal-type');
    const settingsIcon = document.getElementById('settings-icon-container');
    const settingsPage = document.querySelector('settings-page');

    // --- STATE VARIABLES --- //
    let userGoal = {};
    let userInfo = {};
    let baselineDistanceForPlan = 5; // Default to 5k
    let dailyCalorieGoal = 2000;
    let consumedCalories = 0;
    let loggedMeals = [];
    let currentLanguage = 'en';
    let currentUnits = 'metric';

    // --- TRANSLATIONS --- //
    const translations = {
        en: { greeting: 'Hello', goal: 'Goal', age: 'Age', gender: 'Gender', weight: 'Weight', height: 'Height' },
        es: { greeting: 'Hola', goal: 'Objetivo', age: 'Edad', gender: 'Género', weight: 'Peso', height: 'Altura' },
        fr: { greeting: 'Bonjour', goal: 'Objectif', age: 'Âge', gender: 'Genre', weight: 'Poids', height: 'Taille' },
    };

    // --- EVENT LISTENERS --- //
    if (welcomePrompt) {
        welcomePrompt.addEventListener('firstTimeUser', (e) => {
            welcomePrompt.style.display = 'none';
            userInfoForm.style.display = e.detail ? 'block' : 'none';
            if (!e.detail) {
                appContainer.style.display = 'block';
                userInfo = { name: "Returning User", age: 30, gender: 'male', weight: 70, height: 175 }; // Dummy data
                userGoal = { goal: 'general-wellness' }; // Dummy data
                displayFullUserInfo(userInfoDisplay, userInfo, userGoal);
                displayFullUserInfo(calorieUserInfoDisplay, userInfo, userGoal);
                calculateCalorieGoal();
                updateCalorieSummary();
                displayAds();
            }
        });
    }

    if (userInfoForm) {
        userInfoForm.addEventListener('userInfoSubmitted', (e) => {
            userInfo = e.detail;
            userInfoForm.style.display = 'none';
            goalSelection.style.display = 'block';
        });
    }

    if (goalSelection) {
        goalSelection.addEventListener('goalSelected', (e) => {
            userGoal = e.detail;
            goalSelection.style.display = 'none';
            appContainer.style.display = 'block';
            displayFullUserInfo(userInfoDisplay, userInfo, userGoal);
            displayFullUserInfo(calorieUserInfoDisplay, userInfo, userGoal);
            calculateCalorieGoal();
            updateCalorieSummary();
            displayAds();
            if (userGoal.goal === 'train-race') {
                raceDistanceSelectionGroup.style.display = 'none';
                updateBaselinePrompt(userGoal.distance);
            } else {
                raceDistanceSelectionGroup.style.display = 'block';
                updateBaselinePrompt(10); // Default for slider
            }
            switchTab('training-plan-section');
        });
    }
    
    const navButtons = document.querySelectorAll('nav button');
    const contentCards = document.querySelectorAll('.content-card');

    function switchTab(targetId) {
        contentCards.forEach(card => {
            if (card.id === targetId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        navButtons.forEach(button => {
            if (button.id === `show-${targetId.replace('-section', '')}`) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        if (targetId === 'calorie-tracker-section') {
            displayFullUserInfo(calorieUserInfoDisplay, userInfo, userGoal);
            calculateCalorieGoal();
            updateCalorieSummary();
            displayAds();
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.id.replace('show-', '') + '-section';
            switchTab(targetId);
        });
    });

    if (raceDistanceSlider) {
        raceDistanceSlider.addEventListener('input', () => {
            const distance = parseInt(raceDistanceSlider.value, 10);
            sliderValue.textContent = `${distance} km`;
            updateBaselinePrompt(distance);
        });
    }

    if (weeksToTrainSlider) {
        weeksToTrainSlider.addEventListener('input', () => {
            weeksSliderValue.textContent = `${weeksToTrainSlider.value} weeks`;
        });
    }

    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', () => {
            const raceDistance = userGoal.goal === 'train-race'
                ? userGoal.distance
                : parseInt(raceDistanceSlider.value, 10);
            const hours = parseInt(document.getElementById('baseline-hours').value, 10) || 0;
            const minutes = parseInt(document.getElementById('baseline-minutes').value, 10) || 0;
            const seconds = parseInt(document.getElementById('baseline-seconds').value, 10) || 0;
            const weeksToTrain = parseInt(weeksToTrainSlider.value, 10);
            const baselineTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

            generateAndDisplayPlan(raceDistance, baselineTimeInSeconds, weeksToTrain, baselineDistanceForPlan);
        });
    }

    if (uploadMealPhotoBtn) {
        uploadMealPhotoBtn.addEventListener('click', () => {
            mealPhotoInput.click();
        });
    }

    if (mealPhotoInput) {
        mealPhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const estimatedCalories = Math.floor(Math.random() * (600 - 200 + 1)) + 200;
                    const newMeal = {
                        name: mealTypeSelect.value,
                        calories: estimatedCalories,
                        image: event.target.result
                    };
                    loggedMeals.push(newMeal);
                    consumedCalories += newMeal.calories;
                    updateCalorieSummary();
                    displayLoggedMeals();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (settingsIcon) {
        settingsIcon.addEventListener('click', () => {
            if (settingsPage.style.display === 'none' || settingsPage.style.display === '') {
                settingsPage.style.display = 'block';
            } else {
                settingsPage.style.display = 'none';
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (settingsPage && !settingsPage.contains(e.target) && !settingsIcon.contains(e.target)) {
            settingsPage.style.display = 'none';
        }
    });

    if (settingsPage) {
        settingsPage.addEventListener('settingChanged', (e) => {
            const { setting, value } = e.detail;
            if (setting === 'color-scheme') {
                document.body.className = value; // Assumes 'light' or 'dark' class on body
            } else if (setting === 'language') {
                currentLanguage = value;
                setLanguage(value);
            } else if (setting === 'units') {
                currentUnits = value;
                displayFullUserInfo(userInfoDisplay, userInfo, userGoal);
                displayFullUserInfo(calorieUserInfoDisplay, userInfo, userGoal);
            }
        });

        settingsPage.addEventListener('editProfile', () => {
            settingsPage.style.display = 'none';
            appContainer.style.display = 'none';
            userInfoForm.style.display = 'block';
        });
    }
    // --- HELPER FUNCTIONS --- //

    function setLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        // Update dynamic text
        displayFullUserInfo(userInfoDisplay, userInfo, userGoal);
        displayFullUserInfo(calorieUserInfoDisplay, userInfo, userGoal);
    }

    function updateBaselinePrompt(distance) {
        if (distance > 30) {
            baselineTimeLabel.textContent = "Your Current Half Marathon (21k) Time";
            baselineDistanceForPlan = 21;
        } else if (distance > 10) {
            baselineTimeLabel.textContent = "Your Current 10k Time";
            baselineDistanceForPlan = 10;
        } else {
            baselineTimeLabel.textContent = "Your Current 5k Time";
            baselineDistanceForPlan = 5;
        }
    }

    function displayFullUserInfo(targetElement, info, goal) {
        if (!targetElement) return;
        targetElement.innerHTML = '';
        if (!info || !info.name) return;

        const t = translations[currentLanguage];

        const greeting = document.createElement('h2');
        greeting.innerHTML = `<strong data-translate="greeting">${t.greeting}, ${info.name}!</strong>`;
        targetElement.appendChild(greeting);

        let goalText = '';
        if (goal && goal.goal) {
            switch (goal.goal) {
                case 'lose-weight': goalText = 'Lose Weight'; break;
                case 'train-race': goalText = `Training for a ${goal.distance}km Race`; break;
                case 'general-wellness': goalText = 'General Wellness'; break;
            }
            const pGoal = document.createElement('p');
            pGoal.innerHTML = `<strong data-translate="goal">${t.goal}:</strong> <span>${goalText}</span>`;
            targetElement.appendChild(pGoal);
        }

        if (info.age) {
            const weight = currentUnits === 'imperial' ? (info.weight * 2.20462).toFixed(1) + ' lbs' : info.weight + ' kg';
            const height = currentUnits === 'imperial' ? Math.floor(info.height / 30.48) + '\' ' + Math.round((info.height % 30.48) / 2.54) + '\'\'' : info.height + ' cm';

            const details = document.createElement('p');
            details.innerHTML = `
                <strong data-translate="age">${t.age}:</strong> <span>${info.age}</span> |
                <strong data-translate="gender">${t.gender}:</strong> <span>${info.gender}</span> |
                <strong data-translate="weight">${t.weight}:</strong> <span>${weight}</span> |
                <strong data-translate="height">${t.height}:</strong> <span>${height}</span>
            `;
            targetElement.appendChild(details);
        }
    }

    function generateAndDisplayPlan(raceDistance, baselineTime, weeks, baselineDist) {
        const planContainer = document.getElementById('plan-container');
        const selectionContainer = document.getElementById('selection-container');
        if (!raceDistance || !baselineTime || baselineTime <= 0 || !weeks || weeks <= 0) {
            alert('Please fill in all the fields with valid numbers to generate a plan.');
            return;
        }
        const plan = generatePlan(raceDistance, baselineTime, weeks, baselineDist);
        displayPlan(plan, planContainer, selectionContainer);
        selectionContainer.style.display = 'none';
    }

    function formatPace(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function generatePlan(distance, baselineTime, numWeeks, baselineDistance) {
        const predictedTime = baselineTime * Math.pow(distance / baselineDistance, 1.06);
        const improvementFactor = 1 - ((0.015 / 4) * numWeeks);
        const goalTime = predictedTime * improvementFactor;
        const goalPaceInSecondsPerKm = goalTime / distance;
        const easyPace = goalPaceInSecondsPerKm * 1.2;
        const tempoPace = goalPaceInSecondsPerKm * 1.05;
        const formattedEasyPace = formatPace(easyPace);
        const formattedTempoPace = formatPace(tempoPace);
        const plan = { title: `Your ${distance}km Training Plan`, goalTime: goalTime, weeks: [] };

        for (let i = 1; i <= numWeeks; i++) {
            const week = { title: `Week ${i}`, days: [] };
            const longRunDistance = (distance / numWeeks) * i;
            week.days.push({ day: 'Monday', activity: 'Rest' });
            week.days.push({ day: 'Tuesday', activity: `Easy Run: ${(longRunDistance * 0.4).toFixed(2)} km at ${formattedEasyPace} min/km` });
            week.days.push({ day: 'Wednesday', activity: `Tempo Run: ${(longRunDistance * 0.6).toFixed(2)} km at ${formattedTempoPace} min/km` });
            week.days.push({ day: 'Thursday', activity: 'Cross-train or Rest' });
            week.days.push({ day: 'Friday', activity: `Easy Run: ${(longRunDistance * 0.3).toFixed(2)} km at ${formattedEasyPace} min/km` });
            week.days.push({ day: 'Saturday', activity: `Long Run: ${longRunDistance.toFixed(2)} km` });
            week.days.push({ day: 'Sunday', activity: 'Rest' });
            plan.weeks.push(week);
        }
        return plan;
    }

    function displayPlan(plan, container, selectionContainer) {
        const hours = Math.floor(plan.goalTime / 3600);
        const minutes = Math.floor((plan.goalTime % 3600) / 60);
        const seconds = Math.round(plan.goalTime % 60);

        let timeParts = [];
        if (hours > 0) timeParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
        if (minutes > 0) timeParts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
        timeParts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
        const formattedGoalTime = timeParts.join(', ').replace(/,([^,]*)$/, ' and$1');

        let html = `
            <div class="plan-header">
                <h2>${plan.title}</h2>
                <div class="plan-export-buttons">
                    <button id="copy-plan-btn">Copy</button>
                    <button id="print-plan-btn">Print</button>
                </div>
            </div>
            <p>Based on your training, a realistic goal time is around <strong>${formattedGoalTime}</strong>.</p>
            <table class="plan-table">
        `;

        plan.weeks.forEach(week => {
            html += `
                <tbody class="plan-week">
                    <tr><th colspan="3"><h3>${week.title}</h3></th></tr>
            `;
            week.days.forEach(day => {
                html += `
                    <tr class="plan-day">
                        <td><input type="checkbox" id="${week.title}-${day.day}" name="${week.title}-${day.day}"></td>
                        <td><label for="${week.title}-${day.day}"><strong>${day.day}</strong></label></td>
                        <td><label for="${week.title}-${day.day}">${day.activity}</label></td>
                    </tr>`;
            });
            html += '</tbody>';
        });
        html += `</table><button id="back-button">Back</button>`;
        container.innerHTML = html;

        document.getElementById('back-button').addEventListener('click', () => {
            selectionContainer.style.display = 'block';
            container.innerHTML = '';
        });

        container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                e.target.closest('.plan-day').classList.toggle('completed', e.target.checked);
            });
        });

        document.getElementById('copy-plan-btn').addEventListener('click', () => {
            let planText = `${plan.title}\n\n`;
            planText += `Goal Time: ${formattedGoalTime}\n\n`;
            plan.weeks.forEach(week => {
                planText += `${week.title}\n`;
                week.days.forEach(day => {
                    planText += `  [ ] ${day.day}: ${day.activity}\n`;
                });
                planText += '\n';
            });

            navigator.clipboard.writeText(planText).then(() => {
                alert('Training plan copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy plan. Please try again.');
            });
        });

        document.getElementById('print-plan-btn').addEventListener('click', () => {
            window.print();
        });
    }


    function calculateCalorieGoal() {
        if (!userInfo.age) return;
        const bmr = userInfo.gender === 'male'
            ? (10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age + 5)
            : (10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age - 161);
        const tdee = bmr * 1.55; // Assuming moderately active, will be customizable later

        switch(userGoal.goal) {
            case 'lose-weight':
                dailyCalorieGoal = tdee - 500;
                break;
            case 'train-race':
                dailyCalorieGoal = tdee + 300;
                break;
            case 'general-wellness':
            default:
                dailyCalorieGoal = tdee;
                break;
        }
        dailyCalorieGoal = Math.round(dailyCalorieGoal);
    }

    function updateCalorieSummary() {
        const calorieSummaryContainer = document.getElementById('calorie-summary-container');
        const percentage = Math.min((consumedCalories / dailyCalorieGoal) * 100, 100);

        calorieSummaryContainer.innerHTML = `
            <h3>Daily Calorie Goal</h3>
            <p><strong>${consumedCalories}</strong> / ${dailyCalorieGoal} kcal</p>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${percentage}%;"></div>
            </div>
        `;
    }

    function displayLoggedMeals() {
        const loggedMealsContainer = document.getElementById('logged-meals-container');
        loggedMealsContainer.innerHTML = '';
        loggedMeals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML = `
                <img src="${meal.image}" alt="${meal.name}">
                <h4>${meal.name}</h4>
                <p>${meal.calories} kcal (estimated)</p>
            `;
            loggedMealsContainer.appendChild(mealCard);
        });
    }

    function displayAds() {
        const adsContainer = document.getElementById('ads-container');
        adsContainer.innerHTML = '<h3>Recommended for You</h3>';
        let ads = [];

        switch(userGoal.goal) {
            case 'lose-weight':
                ads = [
                    { title: 'Lite & Fit Meal Plan', description: 'Delicious, low-calorie meals delivered to your door.', link: '#', img: 'https://via.placeholder.com/100' },
                    { title: 'Join a Fitness Class', description: 'Burn calories and have fun with our group classes.', link: '#', img: 'https://via.placeholder.com/100' }
                ];
                break;
            case 'train-race':
                ads = [
                    { title: 'Carb-Load Energy Bars', description: 'Maximize your performance with our specially formulated energy bars.', link: '#', img: 'https://via.placeholder.com/100' },
                    { title: 'Hydration Packs', description: 'Stay hydrated on your long runs with our ergonomic packs.', link: '#', img: 'https://via.placeholder.com/100' }
                ];
                break;
            case 'general-wellness':
            default:
                ads = [
                    { title: 'Organic Fruit & Veg Box', description: 'Get fresh, seasonal produce delivered weekly.', link: '#', img: 'https://via.placeholder.com/100' },
                    { title: 'Mindfulness & Yoga App', description: 'Improve your mental and physical well-being.', link: '#', img: 'https://via.placeholder.com/100' }
                ];
                break;
        }

        ads.forEach(ad => {
            const adCard = document.createElement('div');
            adCard.classList.add('ad-card');
            adCard.innerHTML = `
                <img src="${ad.img}" alt="${ad.title}">
                <div class="ad-card-content">
                    <h4>${ad.title}</h4>
                    <p>${ad.description}</p>
                    <a href="${ad.link}">Learn More</a>
                </div>
            `;
            adsContainer.appendChild(adCard);
        });
    }
});
