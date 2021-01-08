const keys = require('../keys')

module.exports = function(email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Регистрация на проекте',
    html: `
      <h1>Добро пожаловать в магазин</h1>
      <p>Вы успешно создали аккаунт</p>
    `
  }
}