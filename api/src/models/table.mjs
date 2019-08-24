import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TableSchema = new Schema({
  host: { type: Schema.ObjectId, ref: 'User', required: true },
  games: [{ type: Schema.ObjectId, ref: 'Game', required: true }],
  players: [{ type: Schema.ObjectId, ref: 'User', required: true }],
  location: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  status: { 
    type: String,
    enum: ['Scheduled', 'In-Progress', 'Completed'],
    default: 'Scheduled'
  },
})

export default mongoose.model('Table', TableSchema)