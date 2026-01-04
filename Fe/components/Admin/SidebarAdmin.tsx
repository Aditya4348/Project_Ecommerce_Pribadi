import { PieChart, ShoppingBag, Package, Users, Settings, LogOut} from "lucide-react"

const SidebarAdmin = () => {
    return(
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <span className="font-bold text-slate-900 uppercase tracking-widest text-sm">Nexus Admin</span>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 bg-slate-900 text-white rounded-xl font-medium shadow-lg shadow-slate-200">
            <PieChart className="w-5 h-5" /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Package className="w-5 h-5" /> Products
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Users className="w-5 h-5" /> Customers
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
        <div className="p-6 border-t border-slate-100">
          <button 
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" /> Exit Admin
          </button>
        </div>
      </aside>
    )
}

export default SidebarAdmin;