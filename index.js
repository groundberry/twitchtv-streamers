var $streamResults = $('#stream-results');

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "RobotCaleb", "noobs2ninjas"];

function generateURL(type, channel) {
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + channel + '?callback=?';
}

function generateResult(channelData, streamData) {
  var $row = $('<li class="row result-row" />');

  var $text = $('<div class="col-sm-10" />');

  var $displayName = $('<a class="channel-name-link" href="' + channelData.url + '">Channel: ' + channelData.display_name + '</a>', {text: channelData.display_name});
  var $game = $('<p>Game: ' + channelData.game + '</p>');
  var $status = $('<p>Status: ' + channelData.status + '</p>');

  $text.append($displayName);
  $text.append($game);
  $text.append($status);
  $row.append($text);

  var $logo = $('<div class="col-sm-2" />');
  var $img = $('<img />', {
    class: 'data-logo',
    src: channelData.logo
  });
  $logo.append($img);
  $row.append($logo);

  return $row;
}

function getData(channel) {
  channels.forEach(function(channel) {
    $.getJSON(generateURL('streams', channel)).then(function(streamData) {
      if (streamData.stream != null) {
        // If we have stream data, we also have channel data, so no need to request it.
        $streamResults.append(generateResult(streamData.stream.channel, streamData));
      } else {
        // If we don't have stream data, we have to request channel data.
        $.getJSON(generateURL('channels', channel)).then(function(channelData) {
          $streamResults.append(generateResult(channelData, streamData));
        });
      }
    });
  });
}

getData();
