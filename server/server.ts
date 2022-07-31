const server = require('./app');

import {connectToDatabase} from './config/database';

server.listen(process.env.PORT,  () => {
     console.log(`Server running on PORT ${process.env.PORT}`);
})


connectToDatabase();