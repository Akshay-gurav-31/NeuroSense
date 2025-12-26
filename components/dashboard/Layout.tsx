import { LayoutDashboard, Users, FileText, Brain, Settings, Bell, Mail, User, ChevronDown } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Patients', active: false },
    { icon: FileText, label: 'Reports', active: false },
    { icon: Brain, label: 'AI Insights', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside 
      className="w-44 min-h-screen flex flex-col sidebar-glow" 
      style={{ 
        background: 'linear-gradient(180deg, hsl(222 48% 10%) 0%, hsl(222 50% 7%) 100%)',
        borderRight: '1px solid hsl(220 60% 20% / 0.5)'
      }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, hsl(199 89% 48%) 0%, hsl(217 91% 60%) 100%)',
              boxShadow: '0 0 15px hsl(199 89% 48% / 0.5), 0 0 30px hsl(199 89% 48% / 0.3)'
            }}
          >
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-foreground text-sm tracking-wide glow-text">NEUROSENSE</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${item.active ? 'sidebar-item-active' : ''}`}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

const Header = () => {
  return (
    <header 
      className="h-14 flex items-center justify-between px-6 header-glow" 
      style={{ 
        background: 'linear-gradient(90deg, hsl(222 48% 10%) 0%, hsl(222 50% 8%) 100%)',
        borderBottom: '1px solid hsl(220 60% 20% / 0.5)'
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">|</span>
        <span className="text-foreground font-medium">Doctor Dashboard</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="text-sm">Alerts</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Mail className="w-4 h-4" />
          <span className="text-sm">Messages</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <User className="w-4 h-4" />
          <span className="text-sm">Profile</span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-border/50">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, hsl(199 89% 48%) 0%, hsl(217 91% 60%) 100%)',
              boxShadow: '0 0 12px hsl(199 89% 48% / 0.4)'
            }}
          >
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-foreground text-sm">Dr. Smith</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export { Sidebar, Header };
