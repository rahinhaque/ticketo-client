import { roleValidator } from "@/lib/api/session";
import React from "react";

const OrganizerLayout = async ({ children }) => {
  await roleValidator("organizer");

  return children;
};

export default OrganizerLayout;
