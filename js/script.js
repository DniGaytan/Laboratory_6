var nextPage = ''
var prevPage = ''
var key = 'AIzaSyAvLXiPM4IBLvrlnx2kjS-iqR3oB-CHKYk'
var key2 = 'AIzaSyDE14XaVA6R17PJVmzh61YQq__QZ-yg1zY'
var resultado = ''
//tengo dos keys porque se me acabaron las queries en key2, no se cuantas queries me queden disponibles en key.

var api_url = 'https://www.googleapis.com/youtube/v3/search'

$("form").on( "submit", function(event){
  event.preventDefault();
  $("#results").empty();
  nextPage = ''
  prevPage = ''

  resultado = $("#input-text").val();


  $.ajax({
    cache: false,
    url: api_url + "?key=" + key +"&q=" + resultado + '&part=snippet' + "&maxResults=10",
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function(result){
      console.log(result);
      nextPage = result.nextPageToken;
      for(var i = 0; i < result.items.length; i++){
        var divElement = document.createElement('div');
        var pElement = "<p class='class-title-video' id='"+ result.items[i].id.videoId +"' >" + result.items[i].snippet.title + "</p>";
        var childDivElement = document.createElement('div');
        $(divElement).addClass("class-video");
        $(pElement).addClass('class-title-video');
        $(childDivElement).addClass('class-thumnail-video');
        $(pElement).html = result.items[i].snippet.title;
        $(childDivElement).prepend('<img class="class-thumbnail-img" src="' + result.items[i].snippet.thumbnails.default.url + '" />');

        $(divElement).append(pElement, childDivElement);
        $('#results').append(divElement);
      }
    }
  });
});

$("#previous-button").click(function(){
  $("#results").empty();
  $.ajax({
    cache: false,
    url: api_url + "?key=" + key +"&q=" + resultado + "&pageToken=" + prevPage + '&part=snippet' + "&maxResults=10",
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function(result){
      console.log(result);
      nextPage = result.nextPageToken;
      prevPage = result.prevPageToken;
      for(var i = 0; i < result.items.length; i++){
        var divElement = document.createElement('div');
        var pElement = "<p class='class-title-video'>" + result.items[i].snippet.title + "</p>";
        var childDivElement = document.createElement('div');
        $(divElement).addClass("class-video");
        $(pElement).addClass('class-title-video');
        $(childDivElement).addClass('class-thumnail-video');
        $(pElement).html = result.items[i].snippet.title;
        $(childDivElement).prepend('<img class="class-thumbnail-img" src="' + result.items[i].snippet.thumbnails.default.url + '" />');

        $(divElement).append(pElement, childDivElement);
        $('#results').append(divElement);
      }
    }
  });
});

$("#next-button").click(function(){
  $("#results").empty();
  $.ajax({
    cache: false,
    url: api_url + "?key=" + key +"&q=" + resultado + "&pageToken=" + nextPage + '&part=snippet' + "&maxResults=10",
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function(result){
      console.log(result);
      nextPage = result.nextPageToken;
      prevPage = result.prevPageToken;
      for(var i = 0; i < result.items.length; i++){
        var divElement = document.createElement('div');
        var pElement = "<p class='class-title-video'>" + result.items[i].snippet.title + "</p>";
        var childDivElement = document.createElement('div');
        $(divElement).addClass("class-video");
        $(pElement).addClass('class-title-video');
        $(childDivElement).addClass('class-thumnail-video');
        $(pElement).html = result.items[i].snippet.title;
        $(childDivElement).prepend('<img class="class-thumbnail-img" src="' + result.items[i].snippet.thumbnails.default.url + '" />');

        $(divElement).append(pElement, childDivElement);
        $('#results').append(divElement);
      }
    }
  });
});

$("#results").on("click", ".class-video", function() {
  var ytTab = window.open('https://www.youtube.com/watch?v='+ this.children[0].id + '', '_blank');
  ytTab.focus();
});
