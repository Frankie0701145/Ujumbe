
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const geocoder= require("../config/init/nodeGeocoderInit").geocoder;
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    firstName: {
      type: String,
      required: [true, 'The first name is required']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'The email address is required']
    },
    lastName: {
      type: String,
      required: [true, 'The last name is required']
    },
    phoneNumber: {
      type: String,
      required: [true, 'The phone Number is required']
    },
    password: {
      required: [true, "The password is required"],
      type: String
    },
    activated: {
      type: Boolean,
      default: false
    },
    locations: [{
        home: {
          type: Boolean,
          default: false
        },
        address: {
          type: String,
          required: [true, "The address is required"]
        },
        coordinate:{
          type:{
            type: String,
            default: 'Point',
          },
          coordinate: {
            type: [Number, Number], //lon, lat
            index: '2dsphere'
          }
        }
    }],
   news: [{type: Schema.Types.ObjectId, ref: 'News'}],
},{timestamps: true});

//hooks
//hashing hook
userSchema.pre('save', function(next){
    let user = this;
    if(this.isModified("password")){
      console.log("************Hashin Hashing***********");
      hashing(user, next);
    }else{
      next();
    }
});
//method to compare the password and the submitted password
userSchema.methods.validatePassword = function(password){
      console.log("validating password");
      return bcrypt.compareSync(password, this.password);
};
userSchema.methods.geocode = (address, cb)=>{
   geocoder.geocode(address,cb); //parameter of the cb is err, res
};

function hashing(user, cb){
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err){
      console.log(err);
      return cb(err);
    }
    user.password = hash;
    console.log("Hashed Hashed");
    console.log(user.password);
    cb();
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
