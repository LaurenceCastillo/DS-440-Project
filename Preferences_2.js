import wixData from 'wix-data';
import wixUsers from 'wix-users';

$w.onReady(function () {
    $w("#button4").onClick(() => {
        let selectedGenres = $w("#checkboxGroup1").value;
        let oldestYear = parseInt($w("#input1").value, 10);
        let userId = wixUsers.currentUser.id;

        wixData.query("UserPreferences")
            .eq("_id", userId)
            .find()
            .then((results) => {
                let newEntry = {
                    "_id": userId,
                    "preferredGenres": selectedGenres,
                    "oldestYear": oldestYear,
                };

                if (results.items.length > 0) {
                    wixData.update("UserPreferences", newEntry)
                        .then(() => console.log("Preferences updated successfully"))
                        .catch(err => console.error("Error updating preferences:", err));
                } else {
                    wixData.insert("UserPreferences", newEntry)
                        .then(() => console.log("Preferences saved successfully"))
                        .catch(err => console.error("Error saving preferences:", err));
                }
            })
            .catch(err => console.error("Error fetching preferences:", err));
    });
});
