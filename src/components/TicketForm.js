import React, { Component } from "react";
import Select from "react-select";

export default class TicketForm extends Component {
  render() {
    const options = [
      { value: "1", label: "Pool Party" },
      { value: "2", label: "Rock-a-harder Marathon" },
      { value: "3", label: "Serena Special: Retro Calling" },
      { value: "4", label: "Mario Kart - Gaming Challenge" },
      { value: "5", label: "Kickback: Global Massage Day" },
      { value: "6", label: "Italian Nights at Olive Garden" },
      { value: "7", label: "Ajax vs Ajax, the real match" },
      { value: "8", label: "My birthday" },
      { value: "9", label: "Teen Life Weekend Escape" },
      { value: "10", label: "The Tenth Event" },
      { value: "11", label: "The Past Event" },
      { value: "12", label: "The Soon to be Past event" },
      { value: "13", label: "Can I actually post this event?" }
    ];
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
        <Select placeholder='Select an event' options={options} />
        <button type="submit" className="btn btn-dark">
          Save
        </button>
      </form>
    );
  }
}
