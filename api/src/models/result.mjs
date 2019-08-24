import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ResultSchema = new Schema({
  game: { type: Schema.ObjectId, ref: 'Game', required: true },
  players: [{ type: Schema.ObjectId, ref: 'User' }],
  table: { type: Schema.ObjectId, ref: 'Table' },
  validatedPlayers: [{ type: Schema.ObjectId, ref: 'User' }],
  validated: { type: Boolean, required: true },
  winner: [{ type: Schema.ObjectId, ref: 'User' }]
})

const deepPopulate = function(next) {
  this.populate('game')
  this.populate('players', 'firstName lastName username')
  this.populate('validatedPlayers', 'firstName lastName username')
  this.populate('winner', 'firstName lastName username')
  this.populate('table')
  next()
}

// Populate embedded documents
ResultSchema
  .pre('find', deepPopulate)
  .pre('findOne', deepPopulate)

export default mongoose.model('Result', ResultSchema)