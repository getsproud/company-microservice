import Company from '../models/company'

const createCompany = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'company',
    i18n: 'COMPANY_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Company.create(query).then(company => {
    message.i18n = 'COMPANY_CREATION_SUCCESS'
    message.code = 200
    message.data = company

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default createCompany
