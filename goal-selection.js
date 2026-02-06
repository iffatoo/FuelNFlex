
class GoalSelection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="goal-selection.css">
      <div class="goal-container">
        <h2>What's Your Primary Goal?</h2>
        <div class="goal-options">
          <div class="goal-option">
            <input type="radio" id="lose-weight" name="goal" value="lose-weight">
            <label for="lose-weight">
              <span class="icon">&#x1F9A5;</span>
              Lose Weight
            </label>
          </div>
          <div class="goal-option">
            <input type="radio" id="train-race" name="goal" value="train-race">
            <label for="train-race">
              <span class="icon">&#x1F3C3;</span>
              Training for a Race
            </label>
          </div>
          <div class="goal-option">
            <input type="radio" id="general-wellness" name="goal" value="general-wellness">
            <label for="general-wellness">
              <span class="icon">&#x1F9D8;</span>
              General Wellness
            </label>
          </div>
        </div>
        <div id="race-distance-input" class="hidden">
            <label for="race-distance-select">Select Race Distance</label>
            <select id="race-distance-select">
                <option value="5">5KM</option>
                <option value="10">10KM</option>
                <option value="21">Half Marathon (21KM)</option>
                <option value="42">Marathon (42KM)</option>
            </select>
        </div>
        <button id="continue-btn">Continue</button>
      </div>
    `;

    const raceDistanceInput = this.shadowRoot.getElementById('race-distance-input');
    this.shadowRoot.querySelectorAll('input[name="goal"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'train-race') {
          raceDistanceInput.classList.remove('hidden');
        } else {
          raceDistanceInput.classList.add('hidden');
        }
      });
    });

    this.shadowRoot.getElementById('continue-btn').addEventListener('click', () => {
      const selectedGoal = this.shadowRoot.querySelector('input[name="goal"]:checked');
      if (!selectedGoal) {
        alert('Please select a goal.');
        return;
      }

      const goal = selectedGoal.value;
      let detail = { goal };

      if (goal === 'train-race') {
        const distance = this.shadowRoot.getElementById('race-distance-select').value;
        detail.distance = parseInt(distance, 10);
      }

      this.dispatchEvent(new CustomEvent('goalSelected', { detail }));
    });
  }
}

customElements.define('goal-selection', GoalSelection);
