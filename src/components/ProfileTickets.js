import React, { Component } from "react";
import EditTicketFormContainer from "./EditTicketFormContainer";
import ImageCard from "./ImageCard";

class ProfileTickets extends Component {
  state = {
    imagesInEdit: []
  };

  toggleForm = image => {
    const newState = this.state.imagesInEdit.includes(image.id)
      ? this.state.imagesInEdit.filter(id => id !== image.id)
      : this.state.imagesInEdit.concat(image.id);

    this.setState({ imagesInEdit: newState });
  };

  render() {
    return this.props.images.map(image => {
      const showForm = this.state.imagesInEdit.includes(image.id);

      return (
        <div key={image.id}>
          <ImageCard image={image} />
         <div>
           <button
            className="btn btn-dark"
            onClick={() => this.toggleForm(image)}
          >
            Edit mode
          </button>
          
          {showForm && <EditTicketFormContainer id={image.id} />}
        </div>
          </div>
      );
    });
  }
}

export default ProfileTickets;
