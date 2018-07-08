// user can input

// user clicks button search api for photo of user date
$(document).ready(function(){


  $("form").on("submit", function(e){
    e.preventDefault();
    var movie = $("#movieName").val()
    var apiKey = "464729fb";
    var apiURL = "http://www.omdbapi.com/?apikey=464729fb&t=" + encodeURI(movie);


    $.ajax({
      url: apiURL,
      // Work with the response
      success: function(response) {
        console.log(response.Director)
        getDirector(response.Director)
        $('img').attr("src", response.Poster)
      },
      error: function(r){
        console.log(r)
      }
    });

    function getDirector(dm){

      var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ dm +"&format=json&callback=?";

      $.ajax({
          type: "GET",
          url: url,
          contentType: "application/json; charset=utf-8",
          async: false,
          dataType: "json",
          success: function (data){
              console.log(data[2]["0"]);
          },
          error: function (errorMessage) {
          }
      });

    }


  });

});











function getArrests(playerName){
  $.ajax({
    url: 'http://nflarrest.com/api/v1/player/arrests/'+ encodeURI(playerName),
    success: function(r){
      console.log(r)
      r.forEach(function(el){
        $('ul').append('<li><span>'+playerName+' </span> <span class="record">'+el.Date+'</span></li>')
      })

    },
    error: function(er){
      console.log(er)
    }
  })
}
$('button').on('click', function(){
  $('li').remove();
  var team = $("#team").val()
  team = encodeURI(team)
  $.ajax({
    url: 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t='+team,
    success: function(r){
      console.log(r)
      r.player.forEach(function(el){
        getArrests(el.strPlayer)
      })
    },
    error: function(er){
      console.log(er)
    }
  })

});
