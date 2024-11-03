import wixData from 'wix-data';
import wixUsers from 'wix-users';

$w.onReady(function () {
    let userId = wixUsers.currentUser.id;
    console.log("User ID:", userId);  
    wixData.query("UserPreferences")
        .eq("_id", userId)
        .find()
        .then((userResult) => {
            console.log("User Preferences Query Result:", userResult);  
            if (userResult.items.length > 0) {
                let userPreferences = userResult.items[0];
                let preferredGenres = userPreferences.preferredGenres;
                let oldestYear = userPreferences.oldestYear;
                console.log("Preferred Genres:", preferredGenres);
                console.log("Oldest Year Filter:", oldestYear);
                let contentQuery = wixData.query("Import657");
                preferredGenres.forEach(genre => {
                    contentQuery = contentQuery.contains("genres", genre);
                });
                contentQuery = contentQuery.find()
                    .then((movieResults) => {
                        console.log("Movie Results Before Year Filtering:", movieResults.items);  
                        
                        let filteredMovies = movieResults.items.filter(movie => {
                            let title = movie.title;
                            console.log("Processing Title:", title);  
                            let yearMatch = title.match(/\((\d{4})\)$/);  
                            if (yearMatch) {
                                let movieYear = parseInt(yearMatch[1], 10);
                                return movieYear >= oldestYear;
                            }
                            return false;  
                        });

                        console.log("Filtered Movies by Year:", filteredMovies);  

                        if (filteredMovies.length > 0) {
                            $w("#repeater1").data = filteredMovies.slice(0, 10);  

                            $w("#repeater1").onItemReady(($item, itemData) => {
                                $item("#text3").text = itemData.title;
                                $item("#text4").text = itemData.genres.replace(/\|/g, ", ");  
                            });
                        } else {
                            console.log("No movies found matching the year and genre criteria.");
                        }
                    })
                    .catch((err) => {
                        console.error("Error fetching movies with year filter:", err);
                    });
            } else {
                console.log("No user preferences found.");
            }
        })
        .catch((err) => {
            console.error("Error fetching user preferences:", err);
        });
});
