const express = require("express");
const Email = require("../models/email");
const nodemailer = require('nodemailer')
const router = express.Router()
const fs = require("fs")
const path = require("path")
const ejs = require('ejs')

//  create transporter 
let transporter = nodemailer.createTransport({
  service: 'gmail',

  host: "smtp.gmail.com",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL ,// generated ethereal user
    pass: process.env.PASSWORD// generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
}
});

// post email with text
router.post("/email" , async (req , res)=>{
  try {
    await Email.create(req.body)
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
    });


    res.send({message: "created successfully"})

  } catch (error) {
    console.log(error)
    res.status(500).send({error : "error error"})
  }
} )

router.post("/email-html" , async (req , res)=>{
  try {
    await Email.create(req.body)  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: "<b>Hello world?</b>", // html body
    });


    res.send({message: "created successfully"})

  } catch (error) {
    console.log(error)
    res.status(500).send({error : "error error"})
  }
} )


router.post("/email-static-html" , async (req , res)=>{
  try {
    await Email.create(req.body)  

    // load content 
    const mailPath = path.resolve('./mailTemplate/welcome.ejs')
    const fileContent = fs.readFileSync(mailPath , {encoding:"utf8"})
    // console.log(fileContent)
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: fileContent, // html body
    });


    res.send({message: "created successfully"})

  } catch (error) {
    console.log(error)
    res.status(500).send({error : "error error"})
  }
} )


//add with html css and name
router.post("/email-ejs/:name" , async (req , res)=>{
  try {
    await Email.create(req.body)  
    const mailPath = path.resolve('./mailTemplate/welcome2.ejs')
    const fileContent = fs.readFileSync(mailPath , {encoding:"utf8"})
    const mailParams = {
      name : req.params.name 
    }

    const render = ejs.render(fileContent , mailParams)





    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: render, // html body
      attachments: [
        {   // utf-8 string as an attachment
            filename: 'my-image.png',
            path: './my-image.png'
        },
      ]
    });


    res.send({message: "created successfully"})

  } catch (error) {
    console.log(error)
    res.status(500).send({error : "error error"})
  }
} )


//add with photo




router.post("/email-ejs/photo" , async (req , res)=>{
  




    

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      // html: render, // html body
      attachments: [
        {   // utf-8 string as an attachment
            filename: 'my-image.png',
            path: './my-image.png'
        },
      ]
    });


    res.send({message: "created successfully"})

  
} )



module.exports = router
