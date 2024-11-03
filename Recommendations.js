import wixData from 'wix-data';

$w.onReady(function () {
    wixData.query("UserPreferences")
        .find()
        .then((results) => {
            if (results.items.length > 0) {
                let userPreferences = results.items[0];
                let preferredGenres = userPreferences.preferredGenres;

                if (preferredGenres && preferredGenres.length > 0) {
                    
                    let query = wixData.query("Import657");  
                    preferredGenres.forEach(genre => {
                        query = query.contains("genres", genre);
                    });

                    query.limit(10)
                        .find()
                        .then((movieResults) => {
                            console.log("Recommended Movies: ", movieResults.items);
                            $w("#repeater1").data = movieResults.items;

                            $w("#repeater1").onItemReady(($item, itemData) => {
                                $item("#text3").text = itemData.title;
                                $item("#text4").text = itemData.genres;
                            });
                        })
                        .catch((err) => {
                            console.error("Error fetching recommendations: ", err);
                        });
                } else {
                    console.error("No genres selected.");
                }
            } else {
                console.log("No user preferences found.");
            }
        })
        .catch((err) => {
            console.error("Error fetching user preferences: ", err);
        });
});
