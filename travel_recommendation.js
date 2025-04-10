document.addEventListener("DOMContentLoaded", () => {
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => window.recommendationData = data)
        .catch(error => console.error("Error fetching data:", error));
});

function searchRecommendations() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = "";

    if (!window.recommendationData) return;

    const matches = window.recommendationData.places.filter(place => {
        return place.keywords.some(keyword => keyword.toLowerCase().includes(input));
    });

    if (matches.length === 0) {
        recommendationsDiv.innerHTML = "<p>No recommendations found.</p>";
        return;
    }

    matches.forEach(place => {
        const placeDiv = document.createElement("div");
        placeDiv.innerHTML = `
            <h2>${place.name}</h2>
            <img src="${place.imageUrl}" alt="${place.name}" width="300"><br>
            <p>${place.description}</p>
        `;
        recommendationsDiv.appendChild(placeDiv);
    });
}

function clearRecommendations() {
    document.getElementById("recommendations").innerHTML = "";
    document.getElementById("searchInput").value = "";
}
