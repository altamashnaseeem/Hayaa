import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { 
  FaShoppingBag, 
  FaBoxOpen, 
  FaMoneyBillWave, 
  FaChartLine 
} from 'react-icons/fa';

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    bestSellingProducts: [],
    recentOrders: [],
    monthlySales: []
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard stats
  const fetchStats = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      // Fetch products
      const productsResponse = await axios.get(`${backendUrl}/api/product/list`);
      const products = productsResponse.data.products || [];
      
      // Fetch orders
      const ordersResponse = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      const orders = ordersResponse.data.orders || [];
      
      // Calculate stats
      const totalProducts = products.length;
      const totalOrders = orders.length;
      
      // Calculate revenue (only from completed payments)
      const totalRevenue = orders
        .filter(order => order.payment)
        .reduce((sum, order) => sum + order.amount, 0);
      
      // Count pending and completed orders
      const pendingOrders = orders.filter(order => order.status !== 'Delivered').length;
      const completedOrders = orders.filter(order => order.status === 'Delivered').length;
      
      // Get best selling products
      const productSales = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          if (productSales[item.name]) {
            productSales[item.name] += item.quantity;
          } else {
            productSales[item.name] = item.quantity;
          }
        });
      });
      
      const bestSellingProducts = Object.entries(productSales)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
      
      // Get recent orders
      const recentOrders = [...orders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      
      // Calculate monthly sales for the last 6 months
      const monthlySales = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = month.toLocaleString('default', { month: 'short' });
        
        const monthRevenue = orders
          .filter(order => {
            const orderDate = new Date(order.date);
            return orderDate.getMonth() === month.getMonth() && 
                   orderDate.getFullYear() === month.getFullYear() &&
                   order.payment;
          })
          .reduce((sum, order) => sum + order.amount, 0);
        
        monthlySales.push({ month: monthName, revenue: monthRevenue });
      }
      
      setStats({
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders,
        bestSellingProducts,
        recentOrders,
        monthlySales
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch dashboard data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-2">
            <FaMoneyBillWave className="text-green-500 mr-2 text-xl" />
            <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
          </div>
          <p className="text-2xl font-bold text-gray-800">{currency}{stats.totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-2">
            <FaShoppingBag className="text-blue-500 mr-2 text-xl" />
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-2">
            <FaBoxOpen className="text-purple-500 mr-2 text-xl" />
            <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-orange-500 mr-2 text-xl" />
            <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</p>
        </div>
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Sales Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales</h2>
          <div className="h-64">
            <div className="flex items-end h-48 mt-4">
              {stats.monthlySales.map((item, index) => {
                const maxRevenue = Math.max(...stats.monthlySales.map(item => item.revenue));
                const height = maxRevenue ? (item.revenue / maxRevenue) * 100 : 0;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full max-w-md bg-blue-500 rounded-t-md mx-1"
                      style={{ height: `${height}%` }}
                    ></div>
                    <p className="text-xs mt-1 font-medium">{item.month}</p>
                    <p className="text-xs text-gray-500">{currency}{item.revenue.toFixed(0)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Best Selling Products */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Best Selling Products</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {stats.bestSellingProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 text-sm font-medium text-gray-800">{product.name}</td>
                  <td className="py-3 text-sm text-right text-gray-600">{product.quantity}</td>
                </tr>
              ))}
              {stats.bestSellingProducts.length === 0 && (
                <tr>
                  <td colSpan="2" className="py-3 text-sm text-center text-gray-500">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-sm text-gray-800">
                    {order.address.firstName + ' ' + order.address.lastName}
                  </td>
                  <td className="py-3 text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 text-sm text-right font-medium text-gray-800">
                    {currency}{order.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-3 text-sm text-center text-gray-500">No recent orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Order Status Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Status Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-600">Total</p>
            <p className="text-xl font-bold text-gray-800">{stats.totalOrders}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-blue-600">Pending</p>
            <p className="text-xl font-bold text-blue-800">{stats.pendingOrders}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-green-600">Delivered</p>
            <p className="text-xl font-bold text-green-800">{stats.completedOrders}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-yellow-600">Shipped</p>
            <p className="text-xl font-bold text-yellow-800">
              {stats.recentOrders.filter(order => order.status === 'Shipped').length}
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-purple-600">Processing</p>
            <p className="text-xl font-bold text-purple-800">
              {stats.recentOrders.filter(order => order.status === 'Packing').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for status badges
const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100 text-gray-800';
  
  switch (status) {
    case 'Delivered':
      bgColor = 'bg-green-100 text-green-800';
      break;
    case 'Shipped':
      bgColor = 'bg-blue-100 text-blue-800';
      break;
    case 'Out for delivery':
      bgColor = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Packing':
      bgColor = 'bg-orange-100 text-orange-800';
      break;
    case 'Order Placed':
      bgColor = 'bg-purple-100 text-purple-800';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`${bgColor} py-1 px-2 rounded-full text-xs font-medium`}>
      {status}
    </span>
  );
};

export default Dashboard;