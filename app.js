// app.use(express.static('upload'));

var mongos=require('./db/config');
var register=require('./model/signup');
var upd_course=require('./model/dash_course_update');
var bodyParser=require('body-parser');
var bcrypt=require('bcrypt')
var cookieParser=require('cookie-parser');
var session=require('express-session')
var multer=require('multer');
var alert=require('alert')

var express=require('express');
var app=express();
var router=express.Router();

const path=require('path');
app.use(express.static(path.join(__dirname,'/upload')))

app.set('view engine' , 'ejs')

app.use(express.static('views'));
app.use(cookieParser());
app.use(session({
    key:"user_sid",
    secret:"random",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires: 600000,
    },
})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// file uploading code
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './upload');
    },
filename:function(req,file,cb){
    cb(null,file.originalname);
    //cb(null, uuidv4()+'-'+ Date.now()+)
}
});

const fileFilter=(req,file,cb) =>{
    const allowedFileTypes=['image/jpeg','image/jpg','image/png','image/webp'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    } else{
        cb(null,false)
    }
}
let upload=multer({storage,fileFilter});
// file uploading code ends

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/degree_ug',async (req,res)=>{     
        // req.flash('error_msg','record not found)
    try{
        const coursedata= await upd_course.find();
       console.log(coursedata)
        res.render('degree_ug',{coursedata:coursedata})
       
    }
    catch(err){
        console.log(err);
    }
         
})   

// app.get('/login',(req,res)=>
// {
//     res.render('index')
// })
// login
// import alert from 'alert';

app.post('/login',async (req,res)=>{
    var email= req.body.email,
        password=req.body.password;

    try{
        var user= await register.findOne({email:email})
        .exec();
        console.log(user)
        if(!user){
            res.redirect("/");
alert("Email Id not registered")
        }
        user.comparePassword(password,(error,match)=>{
            if(!match){
            alert("password error")
            }
        })
        req.session.user=user;
        res.redirect('/dashboard')
    }  
    catch(error){
        console.log(error)
    }  
})


app.get('/degree_pg',(req,res)=>{
    res.render('degree_pg');
})
app.get('/fullS',(req,res)=>{
    res.render('fullS');
})
app.get('/cloud',(req,res)=>{
    res.render('cloud');
})
app.get('/blockchain',(req,res)=>{
    res.render('blockchain');
})
app.get('/appdev',(req,res)=>{
    res.render('appdev');
})
app.get('/uiux',(req,res)=>{
    res.render('uiux');
})
app.get('/pgdca',(req,res)=>{
    res.render('pgdca');
})
app.get('/contactus',(req,res)=>{
    res.render('contactus');
})

app.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/signup',(req,res) =>{
    var regis={
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password,
        add1:req.body.add1,
        add2:req.body.add2,
        city:req.body.city,
        state:req.body.state,
        areacode:req.body.areacode,
    };
    var regpost=  new register(regis);
    regpost.save()
    res.redirect('/signup')
     .then(()=> res.json('SignUp Sucessfull'))
    .catch(err =>res.status(400).json('error : '+ err))
})

// delete user by id

router.get('/delete/:id', async(req,res)=>{        
            // req.flash('error_msg','record not found)
        try{
            const userdata= await register.findByIdAndRemove(req.params.id);
           
            res.redirect('/view_regis')
        }
        catch(err){
            console.log(err);
        }
             
    })
//modify user data
router.get('/edit/:id', async(req,res) =>{
try{
const usedata=await register.findById(req.params.id);

// console.log(usedata)
res.render('dashboard/edit_regis',{usedata:usedata});
}
catch(err){
    console.log(err)
}
} )

// updation of sign up
router.post('/edit/:id', async (req, res) => {
    const itemId = req.params.id;
    // Data to update with
    const updatedData = {
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password,
        add1:req.body.add1,
        add2:req.body.add2,
        city:req.body.city,
        state:req.body.state,
        areacode:req.body.areacode,
    }; 
  
    try {
      const updatedItem = await register.findByIdAndUpdate(itemId, updatedData, { new: true });
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
    //   res.json(updatedItem);
    res.redirect('/edit/'+itemId)
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/admin',(req,res)=>{
    res.render('dashboard/adminlogin')
})

// dashboard section

app.get('/dashboard',(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        
    
    res.render('dashboard/index')
    }
    else{
        res.redirect("/admin");
    }
})
// app.get('/edit_regis',(req,res)=>{
//     res.render('dashboard/edit_regis')
// })


app.get('/dashboard/add_course',(req,res)=>{
    res.render('dashboard/add_course')
})


router.post('/update',upload.single('course_img'),(req,res)=>{
    var update={
        course_name:req.body.course_name,
    course_duration:req.body.course_duration,
    course_desc:req.body.course_desc,
    course_img:req.file.filename
    };

    var updt=new upd_course(update);
    updt.save()
    .then(() => res.json('Updation Sucessfull'))
    .catch(err =>{res.status(400).json('error : '+ err); console.log(err) });
})

app.get("/course", async (req,res)=>{
    try{
        const coursedata=await upd_course.find({});
        res.render("dashboard/view_course",{coursedata:coursedata});
        console.log(coursedata);
    } catch(err){
    console.log(err);}
})
app.get('/dashboard/view_regis',(req,res)=>{
    res.render('dashboard/view_regis')
})

router.get("/view_regis", async (req,res)=>{
    try{
        const signupdata=await register.find({});
        res.render("dashboard/view_regis",{signupdata:signupdata});
        console.log(signupdata);
    } catch(err){
    console.log(err);}
})
// deleting signup data 
router.get('/delete1/:id', async(req,res)=>{        
    // req.flash('error_msg','record not found)
try{
    const coursedata= await upd_course.findByIdAndRemove(req.params.id);
   
    res.redirect('/course')
}

catch(err){
    console.log(err);
}
     
})

router.get('/edit1/:id', async(req,res) =>{
    try{
    const usedta=await upd_course.findById(req.params.id);
    
    // console.log(usedata)
    res.render('dashboard/edit_course',{usedta:usedta});
    }
    catch(err){
        console.log(err)
    }
    } )

    router.post('/edit1/:id', async (req, res) => {
        const itemId = req.params.id;
        // Data to update with
        const updatedData = {
            course_name:req.body.course_name,
          course_duration:req.body.course_duration,
    course_desc:req.body.course_desc,
    course_img:req.file.filename
        }; 
      
        try {
          const updatedItem = await register.findByIdAndUpdate(itemId, updatedData, { new: true });
      
          if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
          }
      
        //   res.json(updatedItem);
        res.redirect('/edit1/'+itemId)
        } catch (err) {
          res.status(500).json({ message: 'Server error' });
        }
      });



      router.get('/cou_detail/:id', async(req,res) =>{
        try{
        const usedta=await upd_course.findById(req.params.id);
        
        // console.log(usedta)
        res.render('course_detail',{usedta:usedta});
        }
        catch(err){
            console.log(err)
        }
        } )
    
      

app.use('/', router);

app.listen(8008)