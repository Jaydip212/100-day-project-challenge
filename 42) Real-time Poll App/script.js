document.addEventListener('DOMContentLoaded', () => {
    const state = {
        currentPoll: null,
        votes: {}
    };

    const addOptionBtn = document.getElementById('add-option');
    const createPollBtn = document.getElementById('create-poll');
    const optionsContainer = document.getElementById('options-container');
    const activePoll = document.getElementById('active-poll');
    const pollResults = document.getElementById('poll-results');

    // Add new option input field
    addOptionBtn.addEventListener('click', () => {
        const optionCount = optionsContainer.children.length + 1;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'option-input';
        input.placeholder = `Option ${optionCount}`;
        optionsContainer.appendChild(input);
    });

    // Create new poll
    createPollBtn.addEventListener('click', () => {
        const question = document.getElementById('question').value;
        const options = Array.from(document.getElementsByClassName('option-input'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');

        if (!question || options.length < 2) {
            alert('Please enter a question and at least 2 options!');
            return;
        }

        // Create new poll
        state.currentPoll = {
            question,
            options,
            timestamp: Date.now()
        };
        state.votes = {};
        options.forEach(option => {
            state.votes[option] = 0;
        });

        displayActivePoll();
        displayResults();
        resetForm();
    });

    function displayActivePoll() {
        if (!state.currentPoll) {
            activePoll.innerHTML = '<p class="no-poll-message">No active poll</p>';
            return;
        }

        const pollHTML = `
            <h3>${state.currentPoll.question}</h3>
            <div class="options">
                ${state.currentPoll.options.map(option => `
                    <div class="poll-option" data-option="${option}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        `;
        activePoll.innerHTML = pollHTML;

        // Add click handlers for voting
        const pollOptions = activePoll.getElementsByClassName('poll-option');
        Array.from(pollOptions).forEach(option => {
            option.addEventListener('click', handleVote);
        });
    }

    function handleVote(event) {
        const selectedOption = event.currentTarget.dataset.option;
        
        // Remove previous selection
        const options = document.getElementsByClassName('poll-option');
        Array.from(options).forEach(option => {
            option.classList.remove('selected');
        });

        // Add selection to clicked option
        event.currentTarget.classList.add('selected');

        // Update votes
        state.votes[selectedOption]++;
        displayResults();
    }

    function displayResults() {
        if (!state.currentPoll) {
            pollResults.innerHTML = '';
            return;
        }

        const totalVotes = Object.values(state.votes).reduce((a, b) => a + b, 0);
        const resultsHTML = `
            <h3>Total votes: ${totalVotes}</h3>
            ${Object.entries(state.votes).map(([option, votes]) => {
                const percentage = totalVotes ? ((votes / totalVotes) * 100).toFixed(1) : 0;
                return `
                    <div class="result-item">
                        <p>${option}: ${votes} votes (${percentage}%)</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
        pollResults.innerHTML = resultsHTML;
    }

    function resetForm() {
        document.getElementById('question').value = '';
        optionsContainer.innerHTML = `
            <input type="text" class="option-input" placeholder="Option 1">
            <input type="text" class="option-input" placeholder="Option 2">
        `;
    }
});
