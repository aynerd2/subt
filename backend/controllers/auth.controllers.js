import mongoose from "mongoose";
import Users from '../models/users.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'



export const signUp = async (req, res, next) => {

      const seasion = await mongoose.startSession();
      seasion.startTransaction();


      try {
            // get user data from request body
            const { name, email, password } = req.body;

            // validate to check for an existing user
            const existingUser = await Users.findOne({ email }).session(seasion);
            if (existingUser) {
                  const error = new Error('User alrleady exist');
                  error.statusCode = 404;
                  throw error;
            }

            // Hard part: Hashing password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt)

            // Create new users
            const newUser = await Users.create([{
                  name,
                  email,
                  password: hashPassword
            }], { session: seasion })
            const token = jwt.sign(
                  { userId: newUser[0].id, email: newUser[0].email },
                  JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }
            );

            await seasion.commitTransaction();
            seasion.endSession();

            res.status(201).json({
                  success: true,
                  message: "User created successfully",
                 data: {
                        token,
                        user: {
                              id: newUser[0]._id,
                              name: newUser[0].name,
                              email: newUser[0].email,
                              createdAt: newUser[0].createdAt,
                              updatedAt: newUser[0].updatedAt
                        }
                  }
            })

      } catch (error) {
            await seasion.abortTransaction();
            seasion.endSession();
            return next(error)
      }
}

export const signIn = async (req, res, next) => {

      try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            
            if (!user) {
                  const error = new Error('User not found');
                  error.statusCode = 404
                  throw error;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                  const error = new Error('Invalid Password')
                  error.statusCode = 401;
                  throw error;
            }

            const token = jwt.sign({ user: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            res.status(200).json({
                  success: true,
                  message: 'User signed in successfully',
                  data: {
                        token,
                        user: {
                              id: user._id,
                              name: user.name,
                              email: user.email,
                              createdAt: user.createdAt,
                              updatedAt: user.updatedAt
                        }
                  }
            })

      } catch (error) {
            next(error);

      }
};

export const signOut = async (req, res, next) => {

}