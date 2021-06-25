process.env.USER = 'proyectmanager';
process.env.PWD = '4TrcYYTtXjFKuyOd';
const uri = `mongodb+srv://${process.env.USER}:${process.env.PWD}@appis.65uar.mongodb.net/bdtest?retryWrites=true&w=majority`;
module.exports={
    port: process.env.PORT || 3000,
    // db: process.env.MONGODB || 'mongodb://localhost:27017/BdTest',
    db: process.env.MONGODB || uri,
    urlParser : { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useFindAndModify:false,
        useCreateIndex:true 
    } 
}