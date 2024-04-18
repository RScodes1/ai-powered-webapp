document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const titleInput = document.getElementById('title');
    const themeInput = document.getElementById('theme');
    const moodInput = document.getElementById('mood');
    const poemContainer = document.getElementById('poem-container');

    generateBtn.addEventListener('click', async function() {
        const title = titleInput.value.trim();
        const theme = themeInput.value.trim();
        const mood = moodInput.value.trim();

        if (!title || !theme || !mood) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, theme, mood })
            });

            if (!response.ok) {
                throw new Error('Failed to generate poem.');
            }

            const data = await response.json();
            const poem = data.poem;
            poemContainer.innerHTML = `<p>${poem}</p>`;
        } catch (error) {
            console.error(error);
            alert('An error occurred while generating the poem.');
        }
    });
});
