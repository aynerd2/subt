import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
      
      {
      name: {
            type: String,
            required: [true, 'Name is required'],
            trim:true,
            minLength: [3, 'Name must be at least 3 characters'],
            maxLength: [50, 'Name is too large']
      },

      email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim:true,
            lowercase: true,
            minLength: [5, 'Email must be at least 5 characters'],
            maxLength: [255, 'Email is too large'],
            match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
      },

      password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [6, 'Password must be at least 6 characters']
      },

},

{timestamps: true}

)


const User = mongoose.model('User', userSchema);
export default User;