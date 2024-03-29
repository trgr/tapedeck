/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
	username : {
	    type : 'string',
	    unique : true,
	    required : true
	},

	password : 'string'
    },
    
    /* standard password encrypt stuff*/
    beforeCreate : function(attrs,next){
	var bcrypt = require("bcrypt")
	bcrypt.genSalt(10,function(err,salt){
	    if (err) return next(err)
	    bcrypt.hash(attrs.password,salt,function(err,hash){
		if(err) return next(err)
		attrs.password = hash;
		next();
	    });
	});
    }

};
