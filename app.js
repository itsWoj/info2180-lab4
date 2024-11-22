function sanitizeInput(input) {
    const element = document.createElement('div');
    if (input) {
        element.innerText = input;
        return element.innerHTML;  
    }
    return input;
}

// Event listener for the search button click
document.getElementById("searchButton").addEventListener("click", function() {
    const query = sanitizeInput(document.getElementById("searchInput").value.trim());

    fetch(`superheroes.php?query=${encodeURIComponent(query)}`)
        .then(response => response.json()) 
        .then(data => {
            const resultDiv = document.getElementById("result");

            resultDiv.innerHTML = '';

            if (data.message) {
                resultDiv.innerHTML = `<p>${data.message}</p>`;
            } else {
                data.forEach(superhero => {
                    const superheroDiv = document.createElement("div");
                    superheroDiv.innerHTML = `
                        <h3>${superhero.alias}</h3>
                    `;
                    if (query) {
                        superheroDiv.innerHTML += `
                            <h4>A.K.A ${superhero.name}</h4>
                            <p><strong>Biography:</strong> ${superhero.biography}</p>
                        `;
                    }
                    resultDiv.appendChild(superheroDiv);
                });
            }
        })
        .catch(error => console.error('Error:', error));
});
