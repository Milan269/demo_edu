var mongo= require('mongoose');
 
 var conn=mongo.connect("mongodb+srv://minkashyap:admin123@cluster0.amrmav9.mongodb.net/testing?retryWrites=true&w=majority",
//  mongo.connect("mongodb://localhost:27017/load",

{
    useNewUrlParser:true,
    useUnifiedTopology:true

})          
.then(() => console.log("Connection successful.."))
.catch((err)=> console.log(err));

module.exports=conn;
// create schema
// const listSchema= new mongo.Schema({
//     name:{type:String, required:true},
//     email:{type:String, required:true},
//     active:Boolean,
//     date:{type:Date, default:Date.now}
// })

// //collection creation
// // it is impt to declare vari

// const Playlist =  new mongo.model("Playlist",listSchema);
// // playlist is a name of collection name

// // create document or insert
// const createDocument=async()=>{
//     try {

//         const productlist2= new Playlist({
//             name:"seeta",
//             email:"seeta@gmail.com"
//         })
//         // method to save one data
//         // productlist2.save()
//      const productlist3= new Playlist({
//             name:"geeta",
//             email:"geeta@gmail.com"
//         })
//          const productlist4= new Playlist({
//             name:"meeta",
//             email:"meeta@gmail.com"
//         })
//      const result=await Playlist.insertMany([productlist2,productlist3,productlist4]);
//      console.log(result);
//     }

// catch(err){console.log(err)}
// }


// createDocument()