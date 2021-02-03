const mongoose = require('mongoose');

const { Schema } = mongoose;

const albumSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
