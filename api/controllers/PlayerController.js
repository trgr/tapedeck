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
	if(typeof(id) == "undefined")
	    id="52cf08c437cc188c41882f21"
	
	Playlist.findOne(id).done(function(error,playlist){
	    res.view("player/index",{playlist:playlist})
	});
    },
    
    _config: {}

  
};
