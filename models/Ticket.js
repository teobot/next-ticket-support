// getting access to schema
import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  replies: [replySchema],
});

const ticketSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  whoToContact: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "open",
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  branch: {
    type: String,
    default: "",
  },
  colour: {
    type: String,
  },
  comments: [commentSchema],
});

export default mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
