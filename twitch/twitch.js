

$(document).ready(function() {
   ajaxCall('channels','austintackaberry');
   ajaxCall('streams','austintackaberry');
   ajaxCall('channels','freecodecamp');
   ajaxCall('streams','freecodecamp');
   ajaxCall('channels','WhiplashOne');
   ajaxCall('streams','WhiplashOne');
});

function ajaxCall(type, username) {
  $.ajax({
    type: "GET",
    url : "https://api.twitch.tv/kraken/" + type + "/" + username,
    headers: {
      'Client-ID': 'dwqdxlwfbuqe8y85kiqq2prb2b5p7l'
    },
    success: function(data) {
    return manipulation(type, username, data);
  }});
}

function manipulation(type, username, data) {
  var html = '';
  if (type == 'channels') {
    html = '<img src =' + data.logo + ' width="25" height ="25" class="img-rounded">';
    $("p." + username +" > span.img").append(html);
  }
  if (type == 'streams' && data.stream == null) {
    html += " <a href= 'https://www.twitch.tv/" + username + "'>" + username +"</a> is not streaming<br>";
    $("p." + username + " > span.words").append(html);
  }
  else if (type == 'streams') {
    html += " <a href= 'https://www.twitch.tv/" + username + "'>" + username +"</a> is streaming<br>" + data.stream.channel.status;
    $("p."+username + " > span.words").append(html);
  }
  return 0;
}
