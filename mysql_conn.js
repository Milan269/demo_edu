var mysql=require('mysql2');


 // creating connection with mysql
var con=mysql.createConnection({
  host: 'localhost',
  user : 'root',
  password : 'samsung123',
  database: "studyage" //accessing the database which we created
})


con.connect(function(err){
if (err) throw err;
console.log('connected  ');

// creating a database

// con.query("CREATE DATABASE studyage",function(err,result){
//   if (err) throw err;
//   console.log("database created"+ result)
// })

// creating a table
// var table="CREATE TABLE employee (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), age INT, sex VARCHAR(20), email VARCHAR(90), designation VARCHAR(70), salary INT)"

// con.query(table, (err, result) => {
//     if (err) throw err;
//     console.log("table created" + result);
//   })

// inserting multiple values                      

// var sql="INSERT INTO employee(name,age,sex,email,designation,salary) VALUES ?";

// var values=[
// ["Deepika",27,"female","deep@gmail.com","Manager",60000],
// ["Mayank",23,"male","cheap@gmail.com","Project manager",50000],
// ["Aditya",22,"male","seep@gmail.com","Backend D.",45000],
// ["Yogesh",23,"male","sweep@gmail.com","Frontend D.",46000],
// ["Aman",26,"male","talk@gmail.com","Customer care E.",30000],
// ["Abhinav",24,"male","trip@gmail.com","Testing",35000],
// ["Kriti",28,"female","senon@gmail.com","Fullstack D.",50000]
// ];

// con.query(sql,[values], function(err,result){
//   if (err) throw err;
//   console.log("No. of records inserted : " + result.affectedRows);
// })
// var name="aditya";
// var age="23"
// var sql='SELECT * FROM employee WHERE name = ? AND age = ?';

// var cod='INSERT INTO records(status) VALUES ?';
// var value=[
//   ["permanent"],
//   ["permanent"],
//   ["permanent"],
//   ["internship"],
//   ["permanent"],
//   ["internship"],
//   ["internship"]
// ];
// var jin="SELECT employee.name AS Ename, records.status AS Estatus FROM records JOIN employee ON records.id=employee.id "
// var sql="CREATE TABLE employe (eid INT AUTO_INCREMENT PRIMARY KEY, ename VARCHAR(60), eno INT)"
// var sql="INSERT INTO employe(ename,eno) VALUES ?";
// var value=[
//   ["munish",56],
//   ["gopal",78],
//   ["bandya",85],
//   ["aman",69]

// ]
// var sql="CREATE TABLE employement(eid INT AUTO_INCREMENT PRIMARY KEY,profile VARCHAR(100),country VARCHAR(50), j_date date )"

// var sql="INSERT INTO employement(profile,country,j_date) VALUES ?";
// var value=[
//   ["manager","India","2011-03-1"],
//   ["designer","USA","2014-08-21"],
//   ["TL","Canada","2012-05-10"],
//   ["backend","india","2013-03-30"],
//   ["frontend","Sweden","2013-03-30"],
//   ["developer","india","2013-03-30"]
// ]
var jjoin="select * from employe right join employement on  employe.eid=employement.eid"
con.query(jjoin,function(err,result,fields){
  if (err) throw err;
  console.log(result);
})

});