import mongoose, {Schema, Types} from "mongoose";
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

import validator from 'validator';

const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: true,
          trim: true,
     },
     lastName: {
          type: String,
          required: true,
          trim: true
     },
     email: {
          type: String,
          required: true,
          unique: true,
          validate: [validator.isEmail, "Please enter valid Email!"]
     },
     password: {
          type: String,
          required: true,
          minLength: [8, "Password should be greater than 8 characters"],
          select: false 
     },
     userName: {
          type: String,
          required: true,
          unique: true,
     },
     profilePic: {
          type: String,
          default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
     },
     coverPic: {
          type: String
     },
     gender:{
          type: String,
          required: true
     },
     dobYear: {
          type: Number,
          required: true,
     },
     dobMonth: {
          type: Number,
          required: true,
     },
     dobDay: {
          type: Number,
          required: true,
     },
     followers: {
          type: Array,
          default: []
     },
     following: {
          type: Array,
          default: []
     },
     friends: {
          type: Array,
          default: []
     },
     friendRequest: {
          type: Array,
          default: []
     },
     sentFriendRequest: {
          type: Array,
          default: []
     },
     mutedBy : {
          type: Array,
          default: []
     },
     blockedBy: {
          type: Array,
          default: []
     },
     savedPosts: [
          {
               post: {
                    type: Schema.Types.ObjectId,
                    ref: 'Post'
               },
               savedAt: {
                    type: Date,
                    default: new Date(),
               }
          }
     ],
     searchHistory: [
          {
               user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
               }
          }
     ],
     details: {
          description: {
               type: String,
          },
          currentTown: {
               type: String,
          },
          homeTown: {
               type: String,
          },
          school: {
               type: String,
          },
          university: {
               type: String,
          },
          workplace: {
               type: String,
          },
          relationShipStatus: {
               type: String,
          }
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date

})

//when document is saved, this method will be called and password will be hashed
userSchema.pre("save",async function (next:Function){
     if(!this.isModified("password")){
          next();
     }
     //Here this refers to the document (object) (user) which is saved in database
     this.password = await bcryptjs.hash(this.password, 10);

})

userSchema.methods.getJwtToken = function () {
     return jwt.sign({id: this._id}, process.env.JWT_SECRET , {
          expiresIn: process.env.JWT_EXPIRE,
     });
}

userSchema.methods.comparePassword = async function name(params: any) {
     return await bcryptjs.compare(params, this.password);;
 }
export = mongoose.model("User", userSchema);