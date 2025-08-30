import React, { useEffect, useState, useRef } from "react";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  const downloadPDF = async () => {
    const chartElement = chartRef.current;
    if (!chartElement) return;

    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // PDF width
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 10;

    pdf.text("Last 30 Days Expenses", 10, 10);
    pdf.addImage(imgData, "PNG", 10, position + 5, imgWidth, imgHeight);
    pdf.save("Last_30_Days_Expenses.pdf");
  };

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
        <button
          onClick={downloadPDF}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
      <div ref={chartRef}>
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};
export default Last30DaysExpenses;


