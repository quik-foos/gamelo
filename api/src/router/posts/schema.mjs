import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  name: { type: String, required: true},
  date: { type: Date, required: true },
  location: { type: String, required: true },
  game: { type: Schema.ObjectId, ref: 'Game' }
})


export const Post = mongoose.model('Post', PostSchema)