import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Report = () => {
  useUserAuth();

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All");

  // Years dropdown
  const years = ["All", "2025", "2024", "2023"];

  // Fetch Report Data
  const fetchReportData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.REPORT.GET_REPORT}?year=${selectedYear}`
      );

      if (response.data) {
        setReportData(response.data);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [selectedYear]);

  return (
    <DashboardLayout activeMenu="Report">
      <div className="my-5 mx-auto">
        {/* Year Filter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Financial Report</h2>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year === "All" ? "All Time" : year}
              </option>
            ))}
          </select>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(reportData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(reportData?.totalExpense || 0)}
            color="bg-red-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Available Balance"
            value={addThousandsSeparator(reportData?.availableBalance || 0)}
            color="bg-primary"
          />
        </div>

        {/* Chart Section */}
        <div className="card mt-6">
          <h5 className="text-lg mb-4">Month-wise Income & Expense</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={reportData?.monthlyData || []}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#22c55e" />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6">
          <RecentTransactions
            transactions={reportData?.recentTransactions || []}
            onSeeMore={() => {}}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Report;
