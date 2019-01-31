$(document).ready(function () {

	$("#add-movie").on("click", function (event) {
		event.preventDefault();

		var movie = $("#movie-input").val().trim();

		movies.push(movie);
		console.log(movies);
		renderButtons();
	});

	var movies = ["The Terminator", "Star Wars", "Lord of the Rings"];

	function renderButtons() {
		$("#movies-view").empty();

		for (var i = 0; i < movies.length; i++) {

			var a = $("<button class='btn btn-primary'>");
			a.addClass("movie");
			a.attr('id', 'buttonPress');
			a.attr("data-name", movies[i]);
			a.text(movies[i]);
			$("#movies-view").append(a);

			$(".movie").on("click", function () {
				$("#gifs-here").empty();
				var person = $(this).attr("data-name");

				var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
					person + "&api_key=dc6zaTOxFJmzC&limit=10";

				$.ajax({
						url: queryURL,
						method: "GET"
					})
					.then(function (response) {
						console.log(response.data);
						var results = response.data;
						for (var i = 0; i < results.length; i++) {
							if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

								var gifDiv = $("<div>");
								var rating = results[i].rating;
								var p = $("<p>").text("Rating: " + rating);

								var personImage = $("<img class='gif'>");
								personImage.attr("src", results[i].images.fixed_height.url);

								gifDiv.append(p);
								gifDiv.append(personImage);

								$("#gifs-here").prepend(gifDiv);
								$("#gifs-here1").prepend(gifDiv);

							}
						}
					});
			});
		}
		$('body').on('click', '.gif', function () {
			var src = $(this).attr("src");
			if ($(this).hasClass('playing')) {
				//stop
				$(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
				$(this).removeClass('playing');
			} else {
				//play
				$(this).addClass('playing');
				$(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
			}
		});
	}

	renderButtons();

});