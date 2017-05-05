import mongoose from 'mongoose';

const { Schema } = mongoose;

const Home = new Schema({
  finnkode: {
    type: Number,
    required: true,
    index: true,
    unique: true,
    min: 1,
  },
  order: {
    type: Number,
    min: 0,
  },
});

export default mongoose.model('Home', Home);
