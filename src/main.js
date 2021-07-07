import { Responder } from 'cote'
import { connect } from 'mongoose'

import createCompany from './lib/createCompany'
import updateCompany from './lib/updateCompany'
import deleteCompany from './lib/deleteCompany'
import findBy from './lib/findBy'
import findAllBy from './lib/findAllBy'

const PORT = 50051

const connectRetry = t => {
  let tries = t

  return connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/sproud${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .catch(e => {
      if (tries < 5) {
        tries += 1
        setTimeout(() => connectRetry(tries), 5000)
      }

      throw new Error(e)
    })
}

connectRetry(0)

try {
  const responder = new Responder({
    name: 'Company Service', port: PORT, key: 'company'
  })

  responder.on('findBy', findBy)
  responder.on('findAllBy', findAllBy)
  responder.on('createCompany', createCompany)
  responder.on('updateCompany', updateCompany)
  responder.on('deleteCompany', deleteCompany)

  responder.on('liveness', () => new Promise(resolve => resolve(200)))
  responder.on('readiness', () => new Promise(resolve => resolve(200)))

  // eslint-disable-next-line
  console.log(`🤩 Company Microservice bound to port ${PORT}`)
} catch (e) {
  // eslint-disable-next-line
  console.error(`${e.message}`)
  throw new Error(e)
}
