
class WelcomePrompt extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="welcome-prompt.css">
      <div class="prompt-container">
          <h1><span class="fuel">Fuel</span><span class="n">N</span><span class="flex">Flex</span></h1>
        <h2>Are you a first-time user?</h2>
        <div class="button-group">
          <button id="first-time-yes">Yes</button>
          <button id="first-time-no">No</button>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('first-time-yes').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('firstTimeUser', { detail: true }));
      this.remove();
    });

    this.shadowRoot.getElementById('first-time-no').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('firstTimeUser', { detail: false }));
      this.remove();
    });
  }
}

customElements.define('welcome-prompt', WelcomePrompt);
