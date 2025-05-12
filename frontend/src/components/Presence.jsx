import React from "react";
import { Presence } from "@chakra-ui/react";

const PresenceWrapper = ({ children }) => {
  return (
    <Presence
      present={open}
      animationName={{ _open: "fade-in", _closed: "fade-out" }}
      animationDuration="slowest"
    >
      {children}
    </Presence>
  );
};

export default PresenceWrapper;
