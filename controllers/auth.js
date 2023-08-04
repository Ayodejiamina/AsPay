const auth = require('../models/auth')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.Register = (req, res) => {
    let errors = req.flash('errors')
    let oldinput = req.flash('oldInput')
    const countryCode = "+234"
    res.render("auth/register.ejs", { title: "Register", regErr: errors, olds: oldinput,countryCode })
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
            auth.create({
                name: name,
                email: email,
                phone: phone,
                password: hashed
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
    res.render('auth/login.ejs', { title: "Login", logErr: errors })
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
                req.flash('errors', "invalid user details")
                req.session.save(() => {
                    res.redirect('/login')
                    return result;
                })
            }
            bcrypt.compare(password, result.password).then(validate => {
                console.log(validate)
                if (!validate) {
                    req.flash('error', 'Incorrect password')
                    req.session.save(() => {
                        return res.redirect('/login')
                    })
                }
                req.session.isLoggedIn = true
                req.session.userData = result
                // console.log(result)
                return req.session.save(() => {
                    res.redirect('/')
                })
            }).catch(err => {
                console.log(err)
            })

        })
    }
}