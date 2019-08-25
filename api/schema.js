import mongoose from 'mongoose'

const Schema = mongoose.Schema

// For reference
const Schema = new Schema({
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    createdAt: { type: Date, required: true },
    games: [{ type: Schema.ObjectId, ref: 'Game' }],
    elos: [{ type: Schema.ObjectId, ref: 'Elo' }],
    history: [{ type: Schema.ObjectId, ref: 'GameResult' }]
  },
  elo: {
    game: { type: Schema.ObjectId, ref: 'Game', required: true },
    rating: { type: Number, required: true }
  },
  results: {
    game: { type: Schema.ObjectId, ref: 'Game', required: true },
    players: [{ type: Schema.ObjectId, ref: 'User' }],
    table: { type: Schema.ObjectId, ref: 'Table' },
    validatedPlayers: [{ type: Schema.ObjectId, ref: 'User' }],
    validated: { type: Boolean, required: true },
    winner: [{ type: Schema.ObjectId, ref: 'User' }]
  },
  game: {
    name: { type: String, required: true, unique: true },
    yearPublished: { type: Number },
    minPlayers: { type: Number },
    maxPlayers: { type: Number, required: true },
    publisher: { type: String },
    description: { type: String },
    averagePlaytime: { type: Number }
  },
  table: {
    host: { type: Schema.ObjectId, ref: 'User', required: true },
    games: [{ type: Schema.ObjectId, ref: 'Game', required: true }],
    players: [{ type: Schema.ObjectId, ref: 'User', required: true }],
    joinRequests: [{ type: Schema.ObjectId, ref: 'User', required: true }],
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
  }
})