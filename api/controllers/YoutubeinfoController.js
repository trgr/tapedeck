/**
 * YoutubeinfoController
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
var request = require("request")
var util = require("util")
module.exports = {
    
    lookup : function(req,res){
        var link = req.params.id
        var url = "http://gdata.youtube.com/feeds/api/videos/"+link+"?v=2&alt=j\
son"
        request(url,function(error,response,body){
            var info = JSON.parse(body)
            return res.json({title:info.entry.title.$t})
        });
    },
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to YoutubeinfoController)
   */
  _config: {}

  
};
