/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import Relay from 'react-relay';
let id;
class StarWarsShip extends React.Component {
  render() {
    const {character} = this.props;
    id = character.id;
    return <div>{character.name}</div>;
  }
}

export default Relay.createContainer(StarWarsShip, {
  initialVariables: {
    firstPeople: '1',
    secondPeople: '2'
  },
  fragments: {
    character: () => Relay.QL`
      fragment on Character {
        id,
        name,
        commonfriends(firstPeople: $firstPeople, secondPeople: $secondPeople){
          name
        }
      }
    `,
  },
});
