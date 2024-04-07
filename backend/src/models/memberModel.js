import mongoose from "mongoose";
//TODO4
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
