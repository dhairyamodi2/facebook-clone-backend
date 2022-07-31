const User = require('../models/userModel');


export const registerUser = async function (req: any, res: any, next: any) {
     try {
          const { firstName, lastName, email, password, gender, dobYear, dobMonth, dobDay, verified } = req.body

          const userName = firstName + "-" + lastName + Date.now().toString();
          const user = await User.create({
               firstName, lastName, userName, email, password, gender, dobYear, dobMonth, dobDay, verified
          })

          const token = user.getJwtToken();

          const tokenObject = {
               expires: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
               ),
               httpOnly: true
          }
          res.status(201).cookie("token", token, tokenObject).json({
               success: true,
               message: "User succesfully created",
               user,
               token
          })

     } catch (error: any) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }

}

export const loginUser = async function (req: any, res: any, next: any) {
     try {
          const { email, password } = req.body;

          const user = await User.findOne({ email }).select('+password');

          if (!user) {
               res.status(400).json({
                    success: false,
                    message: "User doesn't exist!"
               })
          }
          else {
               const correctPassword = await user.comparePassword(password);
               if (correctPassword) {
                    const token = user.getJwtToken();

                    const tokenObject = {
                         expires: new Date(
                              Date.now() + 7 * 24 * 60 * 60 * 1000
                         ),
                         httpOnly: true
                    }
                    res.status(200).cookie("token", token, tokenObject).json({
                         success: true,
                         message: "Logged in successfully!",
                         user,
                         token
                    })
               }
               else{
                    res.json({
                         success: false,
                         message: "Invalid Email or password"
                    })
               }
          }
     } catch (error: any) {
          res.status(500).json({
               success: false,
               error: error.message
          })
     }
}