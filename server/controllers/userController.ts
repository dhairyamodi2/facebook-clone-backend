const User = require('../models/userModel');


export const registerUser = async function (req: any, res: any, next: any) {
     try {
          const { firstName, lastName, email, password, userName, gender, dobYear, dobMonth, dobDay, verified } = req.body

          const user = await User.create({
               firstName, lastName, email, password, userName, gender, dobYear, dobMonth, dobDay, verified
          })

          const token = user.getJwtToken();

          const tokenObject = {
               expires: new Date(
                    Date.now () + 7 * 24 * 60 * 60 * 1000
               ),
               httpOnly: true
          }
          res.status(201).cookie("token", token, tokenObject).json({
               success: true,
               message: "User succesfully created",
               user
               token
          })

     } catch (error: any) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }

}