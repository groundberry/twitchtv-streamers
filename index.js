var $streamResults = $('#stream-results');

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function generateURL(channel) {
  return 'https://wind-bow.gomix.me/twitch-api/streams/' + channel + '?callback=?';
}

function generateResult(data) {
  var $row = $('<li class="row result-row" />');

  var $text = $('<div class="col-sm-10" />');
  var $channel = $('<h1 />', {channel: data.stream.channel.display_name});
  var $game = $('<p />', {game: data.stream.game});
  var $status = $('<p />', {status: data.stream.channel.status});
  $text.append($channel);
  $text.append($game);
  $text.append($status);
  $row.append($text);

  var $logo = $('<div class="col-sm-2" />');
  var $img = $('<img />', {
    class: 'data-logo',
    src: data.stream.channel.logo
  });
  $logo.append($img);
  $row.append($logo);

  return $row;
}

function getData(channel) {
  channels.forEach(function(channel) {
    $.getJSON(generateURL(channel)).then(function(data) {

      var game = data.stream.game;
      Object.keys(game).forEach(function(key) {
        $streamResults.append(generateResult(game[key]));
      });
    });
  });
}

getData();
