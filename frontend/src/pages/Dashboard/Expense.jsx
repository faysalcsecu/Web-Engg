import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuWalletMinimal, LuHandCoins } from "react-icons/lu";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [year, setYear] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch Report Data (Income + Expense)
  const fetchReportData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.REPORT.GET_DATA); 
      if (response.data) {
        setReportData(response.data);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
      toast.error("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  // Filter Data by Year
  const filteredData =
    year === "all"
      ? reportData
      : reportData.filter((item) => new Date(item.date).getFullYear().toString() === year);

  // Calculate totals
  const totalIncome = filteredData
    .filter((item) => item.type === "income")
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalExpense = filteredData
    .filter((item) => item.type === "expense")
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const balance = totalIncome - totalExpense;

  // Download Excel
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORT.DOWNLOAD, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report.");
    }
  };

  return (
    <DashboardLayout activeMenu="Report">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Report</h1>

        {/* Year Selector */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-semibold">Select Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Time</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          <button
            onClick={handleDownloadReport}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Download Excel
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={`$${totalIncome}`}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={`$${totalExpense}`}
            color="bg-red-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Available Balance"
            value={`$${balance}`}
            color="bg-blue-500"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Report;
