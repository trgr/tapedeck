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
	var search = { $regex : 'all'}
	if(typeof(id) != "undefined")
	    search = {_id :id}
    
	console.log(id)
	Playlist.find(id).limit(1).done(function(error,playlist){
	    if(!playlist)
		return res.view("player/error",{message:"Playlist no findings"})
	    return res.view("player/index",{playlist:playlist.pop()})
	});
    },
    
    _config: {}

  
};
