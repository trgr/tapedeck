$(function(){
    function parseYoutubeLink(raw){
	
	if (raw.search("youtube") != -1)
            return raw.split("=")[1]

	if (raw.length == 11)
            return raw
	
	return false
    }
    
    $(".linkdata").focusout(function(){
	id = $(this).attr("meta:index");
	var link = parseYoutubeLink($(this).val());
	if (link == false){
	    return;
	}

	$.getJSON("/youtubeinfo/lookup/"+link,function(data){
	    var selector = "[name='info["+id+"]']";
	    $(selector).val(data.title);
	});
    });
    //    $.getJSON("/playlist/find/"+id,function(data){
    //    });
});
