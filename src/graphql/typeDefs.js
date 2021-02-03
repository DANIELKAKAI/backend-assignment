const { gql } = require('apollo-server-express');

const typeDefs = gql` 
  type Artist {
    id:ID!
    name: String!
  }

  type Album {
      id:ID!
      name:String!
      artistId:ID!
  }

  type Query {
    artist(id:ID!):Artist!
    artists: [Artist]!,
    albums:[Album]!,
    album(id:ID!):Album!
    artistAlbums(artistId:ID!):[Album]!
  }

  type Mutation {
    createArtist(name:String!):Artist!
    createAlbum(name:String!,artistId:ID!):Album!
    deleteArtist(id:ID!):Artist!
    deleteAlbum(id:ID!):Album!
    updateArtist(id:ID!,name:String):Artist!
    updateAlbum(id:ID!,name:String,artistId:ID):Album!
  }
`;

module.exports = typeDefs;
