
import { FaPiggyBank } from "react-icons/fa";
import { addThousandsSeparator } from "../../utils/helper";

const SavingsCard = ({ totalIncome, totalExpense }) => {
  const savings = totalIncome - totalExpense;
  const isNegative = savings < 0;

  return (
    <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm">
      {/* Icon */}
      <div
        className={`flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-full ${
          isNegative ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        <FaPiggyBank className="text-xl" />
      </div>

      {/* Text */}
      <div className="ml-4 flex flex-col">
        <span className="text-gray-500 text-sm font-medium">Savings</span>
        <span
          className={`text-xl font-bold ${
            isNegative ? "text-red-500" : "text-lime-500"
          }`}
        >
          ${addThousandsSeparator(savings)}
        </span>

        {/* Messages */}
        {isNegative && (
          <div className="mt-2 text-xs text-red-600 bg-red-100 border border-red-300 px-3 py-1 rounded-lg">
           ⚠️ Oops! Your savings balance has dropped below zero.
          </div>
        )}
        {!isNegative && savings > 0 && (
          <div className="mt-2 text-xs text-green-600 bg-green-100 border border-green-300 px-3 py-1 rounded-lg">
           🎉 Awesome! Your savings are growing.
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsCard;
