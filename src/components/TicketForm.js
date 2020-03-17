import React, { Component } from "react";

export default class TicketForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            onChange={this.props.onChange}
            value={this.props.values.title}
          />
        </div>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Url </label>
          <input
            className="form-control"
            type="text"
            name="url"
            onChange={this.props.onChange}
            value={this.props.values.url}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Save
        </button>
      </form>
    );
  }
}
