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

export default mongoose.model('Result', ResultSchema)