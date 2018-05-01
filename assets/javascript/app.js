$(document).ready(function () {
    // Creating an array that holds all the categories of gifs that I want to display
    var topics = [
        "cats",
        "birds",
        "fish",
        "deer",
        "lions",
        "beaver",
        "rabbit",
        "octopus"
    ];
    // get input from textbox, save that information and append topics[i].
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var newAnimal = $("#animal").val();
        console.log("newAnimal: " + newAnimal);
        topics.push(newAnimal);
    });
    
    for (var i = 0; i < topics.length; i++) {
        // Creating one button at a time
        var button = $("<button>");
        // Adding classes to the button we just created
        button.addClass("btn btn-info");
        // Adding text/label to the button we just created
        button.text(topics[i]);
        // Once a button is clicked, the following code executes
        button.on("click", function () {
            // First things first, it empties the div of previously loaded gifs
            $("#gifs").empty();
            // buttonText is being created to add it as a variable at the end of the URL
            var buttonText = $(this).text();
            // console.log(buttonText);
            var API_KEY = "AqC8LA9EVbLuMtO5IJ87fgPSKFh67ybW";
            var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=" + buttonText;
            console.log(requestUrl);
            $.ajax({
                method: "GET",
                url: requestUrl
            }).then(function (response) {
                console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    var img = createImage(response, i);
                    $("#gifs").append(img);
                }
            });
        });
        $("#buttons").append(button);
    }

    function createImage(response, i) {
        var img = $("<img>");
        img.addClass("giphy");
        // set the src of the element
        img.attr("src", response.data[i].images.downsized.url);
        img.attr("data-animated", response.data[i].images.downsized.url);
        img.attr("data-still", response.data[i].images.downsized_still.url);
        img.attr("data-state", "animated");

        var gifCard = $("<div class='gif-card'>");
        var pRating = $("<p>");

        gifCard.append(img);
        pRating.append("Rating: " + response.data[i].rating);
        gifCard.append(pRating);
        console.log("gifCard = " + gifCard)
        return gifCard;
    }

    // Clicking on amy image will trigger this function
    $(document).on("click", ".giphy", function () {
        console.log("image: " + this);
        var state = $(this).attr("data-state");
        console.log(state);
        // If data-state is animated, change to still. 
        if (state === "animated") {
            $(this).attr("data-state", "still");
            console.log("if statement is working");
            // Change the src of the animated to still version
            $(this).attr("src", $(this).attr("data-still"));
        } else {
            $(this).attr("data-state", "animated");
            console.log("else statement is working");
            // else change the state to animated and change src to still version
            $(this).attr("src", $(this).attr("data-animated"));
        }
    });
});
 


