const {Router} = require('express')
const router = Router()
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const keys = require('../keys')
const regEmails = require('../emails/registration')

const transporter = nodemailer.createTransport(sendgrid({
  auth: { api_key: keys.SENDGRID_API_KEY }
}))


router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError')
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')  
  })
})

router.post('/login', async (req, res) => {
  try{
    const {email, password} = req.body
    const candidate = await User.findOne({email})

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password)

      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save( err => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Ошибка паролей')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'Ошибка ввода данных')
      res.redirect('/auth/login#login')
    }

  } catch(e) {
    console.log(e)
  }
})

router.post('/register', async (req, res) => {
  try {
    const {email, password, repeat, name} = req.body
    const candidate = await User.findOne({email})
    if (candidate) {
      req.flash('registerError', 'Пользователь занят')
      res.redirect('/auth/login#register')
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email, name, password : hashPassword, cart: {items: []}
      })
      await user.save()
      // await transporter.sendMail(regEmails(email))
      res.redirect('/auth/login#login')
    }
  } catch(e) {
    console.log(e)
  }
})



module.exports = router