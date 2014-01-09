/**
 * PlayerController
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

module.exports = {
    
    index : function(req,res){
	res.view()
    },
    
    play : function(req,res){
	var id = req.params.id
	res.view("player/index",{playlistid:id})
    },
    
    getPlaylist : function(req,res){
	var id = req.params.id
	Playlist.findOne(id).done(function(err,playlist){
	    var len = Object.keys(playlist.items);
	    list = []
	    for (var i=0; len>=i; i++){
		
		list.push(playlist.items[i].id)
	    }
	    console.log(list)
	    res.json({playlist:list})
	});
    },
    newPlaylist : function(req,res){
	res.view();
    },

    savePlaylist : function(req,res){
	var data = req.body
	var len = Object.keys(data.link).length
	var name = req.body.name
	var items = []

	for(var i = 0; len>i; i++){
	    if(data.link[i] == "")
		continue
	    var item = {}
	    item.id = data.link[i]
	    item.band = data.artist[i]
	    item.title = data.title[i]
	    items.push(item)
	}

	Playlist.create({
	    name : name,
	    items : items
	}).done(function(err,playlist){
	    res.view({id:id})
	});

    },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PlayerController)
   */
  _config: {}

  
};
