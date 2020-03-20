import React, { Component } from "react";

export default class EventForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Name </label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={this.props.onChange}
            value={this.props.values.name}
          />
        </div>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Description</label>
          <input
            className="form-control"
            type="text"
            name="description"
            onChange={this.props.onChange}
            value={this.props.values.description}
          />
        </div>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Picture</label>
          <input
            className="form-control"
            type="text"
            name="picture"
            onChange={this.props.onChange}
            value={this.props.values.picture}
          />
        </div>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Event Start Date</label>
          <input
            className="form-control"
            type="date"
            name="startDate"
            onChange={this.props.onChange}
            value={this.props.values.startDate}
          />
        </div>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Event End Date</label>
          <input
            className="form-control"
            type="date"
            name="endDate"
            onChange={this.props.onChange}
            value={this.props.values.endDate}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Save
        </button>
      </form>
    );
  }
}
