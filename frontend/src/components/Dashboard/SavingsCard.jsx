import React from "react";
import { FaPiggyBank } from "react-icons/fa";
import { addThousandsSeparator } from "../../utils/helper";

const SavingsCard = ({ totalIncome, totalExpense }) => {
  const savings = totalIncome - totalExpense;
  const isNegative = savings < 0;

  return (
   
  );
};

export default SavingsCard;
