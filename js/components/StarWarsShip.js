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
class StarWarsShip extends React.Component {
  handleChangeFirst = (e) => {
    this.props.relay.setVariables({firstPeople: e.target.value});
  };
  handleChangeSecond = (e) => {
    this.props.relay.setVariables({secondPeople: e.target.value})
  };
  render() {
    const {character} = this.props;
    console.log(character);
    let {firstPeople, secondPeople} = this.props.relay.variables;
    return <div>
      <select defaultValue={firstPeople} onChange={this.handleChangeFirst}>
        <option value="1">LUKE</option>
        <option value="2">R2D2</option>
        <option value="3">C3PO</option>
        <option value="4">CHEWBACCA</option>
      </select>
      <select defaultValue={secondPeople} onChange={this.handleChangeSecond}>
        <option value="1">LUKE</option>
        <option value="2">R2D2</option>
        <option value="3">C3PO</option>
        <option value="4">CHEWBACCA</option>
      </select>
      <h3>{character.commonfriends.map((value)=>value.name+' ')}</h3>
    </div>;
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
        commonfriends(firstPeople: $firstPeople, secondPeople: $secondPeople){
          name
        }
      }
    `,
  },
});
