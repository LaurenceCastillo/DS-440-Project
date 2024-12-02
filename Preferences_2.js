import wixData from 'wix-data';
import wixUsers from 'wix-users';

$w.onReady(function () {
    $w("#button4").onClick(() => {
        // Get selected genres from the checkbox group
        let selectedGenres = $w("#checkboxGroup1").value; // Returns an array of selected genres

        // Log selected genres for debugging
        console.log("Selected genres:", selectedGenres);

        // Ensure `selectedGenres` is not empty
        if (!selectedGenres || selectedGenres.length === 0) {
            console.error("No genres selected. Please select at least one genre.");
            return; // Stop execution if no genres are selected
        }

        // Get the oldest year from input
        let oldestYear = parseInt($w("#input1").value, 10);
        console.log("Oldest year entered:", oldestYear);

        // Ensure the year is valid
        if (isNaN(oldestYear) || oldestYear <= 0) {
            console.error("Invalid year entered. Please enter a valid number.");
            return; // Stop execution if the year is invalid
        }

        // Fetch the current user's ID
        let userId = wixUsers.currentUser.id;
        console.log("User ID:", userId);

        // Save or update preferences
        wixData.query("UserPreferences")
            .eq("userId", userId)
            .find()
            .then((results) => {
                // Prepare the new preferences entry
                let newEntry = {
                    userId: userId,
                    preferredGenres: selectedGenres,
                    oldestYear: oldestYear,
                };
                console.log("New preferences entry being processed:", newEntry);

                if (results.items.length > 0) {
                    // Update existing preferences
                    let existingId = results.items[0]._id; // Get the existing document's ID
                    wixData.update("UserPreferences", { ...newEntry, _id: existingId })
                        .then(() => {
                            console.log("Preferences updated successfully:", newEntry);
                        })
                        .catch((err) => {
                            console.error("Error updating preferences:", err);
                        });
                } else {
                    // Insert new preferences
                    wixData.insert("UserPreferences", newEntry)
                        .then(() => {
                            console.log("Preferences saved successfully:", newEntry);
                        })
                        .catch((err) => {
                            console.error("Error saving preferences:", err);
                        });
                }
            })
            .catch((err) => {
                console.error("Error querying preferences:", err);
            });
    });
});
