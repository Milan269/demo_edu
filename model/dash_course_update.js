var mongos=require('../db/config');
var mongos=require('mongoose');

const Course_update=new mongos.Schema({
    course_name:{type:String, required:true},
    course_duration:{type:String, required:true},
    course_desc:{type:String, required:true},
    course_img:{type:String,  required:true},
    modify_date:{type:Date, default:Date.now}
});

const Schemalist= new mongos.model('Course_update',Course_update);
module.exports =Schemalist;