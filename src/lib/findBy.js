import Company from '../models/company'

const findBy = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'company',
    i18n: 'COMPANY_ERROR',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Company.findOne(query).exec().then(company => {
    message.data = company

    if (!company) {
      message.i18n = 'COMPANY_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'COMPANY_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findBy
