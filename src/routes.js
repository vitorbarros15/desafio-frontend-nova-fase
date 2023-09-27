import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import MeetingList from "./layout/List/meetingList";
import FormCreate from "./layout/Form/formCreate";
import ViewMeeting from "./layout/view/viewMeeting";

function Routesx() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MeetingList />} path="/" />
        <Route element={<FormCreate />} path="/criarReuniao" />
        <Route element={<ViewMeeting />} path="/reuniao/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default Routesx;
