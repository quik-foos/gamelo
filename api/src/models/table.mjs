import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TableSchema = new Schema({
  host: { type: Schema.ObjectId, ref: 'User', required: true },
  games: [{ type: Schema.ObjectId, ref: 'Game', required: true }],
  players: [{ type: Schema.ObjectId, ref: 'User', required: true }],
  joinRequests: [{ type: Schema.ObjectId, ref: 'User', required: true }],
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  photoURL: { type: String },
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  location: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  status: { 
    type: String,
    enum: ['Scheduled', 'In-Progress', 'Completed'],
    default: 'Scheduled'
  },
})

const deepPopulate = function(next) {
  this.populate('host', 'firstName lastName username')
  this.populate('games')
  this.populate('players', 'firstName lastName username')
  this.populate('joinRequests', 'firstName lastName username')
  next()
}

// Populate embedded documents
TableSchema
  .pre('find', deepPopulate)
  .pre('findOne', deepPopulate)

export default mongoose.model('Table', TableSchema)
