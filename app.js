"use strict";
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.set('view engine','ejs');
//app.use('/whatever',express.static(__dirname+'/public'));
var port=process.env.port || 1337;

app.get('/api/person', function(req, res) {
    const p_id = req.query.id;
   /* const p_name = req.query.name;
    const loc = req.query.loc;
    const salary = req.query.sal;
    const Gender = req.query.gen;*/
    const DOB = req.query.dob;
    if (p_id==="")
    res.end("Please enter ID and Try again");
    else{
      if(DOB==="")
      res.end("Please enter DOB and Try again");
      else{
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    res.send({
      'p_id': p_id,
      'Age':age
    });
  }}
  });

  app.post('/api/emp', function(req, res) {
    const p_id = req.query.id;
    const DOB = req.query.dob;
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    res.send({
      'p_id': p_id,
      'Age':age
    });
  });

app.post('/api/users',function(req,res){
  const person = req.body;
  res.setHeader('Content-Type','application/JSON');
  const parsedData = JSON.parse(JSON.stringify(person));
  var age=[];
  var today = new Date();
  var ids=[];
  if(!Object.keys(req.body).length)//empty request
  return res.send("Please enter details and try again");
  else
  {
  for (let i = 0; i <parsedData.length; i++)
   {
    if (parsedData[i].id===""){//empty id
    console.log("Please enter ID for record : "+i);
    continue;
    }
    else 
    {
      if(parsedData[i].dob==="")//empty dob-console
      {
        console.log("Please enter DOB for "+parsedData[i].id+" given dob: "+ parsedData[i].dob);
      }
      var birthDate = new Date(parsedData[i].dob);
      var x = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
       {
         x--;
       }
      age[i]=x;
      ids[i]=parsedData[i].id;
    }
    if(parsedData[i].sal<0)//invalid salary-console
      {
       console.log("Please enter valid salary for id: "+parsedData[i].id);
      }
  }
const arry = ids;
const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index) /*duplicate id's*/
const duplicateElements= toFindDuplicates(arry);
console.log(duplicateElements);
  var id_age={};
  for(var j=0;j<age.length;j+=1)
   {
     if(age[j]<=0||Number.isNaN(age[j]))//given dob is empty or >curr_date
          {
             id_age[ids[j]]="Please enter valid DOB";
             continue;
          }
     else{
          if (duplicateElements.includes(ids[j]))//if duplicate elements array has that id then assign it `Multiple records with same ID` 
         {
           id_age[ids[j]]=`Multiple records with same ID`;
         }
         else
         {
             id_age[ids[j]]=age[j];
         }   
       }
     }
return res.status(200).json({id_age});``
}});

app.listen(port);

//if empty array-prints "Please enter details and try again"
//if empty id-prints "Please enter ID for record i" in console
//if dob is empty-"Please enter DOB for 14 given dob: " in console and "Please enter valid DOB" in res
//if sal is neg-"Please enter valid salary for id: " i console
//if dob>curr date-"Please enter valid DOB"
//if given dob format is not "MM/DD/YYYY"-"Please enter valid DOB"
//if more than one record with same ID- "24": "Multiple records with same ID"