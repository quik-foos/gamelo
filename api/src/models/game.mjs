import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GameSchema = new Schema({
  name: { type: String, required: true, unique: true },
  yearPublished: { type: Number },
  minPlayers: { type: Number },
  maxPlayers: { type: Number, required: true },
  publisher: { type: String },
  description: { type: String },
  averagePlaytime: { type: Number }
})

export default mongoose.model('Game', GameSchema)