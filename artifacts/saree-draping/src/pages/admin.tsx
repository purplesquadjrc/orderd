import { useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Image,
  Tag,
  Bell,
  Search,
  TrendingUp,
  Users,
  IndianRupee,
  Star,
  ChevronRight,
  Upload,
  Pencil,
  Trash2,
  Check,
  X,
  Menu,
  Plus,
  ArrowUpRight,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Section = "dashboard" | "bookings" | "images" | "pricing";

const BOOKINGS = [
  { id: "B001", name: "Priya Sharma", phone: "+91 98765 43210", date: "2026-05-10", location: "Koramangala, Bangalore", service: "Bridal Package", status: "confirmed", amount: 1499 },
  { id: "B002", name: "Ananya Mehta", phone: "+91 91234 56789", date: "2026-05-11", location: "Banjara Hills, Hyderabad", service: "Premium Package", status: "pending", amount: 2499 },
  { id: "B003", name: "Kavya Reddy", phone: "+91 99887 76655", date: "2026-05-12", location: "Indiranagar, Bangalore", service: "Basic Package", status: "confirmed", amount: 499 },
  { id: "B004", name: "Deepa Nair", phone: "+91 80001 23456", date: "2026-05-08", location: "Jubilee Hills, Hyderabad", service: "Bridal Package", status: "completed", amount: 1499 },
  { id: "B005", name: "Riya Pillai", phone: "+91 77700 11223", date: "2026-05-09", location: "Whitefield, Bangalore", service: "Party Draping", status: "completed", amount: 799 },
  { id: "B006", name: "Sneha Kumar", phone: "+91 93456 78901", date: "2026-05-14", location: "HSR Layout, Bangalore", service: "Premium Package", status: "pending", amount: 2499 },
  { id: "B007", name: "Meera Joshi", phone: "+91 88990 12345", date: "2026-05-15", location: "Madhapur, Hyderabad", service: "Bridal Package", status: "confirmed", amount: 1499 },
];

const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1610189019599-f4e95e23f956?w=400&q=70", title: "Classic Nivi Drape", description: "Timeless Nivi style with elegant pleats." },
  { id: 2, url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=70", title: "Bengali Bridal Style", description: "Traditional Bengali drape." },
  { id: 3, url: "https://images.unsplash.com/photo-1617704548623-340376564e68?w=400&q=70", title: "Gujarati Seedha Pallu", description: "Vibrant festive style." },
  { id: 4, url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=70", title: "Lehenga Saree Drape", description: "Modern silhouette drape." },
  { id: 5, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=70", title: "Party Glam Look", description: "Sleek party draping style." },
  { id: 6, url: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=400&q=70", title: "Pre-Pleated Setup", description: "Ready-to-wear precision draping." },
];

const PRICING = [
  { id: 1, name: "Basic Package", price: 499, duration: "30 min", description: "Standard Nivi drape for casual occasions", features: ["Standard Nivi drape", "Neat pleating & pinning", "30-minute session", "Home service available"] },
  { id: 2, name: "Bridal Package", price: 1499, duration: "60 min", description: "Full bridal draping with pleating & pallu", features: ["Full bridal draping style", "Precision pleating & pallu styling", "Secured pinning for all-day hold", "60-minute session", "Dupatta arrangement"] },
  { id: 3, name: "Premium Package", price: 2499, duration: "90 min", description: "Head-to-toe luxury styling experience", features: ["Everything in Bridal Package", "Accessories arrangement", "Touch-up kit provided", "90-minute session", "Priority home/venue service"] },
];

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  completed: "bg-slate-100 text-slate-600 border border-slate-200",
};

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  completed: "Completed",
};

function Stat({ icon, label, value, change, color }: { icon: React.ReactNode; label: string; value: string; change: string; color: string }) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <ArrowUpRight className="w-3 h-3" />{change}
        </span>
      </div>
      <div>
        <p className="text-2xl font-serif font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function DashboardSection() {
  const recent = BOOKINGS.slice(0, 4);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={<CalendarCheck className="w-5 h-5 text-primary" />} label="Total Bookings" value="47" change="+12%" color="bg-primary/10" />
        <Stat icon={<IndianRupee className="w-5 h-5 text-emerald-600" />} label="Revenue (May)" value="₹68,450" change="+18%" color="bg-emerald-50" />
        <Stat icon={<Users className="w-5 h-5 text-violet-600" />} label="New Clients" value="23" change="+8%" color="bg-violet-50" />
        <Stat icon={<Star className="w-5 h-5 text-amber-500" />} label="Avg. Rating" value="4.9" change="+0.2" color="bg-amber-50" />
      </div>
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-serif font-semibold text-foreground">Recent Bookings</h2>
          <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View all</span>
        </div>
        <div className="divide-y divide-border/40">
          {recent.map((b) => (
            <div key={b.id} className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {b.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground hidden sm:block">{b.date}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[b.status]}`}>{STATUS_LABELS[b.status]}</span>
                <span className="text-sm font-semibold text-foreground">₹{b.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingsSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = BOOKINGS.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">{BOOKINGS.length} total appointments</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />New Booking
        </button>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex flex-wrap gap-3 items-center justify-between">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["all", "confirmed", "pending", "completed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Location</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">
                        {b.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{b.name}</p>
                        <p className="text-xs text-muted-foreground">{b.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />{b.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/80">{b.service}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />{b.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />{b.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[b.status]}`}>{STATUS_LABELS[b.status]}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-foreground">₹{b.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">No bookings found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImagesSection() {
  const [images, setImages] = useState(GALLERY_IMAGES);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Gallery Images</h1>
          <p className="text-muted-foreground text-sm mt-1">{images.length} images in gallery</p>
        </div>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/20"}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-7 h-7 text-primary" />
        </div>
        <p className="text-foreground font-medium mb-1">Drag & drop images here</p>
        <p className="text-muted-foreground text-sm mb-4">Supports JPG, PNG, WebP — up to 10MB each</p>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />Choose Files
        </button>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((img) => (
          <div key={img.id} className="bg-card border border-border/50 rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button className="w-9 h-9 rounded-full bg-white text-foreground flex items-center justify-center hover:bg-white/90 transition-colors shadow-sm">
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setImages((prev) => prev.filter((i) => i.id !== img.id))}
                  className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium text-foreground text-sm truncate">{img.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{img.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingSection() {
  const [packages, setPackages] = useState(PRICING);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<typeof PRICING[0] | null>(null);

  const startEdit = (pkg: typeof PRICING[0]) => {
    setEditing(pkg.id);
    setDraft({ ...pkg });
  };

  const saveEdit = () => {
    if (!draft) return;
    setPackages((prev) => prev.map((p) => (p.id === draft.id ? draft : p)));
    setEditing(null);
    setDraft(null);
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-foreground">Pricing Packages</h1>
        <p className="text-muted-foreground text-sm mt-1">Edit your service packages and pricing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="px-6 pt-6 pb-4 border-b border-border/40">
              {editing === pkg.id && draft ? (
                <div className="space-y-3">
                  <input
                    className="w-full text-lg font-serif font-semibold text-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm font-medium">₹</span>
                    <input
                      type="number"
                      className="w-full text-3xl font-serif font-bold text-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={draft.price}
                      onChange={(e) => setDraft({ ...draft, price: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <input
                    className="w-full text-sm text-muted-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={draft.duration}
                    onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                    placeholder="Duration"
                  />
                  <textarea
                    className="w-full text-sm text-muted-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    value={draft.description}
                    rows={2}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  />
                </div>
              ) : (
                <>
                  <p className="text-lg font-serif font-semibold text-foreground">{pkg.name}</p>
                  <p className="text-3xl font-serif font-bold text-foreground mt-1">₹{pkg.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{pkg.duration} session</p>
                  <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
                </>
              )}
            </div>

            <div className="px-6 py-4">
              <ul className="space-y-2 mb-5">
                {(editing === pkg.id && draft ? draft.features : pkg.features).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/75">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {editing === pkg.id && draft ? (
                      <input
                        className="flex-1 bg-muted/30 border border-border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                        value={f}
                        onChange={(e) => {
                          const updated = [...draft.features];
                          updated[i] = e.target.value;
                          setDraft({ ...draft, features: updated });
                        }}
                      />
                    ) : (
                      <span>{f}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                {editing === pkg.id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Check className="w-4 h-4" />Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center justify-center w-10 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(pkg)}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-border text-foreground/70 py-2 rounded-xl text-sm font-medium hover:bg-muted/40 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />Edit Package
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "bookings", label: "Bookings", icon: <CalendarCheck className="w-4 h-4" /> },
  { id: "images", label: "Images", icon: <Image className="w-4 h-4" /> },
  { id: "pricing", label: "Pricing", icon: <Tag className="w-4 h-4" /> },
];

export default function Admin() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (active) {
      case "dashboard": return <DashboardSection />;
      case "bookings": return <BookingsSection />;
      case "images": return <ImagesSection />;
      case "pricing": return <PricingSection />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-60 flex flex-col bg-foreground/[0.03] border-r border-border/50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="px-5 py-5 border-b border-border/50">
          <a href="/" className="block">
            <p className="text-lg font-serif font-bold text-foreground">Drape & Grace</p>
            <p className="text-xs text-muted-foreground mt-0.5">Admin Panel</p>
          </a>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === item.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.label}
              {active === item.id && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/40 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">DG</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Admin</p>
              <p className="text-xs text-muted-foreground truncate">drapeandgrace.in</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border/50 px-6 flex items-center justify-between gap-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted/40 text-foreground/70 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-muted/40 text-foreground/70 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
            </button>
            <a href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderSection()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
