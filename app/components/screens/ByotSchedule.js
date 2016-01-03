var React = require('react');
var ref = new Firebase('https://blinding-inferno-1823.firebaseio.com/');
var ByotSchedule  = React.createClass({
  handleSubmit: function(){
    var getDate = function(date){
      if(!date) { return; }
      return (new Date(date)).getTime();
    };
    var newByot = {
      name: this.refs.name.getDOMNode().value,
      description: this.refs.desc.getDOMNode().value,
      at: getDate(this.refs.at.getDOMNode().value),
      submissions_till: getDate(this.refs.at.getDOMNode().value)
    };
    ref.child('byot_schedules').push().set(newByot);
    // base.post('byot_schedules', {
    //   data: newSchedule
    // })
    // ref.child('byot_schedules').push().set(newSchedule);
    // ref.child('byot_schedules').once('value', function(snap){
    // }
  },
  render: function(){
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <h3> New BYOT event </h3>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" ref="name" type="text" placeholder="Name your event"/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input className="form-control" ref="desc" type="text" placeholder="Brief description"/>
          </div>
          <div className="form-group">
            <label> Date </label>
            <input className="form-control" ref="at" type="datetime-local"/>
          </div>
          <div className="form-group">
            <label> Submissions till </label>
            <input className="form-control" ref="sub_till" type="datetime-local"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
});

module.exports = ByotSchedule;