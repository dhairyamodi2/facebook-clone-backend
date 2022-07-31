import mongoose, {Schema, Types} from "mongoose";

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
          unique: true
     },
     password: {
          type: String,
          required: true
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
     verified: {
          type: Boolean,
          required: true
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

})

export = mongoose.model("User", userSchema);