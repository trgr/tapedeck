/**
 * PlaylistController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var sanitize = require('google-caja').sanitize

function parseYoutubeLink(raw){

    if (raw.search("youtube") != -1)
	return raw.split("=")[1]
    
    if (raw.length == 11)
	return raw

    return false
}

module.exports = {
    
    new : function(req,res){
	res.view({layout:"playlist_layout"})
	    
    },
    create :  function(req,res){
	var data = req.body

	var name = sanitize(req.body.name)
	
	var items = []
	
	var len = Object.keys(data.link).length

	for (var i = 0; len > i; i++){
	    if(data.link[i] == "")
		continue

	    var rawLink = sanitize(data.link[i])	    

	    var link  = parseYoutubeLink(rawLink)

	    if( link == false )
		continue

	    var item = {
		id : link,
		info : sanitize(data.info[i])
	    }
	    
	    items.push(item)
	    
	}

	if( Object.keys(items).length == 0)
	    return res.view("error")
	
	Playlist.create({
	    name : name,
	    items : items
	}).done(function(err,playlist){
	    res.view("player/index",{playlistid:playlist.id})
	});
    }
};
