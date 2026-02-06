
class UserInfoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="user-info-form.css">
      <div class="form-container">
        <h2>Tell Us a Bit About Yourself</h2>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="e.g., Jane Doe">
        </div>
        <div class="form-group">
            <label for="age">Age</label>
            <input type="number" id="age" placeholder="e.g., 30">
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="weight">Weight (kg)</label>
          <input type="number" id="weight" placeholder="e.g., 70">
        </div>
        <div class="form-group">
          <label for="height">Height (cm)</label>
          <input type="number" id="height" placeholder="e.g., 175">
        </div>
        <button id="submit-btn">Continue</button>
      </div>
    `;

    this.shadowRoot.getElementById('submit-btn').addEventListener('click', () => {
        const name = this.shadowRoot.getElementById('name').value;
        const age = this.shadowRoot.getElementById('age').value;
        const gender = this.shadowRoot.getElementById('gender').value;
        const weight = this.shadowRoot.getElementById('weight').value;
        const height = this.shadowRoot.getElementById('height').value;

        if (!name || !age || !gender || !weight || !height) {
            alert('Please fill out all fields.');
            return;
        }

        this.dispatchEvent(new CustomEvent('userInfoSubmitted', {
            detail: { name, age, gender, weight, height }
        }));
    });
  }
}

customElements.define('user-info-form', UserInfoForm);
