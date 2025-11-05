
const BACKEND_BASE_URL = '../solitaire-backend';

function loadLeaderboard() {
  const tbody = document.getElementById('leaderboard-body');
  const emptyMsg = document.getElementById('leaderboard-empty');
  if (!tbody) return; 

  axios.get(`${BACKEND_BASE_URL}/get-leaderboard.php`)
    .then(response => {
      if (!response.data.success) {
        console.error(response.data.error || 'Unknown error');
        return;
      }

      const rows = response.data.data || [];
      tbody.innerHTML = '';

      if (rows.length === 0) {
        emptyMsg && emptyMsg.classList.remove('hidden');
        return;
      } else {
        emptyMsg && emptyMsg.classList.add('hidden');
      }

      rows.forEach((row, index) => {
        const tr = document.createElement('tr');

        const createdAt = row.created_at ? new Date(row.created_at) : null;
        const whenText = createdAt ? createdAt.toLocaleString() : '';

        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${row.player_name}</td>
          <td>${row.score}</td>
          <td>${row.duration_seconds}</td>
          <td>${whenText}</td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('Failed to load leaderboard', err);
    });
}

function setupAddScoreForm() {
  const form = document.getElementById('add-score-form');
  const nameInput = document.getElementById('player-name');
  const messageEl = document.getElementById('add-score-message');

  if (!form) return; // not on add-score.html

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    if (!name) {
      messageEl.textContent = 'Please enter a name.';
      return;
    }

    messageEl.textContent = 'Submitting...';

    axios.post(`${BACKEND_BASE_URL}/add-score.php`, { name })
      .then(response => {
        if (!response.data.success) {
          messageEl.textContent = response.data.error || 'Something went wrong.';
          return;
        }

        messageEl.textContent = 'Score added! Redirecting to leaderboard...';

        // Redirect to landing page after a short delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to add score', err);
        messageEl.textContent = 'Network error. Please try again.';
      });
  });
}

// Init on every page
document.addEventListener('DOMContentLoaded', () => {
  loadLeaderboard();
  setupAddScoreForm();
});
