import mongoose from 'mongoose'

const Schema = mongoose.Schema

const EloSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  game: { type: Schema.ObjectId, ref: 'Game', required: true },
  rating: { type: Number, required: true, default: 1500 },
  timesPlayed: { type: Number, required: true, default: 0 }
})

const deepPopulate = function(next) {
  this.populate('game')
  next()
}

// Populate embedded documents
EloSchema
  .pre('find', deepPopulate)
  .pre('findOne', deepPopulate)

export default mongoose.model('Elo', EloSchema)