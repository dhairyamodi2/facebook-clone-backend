const mongoose = require('mongoose');


export const connectToDatabase = function (){
     mongoose.connect(process.env.db_url).then((data: any) => {
          console.log(`MongoDb connected with ${data.connection.host}`)
     }).catch((error: any) => {
          console.log(error);
     })
}
