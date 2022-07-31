const User = require('../models/userModel');


export const registerUser = async function (req: any, res: any, next: any) {
     try {
          const { firstName, lastName, email, password, userName, gender, dobYear, dobMonth, dobDay, verified } = req.body

          const user = await User.create({
               firstName, lastName, email, password, userName, gender, dobYear, dobMonth, dobDay, verified
          })

          res.status(201).json({
               success: true,
               message: "User succesfully created",
               user
          })

     } catch (error: any) {
          res.status(500).json({
               success: false,
               message: error.message
          })
     }

}