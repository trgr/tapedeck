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
    find : function(req,res){
	var id = req.params.id
	if(typeof(id) != "undefined"){
	    Playlist.findOne(id).done(function(err,playlists){
		return res.json(playlists)
	    });

	}else{
	    Playlist.find().done(function(err,playlists){
		return res.json(playlists)
	    });
	}
    },
    
    update :  function(req,res){
	var id = req.params.id
	console.log(req.session.user)
	Playlist.findOne({
	    id : id,
	    user_id : req.session.user
	}).done(function(err,playlist){
	    if(!playlist)
		return res.json({error:"No such playlist or you don't have access"},500);
	    if(err)
		return res.json({error:"You do not have access to this playlist"},500)
	    
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
		console.log(item)
		items.push(item)
		
	    }

	    playlist.items = items
	    playlist.name = name
	    playlist.save(function(err){
		if(err)
		    return res.json({error:"Unable to update playlist"},500);
		res.redirect("/play/"+playlist.id)
	    });
	    
	});
    },
    
    delete : function(req,res){
	var id = req.params.id
	if(typeof(id) == "undefined")
	    return res.json({error:"Undefined id"},500)
	if(typeof(req.session.id) == "undefined")
	    return res.json({error:"DENIED!"})
	
	Playlist.findOne({
	    _id : id,
	    user_id : req.session.user
	}).done(function(error,playlist){
	    console.log(playlist)
	    console.log("user:" + req.session.user)
	    if(error)
		return res.json({error:"DB error"},500)
	    playlist.destroy(function(err){
		if(error)
		    return res.json({error:"DB error"},500)
		return res.json({message:"OK"},200)
	    })
	})
	

    },
    edit : function(req,res){
	var id = req.params.id
	if(typeof(id) == "undefined")
	    return res.json({error:"Undefined id"},500);
	
	Playlist.findOne(id).done(function(err,playlist){
	    console.log(playlist)
	    return res.view({layout:"playlist_layout",playlist:playlist})
	});
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
	
	var user_id = -1
	if(typeof(req.session.user) != "undefined")
	    user_id = req.session.user
	
	Playlist.create({
	    name : name,
	    items : items,
	    user_id : user_id,
	}).done(function(err,playlist){
	    res.view("player/index",{playlistid:playlist.id})
	});
    }
};
