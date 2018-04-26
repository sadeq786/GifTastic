$(document).ready(function () {
    var topics = [
        "cats",
        "birds",
        "fish",
        "deer",
        "lions"
    ];
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info");
        button.text(topics[i]);
        // console.log(this);
        button.on("click", function () {

            $("#gifs").empty();
            ;            // console.log(this);
            var buttonText = $(this).text();
            // console.log(buttonText);
            var API_KEY = "AqC8LA9EVbLuMtO5IJ87fgPSKFh67ybW";
            var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=" + buttonText;
            console.log(requestUrl);

            $.ajax({
                method: "GET",
                url: requestUrl
            }).then(function (response) {
                // code goes here  
                // create the element
                for (var i = 0; i < response.data.length; i++) {
                    var img = $("<img>");
                    // set the src of the element
                    img.attr("src", response.data[i].images.downsized.url);
                    img.attr("data-animated", response.data[i].images.downsized.url);
                    img.attr("data-still", response.data[i].images.downsized_still.url);
                    img.attr("data-state", "animated");

                    img.on("click", function () {
                        console.log(this);
                        var state = $(this).attr("data-state");
                        console.log(state);
                        // If data-state is animated, change to still. 
                        if (state === "animated") {
                            $(this).attr("data-state", "still");
                            console.log("if is working");
                            console.log();
                            // Change the src of the animated to still version
                            $(this).attr("src", $(this).attr("data-still"));
                        } else {
                            $(this).attr("data-state", "animated");
                            console.log("else is working");
                            // else change the state to animated and change src to still version
                            $(this).attr("src", $(this).attr("data-animated"));
                        }
                    });
                    // attach the element to the body
                    $("#gifs").append(img);
                }
            });

        });
        $("#buttons").append(button);

    }
});
