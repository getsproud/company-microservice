import Company from '../models/company'
import ServiceClient from '../services/client'

const client = new ServiceClient('employee')

const deleteCompany = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'company',
    i18n: 'COMPANY_ERROR',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  console.log('query', query)

  return (async () => {
    try {
      const employee = await client.send({ type: 'findBy', query: { _id: query.owner } })

      if ((employee.data.roles.indexOf('owner') === -1 || employee.data.company !== query.id) || (employee.data.company !== query.id && employee.data.roles.indexOf('superadmin') === -1)) {
        message.i18n = 'COMPANY_DELETION_OWNER_ONLY'

        return reject(message)
      }

      const company = await Company.findOneAndDelete({ _id: query.id })

      if (!company.data) {
        message.i18n = 'COMPANY_NOT_FOUND'
        message.code = 404

        return reject(message)
      }

      message.i18n = 'COMPANY_DELETION_SUCCESS'
      message.code = 204

      return resolve(message)
    } catch (e) {
      message.stack = e.stack
      message.error = e.error

      return reject(message)
    }
  })()
})

export default deleteCompany
