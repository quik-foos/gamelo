import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  games: [{ type: Schema.ObjectId, ref: 'Game' }],
  elos: [{ type: Schema.ObjectId, ref: 'Elo' }],
  history: [{ type: Schema.ObjectId, ref: 'GameResult' }]
})

export default mongoose.model('Profile', ProfileSchema)