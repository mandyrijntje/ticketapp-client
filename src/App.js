import React from "react";
import { Route } from "react-router-dom";
import UserPage from "./components/UserPage";
import AuthPage from "./components/AuthPage";
import SignupFormContainer from "./components/SignupFormContainer";
import AllUsersContainer from "./components/AllUsersContainer";
import AllEvents from "./components/AllEvents";
import AllTickets from "./components/AllTickets";
import EventCard from "./components/EventCard";
import TicketCard from "./components/TicketCard";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ProfilePage from "./components/ProfilePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/login" component={AuthPage} />
      <Route exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/users" component={AllUsersContainer} />
      <Route exact path="/event" component={AllEvents} />
      <Route exact path="/event/:eventId/ticket" component={AllTickets} />
      <Route exact path="/event/:eventId" component={EventCard} />
      <Route
        exact
        path="/event/:eventId/ticket/:ticketId"
        component={TicketCard}
      />
      <Route exact path="/users/:userId" component={UserPage} />
      <Route exact path="/" component={Homepage} />
    </div>
  );
}

export default App;
