var React = require('react');
var Authenticated = require('../../utils/authenticated');
import { createHistory, useBasename } from 'history'
import { Router, History } from 'react-router';
var ref = new Firebase('https://blinding-inferno-1823.firebaseio.com/');
import Rebase from 're-base';
const base = Rebase.createClass('https://blinding-inferno-1823.firebaseio.com/');
// import moment from 'moment';

const history = useBasename(createHistory)({
  basename: '/'
})

var Dashboard = React.createClass({
  mixins: [Authenticated],
  getInitialState: function() {
    return {user: "", byot: {}};
  },
  componentDidMount: function(){
    var byot_obj = {};
    ref.child('byot_schedules').orderByChild('name').equalTo('test1').on("value", function(snapshot) {
      var obj = snapshot.val();
      var uuid = Object.keys(obj);
      var byot = obj[uuid];
      console.log("1", uuid, byot);
      this.setState({byot: byot});
      console.log("byot", this.state.byot, this.state.byot.date)
      console.log(this.state.byot.date);
    }.bind(this));
    this.setState({ user: ref.getAuth().email });
    console.log("current user", ref.getAuth().email );
  },
  newByot: function(){
    var newNote = this.refs.note.getDOMNode().value;
    this.refs.note.getDOMNode().value = '';
    console.log("testting new note", newNote);
    this.props.addNote(newNote);
  },
  submitTalk: function(){
    history.pushState(null, '/public/#/byots/new')
  },
  render: function(){
    var new_byot;
    if ( !this.state.byot ) { new_byot = (
      <div className="col-md-8">
        <button type="button" className="btn btn-block btn-primary" onClick={this.newByot}>Create new BYOT event</button>
      </div>
    ); } else {
      new_byot = (
      <div className="col-md-8">
        <button type="button" className="btn btn-block btn-primary" onClick={this.submitTalk}>Submit your talk</button>
      </div>
    ); }
    return (
      <div className="row">
        <div className="col-md-4">
          {this.state.byot ? `Upcoming BYOT on ${Date(this.state.byot.date)}` : "BYOT not yet scheduled"}
        </div>
        <div className="col-md-4">
          {new_byot}
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;