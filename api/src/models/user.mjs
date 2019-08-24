import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
  games: [{ type: Schema.ObjectId, ref: 'Game' }],
  elo: [{ type: Schema.ObjectId, ref: 'Elo' }],
  results: [{ type: Schema.ObjectId, ref: 'Result' }]
})

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

UserSchema.virtual('password').set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
})

const deepPopulate = function(next) {
  this.populate('elo')
  this.populate('games')
  this.populate('results')
  next()
}

// Populate embedded documents
UserSchema
  .pre('findOne', deepPopulate)

export default mongoose.model('User', UserSchema)