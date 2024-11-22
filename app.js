document.getElementById("searchButton").addEventListener("click", function() {
    // Get the search query from the text field
    const query = document.getElementById("searchInput").value.trim();

    // Send the query to superheroes.php via a GET request
    fetch(`superheroes.php?query=${encodeURIComponent(query)}`)
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            const resultDiv = document.getElementById("result");

            // Clear previous results
            resultDiv.innerHTML = '';

            // Check if the search query is empty and display all superheroes in bullet points
            if (query === '') {
                const heroList = document.createElement("ul");
                data.forEach(superhero => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `${superhero.alias}`;
                    heroList.appendChild(listItem);
                });
                resultDiv.appendChild(heroList);
            } else {
                // Display the superhero details (alias, name, biography) when a query is present
                if (data.length > 0) {
                    data.forEach(superhero => {
                        const superheroDiv = document.createElement("div");
                        superheroDiv.innerHTML = `
                            <h3>${superhero.alias}</h3>
                            <h4>A.K.A ${superhero.name}</h4>
                            <p>${superhero.biography}</p>
                        `;
                        resultDiv.appendChild(superheroDiv);
                    });
                } else {
                    const notFoundMessage = document.createElement("p");
                    notFoundMessage.textContent = "SUPERHERO NOT FOUND.";
                    notFoundMessage.className = "not-found"; // Add a class to style the message
                    resultDiv.appendChild(notFoundMessage);
                }
            }
        })
        .catch(error => console.error('Error:', error));
});
