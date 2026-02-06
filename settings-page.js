
class SettingsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.getElementById('color-scheme').addEventListener('change', (e) => {
        this.dispatchEvent(new CustomEvent('settingChanged', { detail: { setting: 'color-scheme', value: e.target.value } }));
    });

    this.shadowRoot.getElementById('language').addEventListener('change', (e) => {
        this.dispatchEvent(new CustomEvent('settingChanged', { detail: { setting: 'language', value: e.target.value } }));
    });

    this.shadowRoot.getElementById('units').addEventListener('change', (e) => {
        this.dispatchEvent(new CustomEvent('settingChanged', { detail: { setting: 'units', value: e.target.value } }));
    });

    this.shadowRoot.getElementById('edit-profile-btn').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('editProfile'));
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="settings-page.css">
      <div class="settings-container">
        <h2>Settings</h2>
        <div class="setting-option">
          <label for="color-scheme">Color Scheme</label>
          <select id="color-scheme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div class="setting-option">
          <label for="language">Language</label>
          <select id="language">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div class="setting-option">
          <label for="units">Units</label>
          <select id="units">
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>
        <div class="setting-option">
            <label for="user-profile">User Profile</label>
            <button id="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    `;
  }
}

customElements.define('settings-page', SettingsPage);
