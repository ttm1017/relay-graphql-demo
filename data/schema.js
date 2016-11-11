
'use strict';

import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
    getCharacter,
    getAllCharacter,
    getPeriodCharactors,
    getPeriodCharactor,
    getData
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Character') {
      return getAllCharacter();
    } else if (type === 'commonFriends') {
      return getCharacter(id);
    } else if (type === 'characterOfPeriod') {
      return getPeriodCharactor(id);
    }else {
      return null;
    }
  },
  (obj) => {
    if (obj.friends) {return commonFriendsType;}
    else if (obj.period) {return characterOfPeriodType;}
    else {return characterType;}
  }
);


const commonFriendsType = new GraphQLObjectType({
  name: 'commonFriends',
  description: 'return two people common friends',
  fields: () => ({
    id: globalIdField('commonFriends'),
    name: {
      type: GraphQLString,
      description: 'friends'
    }
  }),
  interfaces: [nodeInterface]
});

const characterOfPeriodType = new GraphQLObjectType({
  name: 'characterOfPeriod',
  fields: () => ({
    id: globalIdField('characterOfPeriod'),
    period: {
      type: GraphQLString
    },
    number: {
      type: GraphQLInt
    }
  }),
  interfaces: [nodeInterface]
});
const characterType = new GraphQLObjectType({
  name: 'Character',
  description: 'character model',
  fields: () => ({
    id: globalIdField('Character'),
    commonfriends: {
      type: new GraphQLList(commonFriendsType),
      description: 'The character friends.',
      args: {
        firstPeople: {type: GraphQLString},
        secondPeople: {type: GraphQLString}
      },
      resolve: (character, args) => {
        let peopleId = [];
        for (var obj in args) {
          peopleId.push(args[obj])
        }
        const commonFriends = getCharacter(peopleId[0]).friends.filter(function(n) {
          return getCharacter(peopleId[1]).friends.indexOf(n) != -1;
        });
        return commonFriends.map((value) => getCharacter(value));
      }
    },
    characterOfPeriod: {
      type: new GraphQLList(characterOfPeriodType),
      resolve: (data) => {
        return getPeriodCharactors();
      }
    }
  }),
  interfaces: [nodeInterface],
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    character: {
      type: characterType,
      resolve: () => {return getData()}
    },
    node: nodeField
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const schema = new GraphQLSchema({
  query: queryType
});
