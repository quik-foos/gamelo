import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GameSchema = new Schema({
  name: { type: String, required: true},
  genre: { type: String, required: true },
  players: { type: Number, required: true }
})


export const Game = mongoose.model('Game', GameSchema)