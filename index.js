const fs = require("fs")
const readline = require("readline");
const {parse} = require('csv-parse');
const sgMail = require('@sendgrid/mail');
const sgHelpers = require('@sendgrid/helpers');
const { create } = require("domain");
const Personalization = sgHelpers.classes.Personalization;
const API_KEY = '<YOUR API KEY>';//Add your own SendGrid API key here
sgMail.setApiKey(API_KEY);

var csvData=[];//sets up array to hold the csv data read in the future

//file reader for the csv. set to read each row as: 
//FIRSTNAME,LASTNAME,SUBJECT,EMAIL,CAPTION,REC1TITLE,REC1DESCRIPTION,IMG1,LINK1,REC2TITLE,REC2DESCRIPTION,IMG2,LINK2,REC3TITLE,REC3DESCRIPTION,IMG3,LINK3,REC4TITLE,REC4DESCRIPTION,IMG4,LINK4,REC5TITLE,REC5DESCRIPTION,IMG5,LINK5
fs.createReadStream("UserDataRecs.csv")
.pipe(parse({delimiter: ','}))
.on('data', function(csvrow) {
  console.log(csvrow);
  //Forms the email message according to the read in data
  let msg = {
    from: '<VERIFIED SENDER>',//use your verified sender's email on SendGrid
    to:csvrow[3],
    name: csvrow[0]+" "+csvrow[1],
    personalizations: [],
    
    templateId: '<TEMPLATE ID>',
     dynamic_template_data: {
      subject: csvrow[2],
      first_name: csvrow[0],
      caption: csvrow[4],
      
      rec1title:csvrow[5],//recomendation 1
      rec1desc:csvrow[6],
      rec1img:csvrow[7],
      rec1link:csvrow[8],
      
      rec2title:csvrow[9],//recomendation 2
      rec2desc:csvrow[10],
      rec2img:csvrow[11],
      rec2link:csvrow[12],
      
      rec3title:csvrow[13],//recomendation 3
      rec3desc:csvrow[14],
      rec3img:csvrow[15],
      rec3link:csvrow[16],
      
      rec4title:csvrow[17],//recomendation 4
      rec4desc:csvrow[18],
      rec4img:csvrow[19],
      rec4link:csvrow[20],
      
      rec5title:csvrow[21],//recomendation 5
      rec5desc:csvrow[22],
      rec5img:csvrow[23],
      rec1link:csvrow[24]
      },
  };
  const personalization1 = new Personalization();
  personalization1.setTo(csvrow[3]);
  personalization1.setSubject(csvrow[2]);
  msg.personalizations.push(personalization1);
  
//Sends out each email for the entire csv file's list
sgMail
.send(msg)
.then(response=> console.log('Email Sent!'))
.catch((error)=> console.log(error.response.body));
})
.on('end',function() {
});


