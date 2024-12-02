import wixData from 'wix-data';
import wixUsers from 'wix-users';
import { fetch } from 'wix-fetch';

$w.onReady(function () {
    let userId = wixUsers.currentUser.id; // Get the logged-in user's ID

    // Initially hide the "No Recommendations" message
    $w("#textMask4").hide();

    // Fetch user preferences using userId
    wixData.query("UserPreferences")
        .eq("userId", userId) // Query by userId
        .find()
        .then((results) => {
            if (results.items.length > 0) {
                let preferences = results.items[0]; // Retrieve the user's preferences
                let payload = {
                    userId: userId,
                    preferredGenres: preferences.preferredGenres, // Array of genres
                    oldestYear: preferences.oldestYear // Number
                };

                // Log payload being sent to Flask API
                console.log("Payload being sent to Flask API:", payload);

                // Call Flask API for recommendations (Custom ngrok link)
                fetch("https://drum-normal-doe.ngrok-free.app/hybrid-recommendations", { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload) // Send preferences as payload
                })
                .then((response) => {
                    // Log the raw response
                    console.log("Raw response from Flask API:", response);

                    // Check response status
                    if (!response.ok) {
                        throw new Error(`API returned status: ${response.status}`);
                    }

                    // Parse response JSON
                    return response.json();
                })
                .then((recommendations) => {
                    // Log recommendations received from Flask API
                    console.log("Recommendations received:", recommendations);

                    if (recommendations.length > 0) {
                        // Add a unique _id to each recommendation
                        const recommendationsWithId = recommendations.map((rec, index) => ({
                            ...rec,
                            _id: String(index) // Add unique _id for each item
                        }));

                        // Populate the repeater with recommendations
                        $w("#repeater1").data = recommendationsWithId.slice(0, 10); // Limit to top 10
                        $w("#repeater1").onItemReady(($item, itemData) => {
                            $item("#text3").text = itemData.title; // Movie title
                            $item("#text4").text = itemData.genres; // Genres
                        });
                        $w("#textMask4").hide(); // Hide "No Recommendations" message
                    } else {
                        console.log("No recommendations found.");
                        $w("#repeater1").data = []; // Clear repeater data
                        $w("#textMask4").show(); // Show "No Recommendations" message
                    }
                })
                .catch((err) => {
                    // Log error during fetch or processing
                    console.error("Error fetching recommendations:", err);
                });
            } else {
                console.log("No preferences found for the user.");
                $w("#textMask4").show(); // Show "No Recommendations" message
            }
        })
        .catch((err) => {
            // Log error during query for user preferences
            console.error("Error querying preferences:", err);
        });
});
