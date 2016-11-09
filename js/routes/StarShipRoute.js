import Relay from 'react-relay';

export default class extends Relay.Route {
    static queries = {
        character: () => Relay.QL`
          query  {
            character
          }
        `
    };
    static routeName = 'StarShipRoute';
}
// export default class extends Relay.Route {
//     static queries = {
//         character: () => Relay.QL`query { character }`,
//     };
//     static routeName = 'StarShipRoute';
// }
//  const route = {
//     name: 'StarShipRoute', // can be anything, just used as an identifier
//     params: {},
//     queries: {
//         // We can use this shorthand so long as the component we pair this with has
//         // a fragment named "user", as we do above.
//         character: () => Relay.QL`
//            query  {
//              character
//            }
//         `
//     }
// };
// export default route;