import React, { Component } from "react";
import Select from "react-select";

export default class TicketForm extends Component {
  render() {
    const options = this.props.events.map(event => {
      return { value: event.id, label: event.name };
    });
    console.log(options);
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Picture </label>
          <input
            className="form-control"
            type="text"
            name="picture"
            onChange={this.props.onChange}
            value={this.props.values.picture}
          />
        </div>
        <div className="form-group col-sm-12">
          <label className="col-sm-2">Price</label>
          <input
            className="form-control"
            type="number"
            name="price"
            onChange={this.props.onChange}
            value={this.props.values.price}
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
        <Select placeholder="Select an event" options={options} />
        <button type="submit" className="btn btn-dark">
          Save
        </button>
      </form>
    );
  }
}
