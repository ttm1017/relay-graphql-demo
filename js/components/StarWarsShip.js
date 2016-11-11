
import React from 'react';
import Relay from 'react-relay';
import ReactHighcharts from 'react-highcharts';
//const ReactHighcharts = require('react-highcharts');
console.log(ReactHighcharts );
class StarWarsShip extends React.Component {
  handleChangeFirst = (e) => {
    this.props.relay.setVariables({firstPeople: e.target.value});
  };
  handleChangeSecond = (e) => {
    this.props.relay.setVariables({secondPeople: e.target.value})
  };
  render() {
    const {character} = this.props;
    const config = {
      chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
      title: {
        text: 'Show every period the number of the characters'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          }
        }
      },
      series: [{
        name: 'characters compare percent',
        colorByPoint: true,
        data: character.characterOfPeriod.map((value) => ({name: value.period, y: value.number}))
      }]};
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
      <ReactHighcharts config={config}></ReactHighcharts>
    </div>;
  }
}
// <ReactHighcharts config = {}></ReactHighcharts>
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
        },
        characterOfPeriod {
          period,
          number
        }
      }
    `,
  },
});
