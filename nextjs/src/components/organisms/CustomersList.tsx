import React from "react";
import { UserListItem } from "../molecules/UserListItem";

interface User {
  id: string;
  name: string;
  email: string;
}

interface CustomersListProps {
  users: User[];
  onSelectUser?: (id: string) => void;
}

export const CustomersList = ({ users, onSelectUser }: CustomersListProps) => {
  return (
    <ul className="space-y-3">
      {users.map((user) => (
        <li key={user.id}>
          <UserListItem
            name={user.name}
            email={user.email}
            onClick={() => onSelectUser && onSelectUser(user.id)}
          />
        </li>
      ))}
    </ul>
  );
};
