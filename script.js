document.addEventListener('DOMContentLoaded', () => {
      const termsContainer = document.querySelector('.terms');
      const definitionsContainer = document.querySelector('.definitions');
      const terms = Array.from(document.querySelectorAll('.term'));
      const definitions = Array.from(document.querySelectorAll('.definition'));
      const feedback = document.getElementById('feedback');
      const resetButton = document.getElementById('reset');
      let matchedCount = 0;

      // Shuffle function
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      // Shuffle terms and definitions
      shuffle(terms);
      shuffle(definitions);

      // Append shuffled terms and definitions back to their containers
      terms.forEach(term => termsContainer.appendChild(term));
      definitions.forEach(definition => definitionsContainer.appendChild(definition));

      terms.forEach(term => {
        term.addEventListener('dragstart', dragStart);
        term.addEventListener('click', flipCard);
      });

      definitions.forEach(definition => {
        definition.addEventListener('dragover', dragOver);
        definition.addEventListener('drop', drop);
      });

      resetButton.addEventListener('click', resetExercise);

      function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.match);
      }

      function dragOver(e) {
        e.preventDefault();
      }

      function drop(e) {
        e.preventDefault();
        const termMatch = e.dataTransfer.getData('text/plain');
        const definitionMatch = e.target.dataset.match;

        if (termMatch === definitionMatch) {
          e.target.style.backgroundColor = '#d4edda';
          matchedCount++;
          if (matchedCount === terms.length) {
            feedback.textContent = 'Correct! All items matched.';
          }
        } else {
          e.target.style.backgroundColor = '#f8d7da';
          feedback.textContent = 'Incorrect match. Try again!';
        }
      }

      function resetExercise() {
        terms.forEach(term => {
          term.style.backgroundColor = '#f9f9f9';
          term.classList.remove('flipped');
        });
        definitions.forEach(definition => {
          definition.style.backgroundColor = '#f9f9f9';
        });
        feedback.textContent = '';
        matchedCount = 0; // Reset matched count
      }

      function flipCard(e) {
        e.currentTarget.classList.toggle('flipped');
      }
    });
