$(function(){
    var playlist = [];
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

    $("#next").click(function(){
	current++;
	if(Object.keys(playlist).length >= current){
	    player.loadVideoById(playlist[current],0,"large");
	}	
    });

    $("#last").click(function(){
	current--;
	if(0 <= current){
	    player.loadVideoById(playlist[current],0,"large");
	}
    });

    $("#play").click(function(){
	$(".cassette_stopped").css('display','none');
	$(".cassette_animated").css('display','block');
	load(playlist[current]);
    });
    
    $.getJSON("/playlist/find/"+id,function(data){
	var len = Object.keys(data.items).length;
	$("#title").html(data.name);
	var ol = document.createElement("ol");
	for(var i = 0; len>i; i++){
	    playlist.push(data.items[i].id);
	    var li = document.createElement("li");
	    $(li).html(data.items[i].info);
	    $(ol).append(li);
	    
	}
	$("#playlistinfo").append(ol);
	current = 0;
	$("#loading").html("");
	
    });
    $.getJSON("/playlist",function(data){
	var len = Object.keys(data).length;
	for(var i=0; len>i; i++){
	    var link = "<a href='/play/"+data[i].id+"'>"+data[i].name+"</a>";
	    var row = document.createElement("div");
	    var cell = document.createElement("div");

	    $(row).addClass("row");
	    $(cell).addClass("col-md-4");
	    $(cell).html(link);
	    $(row).append(cell);
	    $("#playlists").append(row);
	}
    });
});
