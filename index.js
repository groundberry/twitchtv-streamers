var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "RobotCaleb", "noobs2ninjas"];
var $channels = $('#channels');

function generateURL(type, channel) {
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + channel + '?callback=?';
}

function setupChannelFilters() {
  $('.channel-filters').on('change', function(evt) {
    var $target = $(evt.target);
    var filter = $target.val();

    if (filter == 'all') {
      $channels.find('.channel').show();
    } else {
      $channels.find('.channel').hide();
      $channels.find('.channel-' + filter).show();
    }
  });
}

function generateResult(channelData, streamData) {
  var $panel = $('<li class="channel panel panel-default" />');

  var status;
  if (typeof  streamData.stream === 'undefined') {
    status = 'closed';
  } else if (streamData.stream === null) {
    status = 'offline';
  } else {
    status = 'online';
  }
  $panel.addClass('channel-' + status);

  var $panelHeading = $('<div class="panel-heading" />');
  $panel.append($panelHeading);
  var $panelBody = $('<div class="panel-heading" />');
  $panel.append($panelBody);

  var $link = $('<a />', {
    class: 'panel-title',
    href: channelData.url
  });
  $panelHeading.append($link);
  var $displayName = $('<h2 />', {
    class: 'channel-title',
    text: channelData.display_name
  });
  $link.append($displayName);

  var $row = $('<div class="row" />');
  $panelBody.append($row);

  var $text = $('<div class="col-xs-10 col-sm-11" />');
  $row.append($text);

  var $game = $('<p />', {
    text: 'Game: ' + channelData.game
  });
  $text.append($game);
  var $status = $('<p />', {
    class: 'channel-status',
    text: 'Status: ' + (status === 'offline' ? 'Offline' : channelData.status)
  });
  $text.append($status);

  var $logo = $('<div class="col-xs-2 col-sm-1" />');
  $row.append($logo);
  var $img = $('<img />', {
    class: 'channel-logo img-responsive img-circle',
    src: channelData.logo
  });
  $logo.append($img);

  return $panel;
}

function getData(channel) {
  channels.forEach(function(channel) {
    $.getJSON(generateURL('streams', channel)).then(function(streamData) {
      if (streamData.stream != null) {
        // If we have stream data, we also have channel data, so no need to request it.
        $channels.append(generateResult(streamData.stream.channel, streamData));
      } else {
        // If we don't have stream data, we have to request channel data.
        $.getJSON(generateURL('channels', channel)).then(function(channelData) {
          $channels.append(generateResult(channelData, streamData));
        });
      }
    });
  });
}

getData();
setupChannelFilters();
