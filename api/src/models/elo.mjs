import mongoose from 'mongoose'

const Schema = mongoose.Schema

const EloSchema = new Schema({
  game: { type: Schema.ObjectId, ref: 'Game', required: true },
  rating: { type: Number, required: true }
})

export default mongoose.model('Elo', EloSchema)