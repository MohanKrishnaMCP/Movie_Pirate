// Since, its a JS file... I heard someone say "If I die and go to hell,
// I don't have to see JavaScript", I mean come on!! where do you think JavaScript came from...!!
//Born and raised in hell...but still a great language.

var movie_poster = [];

function movie_list(){

	var search_var = document.getElementById("search").value;
	var card = "";

//fetch reults of 10 pages, 100 movies if available

	for(var i=0; i <= 10; i++){
		var url = 'http://www.omdbapi.com/?apikey=2e1e970c&s='+search_var+'&page='+i;
		
		fetch(url).then(function(resp){
			return resp.json();
		})
		.then(function(data){

	//To handle "unidentified" and "null" type error
		try{
			var num = Object.keys(data.Search).length;
		}
		catch(e){

			if (e instanceof TypeError) {        
		        var num = 0;
		    }	
		}

			for(var j=0; j < num; j++){			
				movie_poster.push(data.Search[j]);
			}
			return movie_poster;	//return movie_poster with the information
		});
	}

	num = Object.keys(movie_poster).length;

//to display atmost 8 posters in the screen,
	if (num <= 8){
		var num_less = num;
	}
	else{
		var num_less = 8;
	}

//display upto 8 movies
	for(var j=0; j < num_less; j++){
		var poster_url = JSON.stringify(movie_poster[j].Poster).replace(/[""]/g, " ");
		var title = JSON.stringify(movie_poster[j].Title).replace(/[""]/g, " ");
		document.getElementById("search_for").innerHTML = "<br><h2 style='color: white; margin-left:20px;'>Search result for: "+search_var+" </h2><br>";
		var card = card + "<div class='card grid-item'><img alt='' onerror='this.onerror=null; this.src=`assets/no-image-found.jpg`' onclick='movie_modal("+JSON.stringify(movie_poster[j])+")' class='poster_img' src='"+poster_url+"'><h3 class='poster_title'>"+title+"</h3></div>";
		document.getElementById("movies").innerHTML = card;
		window.location.href = "#movies";
	}

//if > 8 movies, show showmore button and if clicked more movies, 90 more
	if(num > 8){
		card2 = " ";
		var showmore = "<div class='showmore_btn' id='showmore_btn'>showmore</div>";
		document.getElementById("showmore").innerHTML = showmore;
		document.getElementById("showmore_btn").addEventListener("click", function(){
			document.getElementById("showmore_btn").style.display = "none";
		for(var j=8; j < num; j++){
				var poster_url = JSON.stringify(movie_poster[j].Poster).replace(/[""]/g, " ");
				var title = JSON.stringify(movie_poster[j].Title).replace(/[""]/g, " ");
				if (movie_poster[j] == "undefined"){
					document.getElementByClass("grid-item").style.display = "none";
					console.log("undefined detected");
				}
				var card2 = card2 + "<div class='card grid-item'><img alt='' onerror='this.onerror=null; this.src=`assets/no-image-found.jpg`' onclick='movie_modal("+JSON.stringify(movie_poster[j])+")' class='poster_img' src='"+poster_url+"'><h3 class='poster_title'>"+title+"</h3></div>";
				document.getElementById("more_movies").innerHTML = card2;
		}});
	}
}



//display movie information in modal, if clicked.
function movie_modal(movie_poster)
{
	var modal = document.getElementById("movie_modal");
	var movie = document.getElementById("movie_details");
	var span = document.getElementsByClassName("close")[0];
	var movie_details = []

	modal.style.display = "block";

	var url = 'http://www.omdbapi.com/?apikey=2e1e970c&t='+movie_poster.Title+'&plot=full';
	fetch(url).then(function(resp){
			return resp.json()
		})
		.then(function(data){
			movie_details.push(data);
			movie.innerHTML = "<div><h1 style='text-align: center;'>"+movie_details[0].Title+"</h1><p style='text-align: center;'>By: "+movie_details[0].Director+"</p><br><div style='text-align: center;'><img onerror='this.onerror=null; this.src=`assets/no-image-found.jpg`' src ='"+JSON.stringify(movie_details[0].Poster).replace(/[""]/g," ")+"'></div><br><br><span style='font-weight: 600'>Year: </span>"+ movie_details[0].Year+
				"<br><br><span style='font-weight: 600'>Imdb rating: </span> "+movie_details[0].imdbRating+"<h3>Cast:</h3><p>"+movie_details[0].Actors+"</p><h3>Plot:</h3><p>"+movie_details[0].Plot+"</p></div>";
	});

	//close when close is pressed 
	span.onclick = function() {
	  modal.style.display = "none";
	}

	//close if clicked outside of modal
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
}