"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/graphql-client";
import { GET_BOOKS } from "@/graphql/books";
import { GET_CUSTOMERS } from "@/graphql/customers";
import { GET_RENTALS } from "@/graphql/rentals";
import { useState } from "react";
import { LoginTemplate } from "@/components/templates/LoginTemplate";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import {
  Book,
  Customer,
  GetBooksData,
  GetCustomersData,
  GetRentalsData,
  Rental,
} from "@/types";

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showRentModal, setShowRentModal] = useState(false);

  const { data: booksData, isLoading: booksLoading } = useQuery({
    queryKey: ["books"],
    queryFn: () => client.request<GetBooksData>(GET_BOOKS),
  });

  const {
    data: customersData,
    isLoading: customersLoading,
    error: customersError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => client.request<GetCustomersData>(GET_CUSTOMERS),
  });

  const { data: rentalsData } = useQuery({
    queryKey: ["rentals"],
    queryFn: () => client.request<GetRentalsData>(GET_RENTALS),
  });

  const handleLogin = (id: string) => {
    setSelectedUserId(id);
  };

  const handleLogout = () => {
    setSelectedUserId(null);
    setShowRentModal(false);
  };

  const currentUser = customersData?.customers.find(
    (c) => c.id === selectedUserId,
  );

  const userRentals = rentalsData?.rentals.filter(
    (r) => r.customer.id === selectedUserId,
  );

  const currentRentals = userRentals?.filter((r) => !r.returnDate) || [];
  const pastRentals = userRentals?.filter((r) => r.returnDate) || [];

  if (!selectedUserId) {
    return (
      <LoginTemplate
        users={customersData?.customers || []}
        isLoading={customersLoading}
        error={customersError}
        onSelectUser={handleLogin}
      />
    );
  }

  return (
    <DashboardTemplate
      currentUser={currentUser!}
      currentRentals={currentRentals}
      pastRentals={pastRentals}
      allBooks={booksData?.books || []}
      isBooksLoading={booksLoading}
      showRentModal={showRentModal}
      onLogout={handleLogout}
      onOpenRentModal={() => setShowRentModal(true)}
      onCloseRentModal={() => setShowRentModal(false)}
      onRentBook={(book) => {
        alert(`Rent requested: ${book.title}`);
        setShowRentModal(false);
      }}
      onReturnBook={(rental) => {
        alert(`Return requested for: ${rental.book.title}`);
      }}
    />
  );
}
