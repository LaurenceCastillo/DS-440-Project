import wixData from 'wix-data';

$w.onReady(function () {
    $w("#button4").onClick(() => {
        let selectedGenres = $w("#checkboxGroup1").value;  
        
        let newEntry = {
            "preferredGenres": selectedGenres
        };

        wixData.insert("UserPreferences", newEntry)
            .then((result) => {
                console.log("Genres submitted successfully");
            })
            .catch((err) => {
                console.error("Error submitting genres: ", err);
            });
    });
});
