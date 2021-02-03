const mongoose = require('mongoose');

const { Schema } = mongoose;

const artistSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Album',
    },
  ],
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
