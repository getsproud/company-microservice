import Company from '../models/company'

const updateCompany = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'company',
    i18n: 'COMPANY_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Company.findOneAndUpdate({ _id: query._id }, query, { new: true }).then(company => {
    if (!company) {
      message.i18n = 'COMPANY_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'COMPANY_UPDATE_SUCCESS'
    message.code = 200
    message.data = company

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default updateCompany
