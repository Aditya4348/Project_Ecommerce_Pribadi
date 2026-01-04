
import React from 'react';
// Added Link from react-router-dom
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
// Added PieChart and Settings to lucide-react imports below
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  CheckCircle,
  Clock,
  LogOut,
  Download,
  PieChart,
  Settings
} from 'lucide-react';
import { SALES_CHART_DATA } from '../../constants';
import { QueryClient } from '@tanstack/react-query';

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {

  const stats = [
    { label: 'Total Revenue', value: '$124,592.00', trend: '+12.5%', isUp: true, icon: DollarSign },
    { label: 'Total Orders', value: '1,240', trend: '+5.2%', isUp: true, icon: ShoppingBag },
    { label: 'Avg. Order Value', value: '$100.48', trend: '-2.4%', isUp: false, icon: TrendingUp },
    { label: 'New Customers', value: '482', trend: '+18.1%', isUp: true, icon: Users },
  ];

  return (
    <>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
            <p className="text-slate-500 mt-1">Last sync: {new Date().toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Export Data
            </button>
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-900">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.trend} {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Sales Performance</h3>
              <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-xs font-bold focus:ring-0">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Year to Date</option>
              </select>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'}}
                    cursor={{stroke: '#10b981', strokeWidth: 2}}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { label: 'New Order #9421', desc: 'Aether 1 Premium Watch', time: '2m ago', icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Stock Low: Nexus Phone', desc: 'SKU: NX-ELC-101', time: '15m ago', icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Payout Successful', desc: 'Transfer to Main Bank', time: '1h ago', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'System Update', desc: 'Version 2.4.0 deployed', time: '4h ago', icon: Clock, color: 'text-slate-500', bg: 'bg-slate-50' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{item.label}</p>
                    <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">{item.time}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
              View All Logs
            </button>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-bold">Latest Transactions</h3>
            {/* Link is used here */}
            <Link to="/admin/orders" className="text-sm font-bold text-emerald-600 hover:underline">View All Orders</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50/50">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: '#NX-9821', user: 'Alex Morgan', item: 'Aether 1 Premium Watch', total: '$1,299.99', status: 'Delivered' },
                  { id: '#NX-9820', user: 'Sarah Jenkins', item: 'Horizon Headphones', total: '$349.99', status: 'Processing' },
                  { id: '#NX-9819', user: 'Mark Thompson', item: 'Terra Office Chair', total: '$599.00', status: 'Shipped' },
                  { id: '#NX-9818', user: 'Emma Wilson', item: 'Vanguard Backpack', total: '$149.50', status: 'Delivered' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4 font-bold text-slate-900">{row.id}</td>
                    <td className="px-8 py-4 text-sm text-slate-600">{row.user}</td>
                    <td className="px-8 py-4 text-sm text-slate-600">{row.item}</td>
                    <td className="px-8 py-4 font-bold text-slate-900">{row.total}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        row.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                        row.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
};

export default AdminDashboard;
