
class CommunityForum extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const bestPracticesPosts = [
      {
        author: "HealthyHabitHacker",
        content: "Don't forget to drink water throughout the day, not just during your workout! I aim for 3 liters. It makes a huge difference in my energy levels."
      },
      {
        author: "WellnessWarrior",
        content: "I've found that paying attention to my food and eating slowly helps me recognize when I'm full. No more overeating! Plus, I enjoy my meals more."
      },
      {
        author: "EarlyBirdRunner",
        content: "Consistency is key! Even a short 15-minute workout is better than no workout at all. It's about building the habit."
      }
    ];

    const exerciseTipsPosts = [
      {
        author: "GymGuru",
        content: "For proper squat form, keep your chest up and back straight! It's better to go lighter with good form than heavy with bad form. Prevents injuries!"
      },
      {
        author: "StretchySusan",
        content: "On my rest days, I love going for a light walk or doing some dynamic stretching. It really helps with muscle soreness and improves flexibility."
      },
      {
        author: "CardioKing",
        content: "Try interval training to boost your cardiovascular fitness. Sprint for 30 seconds, then walk for 60 seconds. Repeat 10 times. It's a game-changer."
      }
    ];

    const people = [
      {
        name: "Alex Rivera",
        bio: "Marathon runner and cycling enthusiast. Always looking for a new trail to explore.",
        img: "https://i.pravatar.cc/150?img=11"
      },
      {
        name: "Brenda Smith",
        bio: "Yoga instructor focusing on mindfulness and flexibility. Believes in finding balance in all things.",
        img: "https://i.pravatar.cc/150?img=5"
      },
      {
        name: "Carlos Gomez",
        bio: "Weightlifter and nutrition coach. Passionate about helping others reach their strength goals.",
        img: "https://i.pravatar.cc/150?img=33"
      }
    ];

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="community.css">
      <div class="forum-container">
        <h2>Community Hub</h2>
        <p>Connect, share, and learn with fellow fitness enthusiasts!</p>

        <div class="forum-section">
          <h3>Best Practices</h3>
          ${bestPracticesPosts.map(post => `
            <div class="forum-post">
              <p class="post-author">${post.author} says:</p>
              <p class="post-content">"${post.content}"</p>
            </div>
          `).join('')}
        </div>

        <div class="forum-section">
          <h3>Exercise Tips</h3>
          ${exerciseTipsPosts.map(post => `
            <div class="forum-post">
              <p class="post-author">${post.author} says:</p>
              <p class="post-content">"${post.content}"</p>
            </div>
          `).join('')}
        </div>

        <div class="forum-section">
          <h3>Connect with People</h3>
           <div class="people-container">
            ${people.map(person => `
              <div class="user-profile">
                <img src="${person.img}" alt="Profile picture of ${person.name}">
                <div class="user-info">
                  <h4>${person.name}</h4>
                  <p>${person.bio}</p>
                </div>
                <button class="follow-btn">Follow</button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  connectedCallback() {
    const followButtons = this.shadowRoot.querySelectorAll('.follow-btn');
    followButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.textContent === 'Follow') {
          btn.textContent = 'Following';
          btn.classList.add('following');
        } else {
          btn.textContent = 'Follow';
          btn.classList.remove('following');
        }
      });
    });
  }
}

customElements.define('community-forum', CommunityForum);
