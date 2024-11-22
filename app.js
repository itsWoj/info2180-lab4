// Listen for the "click" event on the search button
document.getElementById("searchButton").addEventListener("click", function() {
    // Use the Fetch API to request data from superheroes.php
    fetch("superheroes.php")
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            // Extract the superhero aliases into an array
            const aliases = data.map(superhero => superhero.alias);

            // Join the aliases into a string with line breaks
            const alertMessage = aliases.join("\n");

            // Show the aliases in an alert box, each alias on a new line
            alert("Superheroes:\n" + alertMessage);
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors that occur during the fetch
        });
});
