import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getMonthlyPaymentData } from "../../services/dashboardService";
import "./PaymentChart.css";
const data = getMonthlyPaymentData();
function PaymentChart() {
  return (
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          barSize={35}
          barCategoryGap="25%"
          margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" interval={0} />
          <YAxis hide />
          <Tooltip />
          <Bar
            dataKey="payments"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            maxBarSize={45}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default PaymentChart;
