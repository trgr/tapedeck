/**
 * UserController
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
var bcrypt = require("bcrypt")

module.exports = {
    
    create : function(req,res){
	if( req.method == "GET")
	    return res.view()
	if( req.method != "POST")
	    return res.view()
	
	var username = req.body.username
	var password = req.body.password
	User.create({
	    username : username,
	    password : password
	}).done(function(err,user){
	    console.log(err)
	    console.log(user)
	    return res.view();
	});
    },
    login : function(req,res){
	if( req.method == "GET")
	    return res.view()
	if( req.method != "POST")
	    return res.view()
	
	var username = req.body.username
	var password = req.body.password

	User.findOne({
	    username : username,
	    
	}).done(function(err,user){

	    if(err)   return res.json({ error : "DB error"},500)
	    if(!user) return res.view();
	    
	    bcrypt.compare(password,user.password,function(err,match){

		if(err) return res.json({ error : "crypto error"},500)
		if(!match) return res.json({error : "login error"},500)
		
		req.session.user = user.id
		req.session.username = user.username
		return res.redirect("/")
	    })
	});
	
    },
    
    test : function(req,res){
	console.log("foo");
	return res.view();
    },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
