import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import AdminDropdown from "./AdminDropdown";

const RoleBasedDropdown: React.FC = () => {
  const { user } = useAuth();

  // Determine which dropdown to display based on user role
  if (user && user.role.toLowerCase() === "67c024616b4448e1eab6a861") {
    return <AdminDropdown />;
  }

  // Default to user dropdown

  return <UserDropdown />;
};

export default RoleBasedDropdown;
