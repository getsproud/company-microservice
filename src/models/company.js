import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  street: Schema.Types.String,
  zip: Schema.Types.String,
  city: Schema.Types.String,
  country: Schema.Types.String,
  phone: Schema.Types.String,
  domain: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9][a-zA-Z0-9-_]*)/
  },
  emailDomains: {
    type: [Schema.Types.String],
    match: /^((?:([a-z0-9]\.|[a-z0-9][a-z0-9-]{0,61}[a-z0-9])\.)+)([a-z0-9]{2,63}|(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]))\.?$/,
    required: true
  },
  website: {
    type: Schema.Types.String,
    match: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._\-+~#=]{2,256}\.[a-z]{2,6}\b/
  },
  employees: [{
    type: Schema.Types.ObjectId,
    index: true
  }]
}, { timestamps: true })

schema.plugin(mongoosePaginate)
const Company = model('company', schema)

export default Company
