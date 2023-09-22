const auth = require('../models/auth')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')

exports.Register = (req, res) => {
    let errors = req.flash('errors')
    let oldinput = req.flash('oldInput')
    const countryCode = "+234"
    res.render("auth/register.ejs", { title: "Register", regErr: errors, olds: oldinput, countryCode })
}
exports.postReg = (req, res) => {
    const { name, email, phone, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const oldInput = {
            name: name,
            email: email,
            phone: phone,
        }
        req.flash('oldInput', oldInput)
        req.flash("errors", errors.array())
        req.session.save(() => {
            res.redirect('/register')
        })
    } else {
        bcrypt.hash(password, 12).then(hashed => {
            let account =[]
            let acctnum;
            for(let i = 0;i<8;i++){ 
                acctnum = Math.floor(Math.random()*10);
                account += acctnum
                console.log(account)
            }
      

            auth.create({
                name: name,
                email: email,
                phone: phone,
                password: hashed,
                acctNum:"31"+account
            }).then(result => {
                req.session.save(() => {
                    return res.redirect('/login')
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }
}
exports.login = (req, res) => {
    let errors = req.flash('errors')
    let emailErr = req.flash('eMerrors')
    let passErr = req.flash('perror')
    res.render('auth/login.ejs', { title: "Login", logErr: errors, emerr: emailErr, perrors: passErr })
}
exports.postLog = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array())
        req.session.save(() => {
            res.redirect('/login')
        })
    } else {
        const { email, password } = req.body
        auth.findOne({
            where: {
                email: email
            }
        }).then(result => {
            if (!result) {
                req.flash('eMerrors', "invalid user details")
                req.session.save(() => {
                    res.redirect('/login')
                    return result;
                })
            }
            bcrypt.compare(password, result.password).then(validate => {
                console.log(validate)
                if (!validate) {
                    req.flash('perror', 'Incorrect password')
                    req.session.save(() => {
                        return res.redirect('/login')
                    })
                }
                req.session.isLoggedIn = true
                req.session.userData = result
                // console.log(result)
                return req.session.save(() => {
                    res.redirect('/dashboard')
                })
            }).catch(err => {
                console.log(err)
            })

        })
    }
}
exports.Index =(req,res)=>{
res.render('index.ejs',{title:"Home"})
}