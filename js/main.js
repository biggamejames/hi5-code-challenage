/** -- I used a lot of JavaScript actual just to show that I knew --
 ----- how to use it. Normally I would take the easier route and ---
 ----- and only write in jQuery unless JavaScript actual was -------
 ----- needed. Also I don't know if I was suppose to manipulate ----
 ----- the JSON, but the dates on the newer Star Wars movies -------
 ----- weren't correct, so I updated those. I did use --------------
 ----- http://myjson.com/ to temporarily host the json. ------------ **/

// init function that does initial load of page
function init() {
	
	// call the loadJSON function
	loadJSON(function(response) {

		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);

		// call the buildMovieArray function and pass the parsed JSON
		buildMovieArray(actual_JSON);

	});

	// set the onclick events for the filter buttons
	document.getElementById('starWars').onclick = function(){filterUniverse('starWars');};
	document.getElementById('marvel').onclick = function(){filterUniverse('marvel');};
	document.getElementById('alphabetical').onclick = function(){filterAlpha();};
	document.getElementById('releaseDate').onclick = function(){filterDate();};

	// watch the document for these dynamically created
	// elements and then assign click events to them
	// when they exist
	$(document).on('click','.posterLink',function(){

		// get the modal
		$('#myModal').modal('show');

		// assign the title 
		$('#myModal .modal-title').html($(this).attr('data-title'));
		
		// pass the you tube iframe
		$('#myModal .modal-body').html('<iframe class="d-block mx-auto" width="560" height="315" src="https://www.youtube.com/embed/' + $(this).attr('data-video') + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');

	});

	// watch the document for these dynamically created
	// elements and then assign click events to them
	// when they exist
	$(document).on('click','.movieButton',function(){

		// get the modal
		$('#myModal').modal('show');
		
		// assign the title
		$('#myModal .modal-title').html($(this).attr('data-title'));

		// pass the you tube iframe
		$('#myModal .modal-body').html('<iframe class="d-block mx-auto" width="560" height="315" src="https://www.youtube.com/embed/' + $(this).attr('data-video') + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');

	});

}

// XMLHttpRequest function that makes call to temporary json hosting service
function loadJSON(callback) {   

	// new XMLHttpRequest
	var xobj = new XMLHttpRequest();
	
	// set Mime type
	xobj.overrideMimeType("application/json");
	
	// make call to myjson.com for json
	xobj.open('GET', 'https://api.myjson.com/bins/ziycr', true);
	
	// state change event
	xobj.onreadystatechange = function () {
		
		// when the state changes to the appropriate status
		if (xobj.readyState == 4 && xobj.status == "200") {
	
		// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
		callback(xobj.responseText);
	
		}
	
	};
	
	// otherwise send null
	xobj.send(null);  

}

// function to build loop through parsed json and build new movie objects off of each
function buildMovieArray(data) {

	// create the variable
	var movies = data;
	
	// loop through
	for (var i = movies.length - 1; i >= 0; i--) {

		// create the new movie obj
		new movie(movies[i].universe, movies[i].title, movies[i].trailerID, movies[i].released, movies[i].poster);
	
	}

}

// movie obj function
function movie(universe, title, trailerID, released, poster) {

	var movieEl = document.createElement('div'); // Create a div to hold the movie
	var movieUniverseClass = document.createAttribute('class'); // Create the class attribute
	movieUniverseClass.value = 'movieTile col-12 col-md-3 my-3 ' + universe; // Assign appropriate classes to the div
	movieEl.setAttributeNode(movieUniverseClass); // set the attribute

	var movieTitle = document.createElement('h6'); // Create an h3 tag for the movie title
	var movieTitleClass = document.createAttribute('class'); // Create the class attribute
	var movieTitleText = document.createTextNode(title); // create the text node
	movieTitleClass.value = 'movieTitle text-center'; // assign appropriate classes
	movieTitle.setAttributeNode(movieTitleClass); // set the class attribute
	movieTitle.appendChild(movieTitleText); // append the text title to the h6 element

	var posterLink = document.createElement('a'); // Create an a tag to wrap around the poster
	var posterLinkClass = document.createAttribute('class'); // Create the class attribute
	var posterLinkTarget = document.createAttribute('target'); // create the target attribute
	var posterLinkDataVideo = document.createAttribute('data-video'); // create the data attribute
	var posterLinkDataTitle = document.createAttribute('data-title'); // create the data attribute
	posterLinkClass.value = 'posterLink d-block w-75 mx-auto'; // assign the appropriate classes
	posterLinkTarget.value = '_blank'; // assign the appropriate target
	posterLinkDataVideo.value = trailerID; // Assign the youtube url
	posterLinkDataTitle.value = title; // Assign the youtube url
	posterLink.setAttributeNode(posterLinkClass); // Set the Class attribute to the element
	posterLink.setAttributeNode(posterLinkTarget); // Set the target attribute to the element
	posterLink.setAttributeNode(posterLinkDataVideo); // set the data attribute
	posterLink.setAttributeNode(posterLinkDataTitle); // set the data attribute

	var moviePoster = document.createElement('img'); // Create an img tag for the movie poster
	var moviePosterClass = document.createAttribute('class'); // Create the class attribute
	var moviePosterSrc = document.createAttribute('src'); // create the src attribute
	moviePosterClass.value = 'moviePoster img-fluid'; // assign the appropriate classes
	moviePosterSrc.value = 'http:' + poster; // Assign the youtube url
	moviePoster.setAttributeNode(moviePosterSrc); // set the src attribute
	moviePoster.setAttributeNode(moviePosterClass); // set the class attribute
	posterLink.appendChild(moviePoster); // append this to the posterLink element

	var movieDate = document.createElement('p'); // Create a p for the movie release date
	var movieDateClass = document.createAttribute('class'); // Create the class attribute
	var movieDateText = document.createTextNode(released); // create a text node
	movieDateClass.value = 'movieDate text-center font-weight-light font-italic'; // assign appropriate classes
	movieDate.setAttributeNode(movieDateClass); // set the class attribute
	movieDate.appendChild(movieDateText); // append the text node

	var movieButton = document.createElement('a'); // Create a button element to link to the trailer
	var movieButtonClass = document.createAttribute('class'); // Create the class attribute
	var movieButtonRole = document.createAttribute('role'); // Create the role attribute
	var movieButtonText = document.createTextNode('View Trailer'); // create the text node
	var movieButtonDataVideo = document.createAttribute('data-video'); // create the data attribute
	var movieButtonDataTitle = document.createAttribute('data-title'); // create the data attribute
	movieButtonClass.value = 'movieButton btn btn-secondary w-75 mx-auto d-block'; // assign the appropriate classes
	movieButtonRole.value = 'button'; // assign the appropriate role
	movieButtonDataVideo.value = trailerID; // Assign the youtube url
	movieButtonDataTitle.value = title; // Assign the youtube url
	movieButton.setAttributeNode(movieButtonClass); // set the class attribute
	movieButton.appendChild(movieButtonText); // append the text node
	movieButton.setAttributeNode(movieButtonDataVideo); // set the data attribute
	movieButton.setAttributeNode(movieButtonDataTitle); // set the data attribute

	movieEl.appendChild(movieTitle); // append the movieTitle element to the movie div
	movieEl.appendChild(posterLink); // append the posterLink element to the movie div
	movieEl.appendChild(movieDate); // append the movieDate element to the movie div
	movieEl.appendChild(movieButton); // append the movieButton element to the movie div

	document.getElementById('movieContainer').appendChild(movieEl); // assign the movie div to the movie container
}

// function to filter by universe
function filterUniverse(universe) {
	
	// universe is Star Wars
	if (universe === 'starWars') {

		$('.marvel').addClass('d-none invisible'); // assign all marvel movies the appropriate bootstrap classes to hide
		$('.starwars').removeClass('d-none invisible');  // remove all bootstrap classes to hide Star Wars movies

	// universe is Marvel
	} else if (universe === 'marvel') {

		$('.starwars').addClass('d-none visible');  // assign all Star Wars movies the appropriate bootstrap classes to hide
		$('.marvel').removeClass('d-none invisible');  // remove all bootstrap classes to hide marvel movies

	}

}

// function to filter alphabetically
function filterAlpha() {

	// empty the movie container so we can repopulate it with sorted elements
	$('#movieContainer').empty();

	// call the loadJSON function so we can sort it
	// was able to reuse this function
	loadJSON(function(response) {

		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);

		// call the sortJSON function and sort by title
		var sortedJSON = sortJSON(actual_JSON, 'title');
		
		// call the buildMovieArray and pass the sorted JSON
		buildMovieArray(sortedJSON);

	});

	// function to sort json by title
	function sortJSON(data, key) {

		// return the alphabetically sorted data
	    return data.sort(function (a, b) {

	        var x = a[key];

	        var y = b[key];

	        return ((x > y) ? -1 : ((x < y) ? 1 : 0));

	    });

	}

}

// function to filter by release date
function filterDate() {

	// empty the movie container so we can repopulate it with sorted elements
	$('#movieContainer').empty();

	// call the loadJSON function so we can sort it
	loadJSON(function(response) {

		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		
		// call the sortJSON function and sort by release date
		var sortedJSON = sortJSON(actual_JSON, 'released');

		// call the buildMovieArray and pass the sorted JSON
		buildMovieArray(sortedJSON);

	});

	// function to sort json
	function sortJSON(data, key) {

		// reurn the sorted date
	    return data.sort(function (a, b) {
	        
	        // convert to date
	        var x = new Date(a[key]);
	        
	        // convert to date
	        var y = new Date(b[key]);
	        
	        // return results
	        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	    
	    });

	}

}

function modal() {

}

// Initialize it all onload
window.onload = init;