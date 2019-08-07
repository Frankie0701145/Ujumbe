
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const geocoder= require("../config/init/nodeGeocoderInit").geocoder;
const Schema = mongoose.Schema;

// news schema
  const newsSchema = new Schema ({
          title:{
            type: String,
            required: [true, "The title is required"]
          },
          text: {
            type: String,
            required: [true, "The news body is required"]
          },
          agreeNo: {
            type: Number,
            default: 0
          },
          disagreeNo: {
            type: Number,
            default: 0
          },
          commentsNo: {
            type: Number,
            default: 0
          },
          coordinate: {
            type:{
              type: String,
              default: 'Point',
            },
            coordinate: {
              type: [Number, Number],//lon, lat
              required : [true, "The news coordinates is required"],
              index: '2dsphere'
            }
          },
          comments:[{
            type: Schema.Types.ObjectId, ref: "Comment"
          }],
          user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "The user id is required"]
          }
      },
      {timestamps: true}
   );
//schema methods
    //the agree method
newsSchema.methods.agree = function(){
    console.log(this.agreeNo+=1);
    return this.save();
};

const News = mongoose.model("News", newsSchema);
module.exports = News;
