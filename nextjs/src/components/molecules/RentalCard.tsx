import React from "react";
import { Card } from "../atoms/Card";
import { Button } from "../atoms/Button";

interface RentalCardProps {
  title: string;
  rentalDate: string;
  onReturn?: () => void;
}

export const RentalCard = ({
  title,
  rentalDate,
  onReturn,
}: RentalCardProps) => {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
        <p className="text-sm text-gray-500">
          대여일: {new Date(rentalDate).toLocaleDateString()}
        </p>
      </div>
      {onReturn && (
        <Button variant="danger" fullWidth onClick={onReturn}>
          반납하기
        </Button>
      )}
    </Card>
  );
};
