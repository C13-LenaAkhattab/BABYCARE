const mongoose=require('mongoose')

mongoose
.connect(process.env.DB)
.then(()=>{
    console.log("DB CONNECTED SUCCESFULLY");
    
})
.catch((err)=>{
console.log(err);

})

module.exports= mongoose