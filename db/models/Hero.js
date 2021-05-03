import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  name: String,
  powers: [String],
  enemies: [String],
});

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
