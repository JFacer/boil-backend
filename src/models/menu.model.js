var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
      _id:          String,
      short_title:  String,
      title:        String,
      icon:         String,
      target:       String,
      description:  String,
      footer:       String
});

mdule.exports = mongoose.model('Menu', menuSchema);
