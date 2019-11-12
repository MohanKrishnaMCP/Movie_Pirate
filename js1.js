var movie_poster = [];

function movie_list(){
	var search_var = document.getElementById("search").value;
	var card = "";

	for(var i=0; i <= 10; i++){
	var url = 'http://www.omdbapi.com/?apikey=2e1e970c&s='+search_var+'&page='+i;
	
	fetch(url).then(function(resp){
		return resp.json()
	})
	.then(function(data){
		var num = Object.keys(data.Search).length;
		for(var j=0; j < num; j++){			
		movie_poster.push(data.Search[j]);
		}
		return movie_poster;	
	});

	}

	num = Object.keys(movie_poster).length;
	console.log(num);
	if (num < 10){
		var num_less = num;
	}
	else{
		var num_less = 8;
	}

	for(var j=0; j < num_less; j++){
	var poster_url = JSON.stringify(movie_poster[j].Poster).replace(/[""]/g, " ");
	var title = JSON.stringify(movie_poster[j].Title).replace(/[""]/g, " ");
	var card = card + "<div class='card grid-item'><img alt='' onerror= 'this.onerror=null; this.src=`no-image-found.jpg`' onclick='movie_modal("+JSON.stringify(movie_poster[j])+")' class='poster_img' style='max-width: 15vw;' src='"+poster_url+"'><h3 class='poster_title'>"+title+"</h3></div>";
	document.getElementById("movies").innerHTML = card;
	}
	//document.getElementByClass("sarch_bar").style.display = "none";
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
			var card2 = card2 + "<div class='card grid-item'><img alt='' onerror= 'this.onerror=null; this.src=`no-image-found.jpg`' onclick='movie_modal("+JSON.stringify(movie_poster[j])+")' style='max-width: 15vw;' src='"+poster_url+"'><h3 class='poster_title'>"+title+"</h3></div>";
			document.getElementById("more_movies").innerHTML = card2;
	
		}});
	}
}

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
	//	movie_details[0]=data;
movie_details.push(data);
console.log(movie_details[0]);

movie.innerHTML = "<div><h1> "+movie_details[0].Title+"</h1><p>By: "+movie_details[0].Director+"</p><br><div style='margin-left:auto; margin-right: auto;'><img src ='"+JSON.stringify(movie_details[0].Poster).replace(/[""]/g," ")+"'></div><br><br><span style='font-weight: 600'>year:</span>"+ movie_details[0].Year+
	"<br><span style='font-weight: 600'>Imdb:</span> "+movie_details[0].ImdbRating+"<h3>Cast:</h3><p>"+movie_details[0].Actors+"</p><h3>plot:</h3><p>"+movie_details[0].Plot+"</p></div>";
});

span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

}