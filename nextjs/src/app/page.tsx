"use client";

import {
  GET_RENTALS,
  RENT_BOOK,
  RETURN_BOOK,
  BOOK_RETURNED,
} from "@/graphql/rentals";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "graphql-ws";
import { useEffect } from "react";
import { client } from "@/lib/graphql-client";
import { GET_BOOKS } from "@/graphql/books";
import { GET_CUSTOMERS } from "@/graphql/customers";
import { useState } from "react";
import { LoginTemplate } from "@/components/templates/LoginTemplate";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { Toast } from "@/components/atoms/Toast";
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
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const queryClient = useQueryClient();

  useEffect(() => {
    const wsClient = createClient({
      url: "ws://localhost:4000/graphql",
    });

    const unsubscribe = wsClient.subscribe(
      {
        query: BOOK_RETURNED as string,
      },
      {
        next: (data: any) => {
          const returnedBook = data?.data?.bookReturned;
          if (returnedBook) {
            const message = `'${returnedBook.book.title}' 책이 반납되었습니다.`;
            setToast({ message, isVisible: true });
            queryClient.invalidateQueries({ queryKey: ["rentals"] });
            queryClient.invalidateQueries({ queryKey: ["books"] });
          }
        },
        error: (err) => console.error("Subscription error:", err),
        complete: () => console.log("Subscription complete"),
      },
    );

    return () => {
      unsubscribe();
      wsClient.dispose();
    };
  }, [queryClient]);

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

  const rentBookMutation = useMutation({
    mutationFn: (variables: { bookId: string; customerId: string }) =>
      client.request(RENT_BOOK, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setShowRentModal(false);
      setToast({ message: "책을 대여했습니다.", isVisible: true });
    },
    onError: (error: any) => {
      setToast({
        message:
          error?.response?.errors?.[0]?.message || "대여에 실패했습니다.",
        isVisible: true,
      });
    },
  });

  const returnBookMutation = useMutation({
    mutationFn: (rentalId: string) => client.request(RETURN_BOOK, { rentalId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setToast({ message: "책을 반납했습니다.", isVisible: true });
    },
    onError: () => {
      setToast({ message: "반납에 실패했습니다.", isVisible: true });
    },
  });

  const handleLogin = (id: string) => {
    setSelectedUserId(id);
  };

  const handleLogout = () => {
    setSelectedUserId(null);
    setShowRentModal(false);
  };

  const currentUser = customersData?.customers.find(
    (c: Customer) => c.id === selectedUserId,
  );

  const userRentals = rentalsData?.rentals.filter(
    (r: Rental) => r.customer.id === selectedUserId,
  );

  const currentRentals =
    userRentals?.filter((r: Rental) => !r.returnDate) || [];
  const pastRentals = userRentals?.filter((r: Rental) => r.returnDate) || [];

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
    <>
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
          rentBookMutation.mutate({
            bookId: book.id,
            customerId: selectedUserId!,
          });
        }}
        onReturnBook={(rental) => {
          if (confirm(`${rental.book.title}을(를) 반납하시겠습니까?`)) {
            returnBookMutation.mutate(rental.id);
          }
        }}
      />
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </>
  );
}
