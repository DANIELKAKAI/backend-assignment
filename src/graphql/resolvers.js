const Artist = require('../models/Artist');
const Album = require('../models/Album');

const resolvers = {
  Query: {
    artists: () => Artist.find(),
    artist: (_, { id }) => Artist.findById(id),
    artistAlbums: (_, { artistId }) => Album.find({ artistId }),
    album: (_, { id }) => Album.findById(id),
    albums: () => Album.find(),
  },
  Mutation: {
    createArtist: async (_, { name }) => {
      const artist = new Artist({ name });
      await artist.save();
      return artist;
    },
    createAlbum: async (_, { name, artistId }) => {
      const album = new Album({ name, artistId });
      await album.save();
      await Artist.update({ _id: artistId }, { $push: { albums: album._id } });
      return album;
    },
    updateArtist: async (_, {
      id, name,
    }) => {
      const artist = await Artist.findOneAndUpdate(
        { _id: id }, { name }, { new: true, runValidators: true },
      );
      return artist;
    },
    updateAlbum: async (_, {
      id, name, artistId,
    }) => {
      const data = {};
      name ? data.name = name : null;
      artistId ? data.artistId = artistId : null;
      const album = await Album.findOneAndUpdate(
        { _id: id }, data, { new: true, runValidators: true },
      );
      return album;
    },
    deleteArtist: async (_, { id }) => {
      const artist = await Artist.findOneAndRemove({ _id: id });
      return artist;
    },
    deleteAlbum: async (_, { id }) => {
      const album = await Album.findOneAndRemove({ _id: id });
      return album;
    },

  },
};

module.exports = resolvers;
