$(function(){
    var playlist;
    var current;
    var player;
    function load(id){
	console.log(id);
	player = new YT.Player('player', {
	    height: '0',
	    width: '0',
	    videoId: id,
	    events: {
		'onReady': onPlayerReady,
		'onStateChange' : onPlayerStateChange
		
	    }
	});
    }

    function onPlayerStateChange(event){
	console.log("State change");
	if (event.data == YT.PlayerState.ENDED){
	    console.log("Ended");
	    current++;
	    if(Object.keys(playlist).length >= current){
		player.loadVideoById(playlist[current],0,"large");
	    }
	}
    }
    function onPlayerReady(event) {
	event.target.playVideo();
    }
    
    var id = $("#playlistid").val();

    $.getJSON("/player/getPlaylist/"+id,function(data){
	playlist = data.playlist;
	current = 0;
	load(playlist[current]);
    });
});
