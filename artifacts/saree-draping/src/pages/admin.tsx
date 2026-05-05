import { useState, useEffect, useRef } from "react";
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
  FileText,
  Download,
  Printer,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  XCircle,
  Hourglass,
  MessageCircle,
  Mail,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Section = "dashboard" | "bookings" | "images" | "pricing" | "invoice";
type BookingStatus = "pending" | "accepted" | "cancelled";

interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  location: string;
  service: string;
  status: BookingStatus;
  amount: number;
}

const INITIAL_BOOKINGS: Booking[] = [
  { id: "B001", name: "Priya Sharma",  phone: "+91 98765 43210", date: "2026-05-10", location: "Koramangala, Bangalore",   service: "Bridal Package",  status: "accepted",  amount: 1499 },
  { id: "B002", name: "Ananya Mehta", phone: "+91 91234 56789", date: "2026-05-11", location: "Banjara Hills, Hyderabad", service: "Premium Package", status: "pending",   amount: 2499 },
  { id: "B003", name: "Kavya Reddy",  phone: "+91 99887 76655", date: "2026-05-12", location: "Indiranagar, Bangalore",   service: "Basic Package",   status: "accepted",  amount: 499  },
  { id: "B004", name: "Deepa Nair",   phone: "+91 80001 23456", date: "2026-05-08", location: "Jubilee Hills, Hyderabad", service: "Bridal Package",  status: "cancelled", amount: 1499 },
  { id: "B005", name: "Riya Pillai",  phone: "+91 77700 11223", date: "2026-05-09", location: "Whitefield, Bangalore",    service: "Party Draping",   status: "pending",   amount: 799  },
  { id: "B006", name: "Sneha Kumar",  phone: "+91 93456 78901", date: "2026-05-14", location: "HSR Layout, Bangalore",    service: "Premium Package", status: "pending",   amount: 2499 },
  { id: "B007", name: "Meera Joshi",  phone: "+91 88990 12345", date: "2026-05-15", location: "Madhapur, Hyderabad",     service: "Bridal Package",  status: "accepted",  amount: 1499 },
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
  { id: 1, name: "Basic Package",   price: 499,  duration: "30 min", description: "Standard Nivi drape for casual occasions",     features: ["Standard Nivi drape", "Neat pleating & pinning", "30-minute session", "Home service available"] },
  { id: 2, name: "Bridal Package",  price: 1499, duration: "60 min", description: "Full bridal draping with pleating & pallu",    features: ["Full bridal draping style", "Precision pleating & pallu styling", "Secured pinning for all-day hold", "60-minute session", "Dupatta arrangement"] },
  { id: 3, name: "Premium Package", price: 2499, duration: "90 min", description: "Head-to-toe luxury styling experience",        features: ["Everything in Bridal Package", "Accessories arrangement", "Touch-up kit provided", "90-minute session", "Priority home/venue service"] },
];

const STATUS_STYLES: Record<BookingStatus, string> = {
  accepted:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending:   "bg-amber-50 text-amber-700 border border-amber-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  accepted:  "Accepted",
  pending:   "Pending",
  cancelled: "Cancelled",
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

function DashboardSection({ bookings }: { bookings: Booking[] }) {
  const recent = bookings.slice(0, 4);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={<CalendarCheck className="w-5 h-5 text-primary" />}   label="Total Bookings" value={String(bookings.length)}                                                              change="+12%" color="bg-primary/10" />
        <Stat icon={<IndianRupee className="w-5 h-5 text-emerald-600" />} label="Revenue (May)"  value={`₹${bookings.filter(b => b.status === "accepted").reduce((s,b) => s+b.amount,0).toLocaleString("en-IN")}`} change="+18%" color="bg-emerald-50" />
        <Stat icon={<Users className="w-5 h-5 text-violet-600" />}        label="New Clients"    value="23"                                                                                   change="+8%"  color="bg-violet-50" />
        <Stat icon={<Star className="w-5 h-5 text-amber-500" />}          label="Avg. Rating"    value="4.9"                                                                                  change="+0.2" color="bg-amber-50" />
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

const TABS: { key: BookingStatus; label: string; icon: React.ReactNode }[] = [
  { key: "pending",   label: "Pending",   icon: <Hourglass    className="w-3.5 h-3.5" /> },
  { key: "accepted",  label: "Accepted",  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  { key: "cancelled", label: "Cancelled", icon: <XCircle      className="w-3.5 h-3.5" /> },
];

const TAB_ACTIVE: Record<BookingStatus, string> = {
  pending:   "border-amber-400 text-amber-700 bg-amber-50",
  accepted:  "border-emerald-500 text-emerald-700 bg-emerald-50",
  cancelled: "border-red-400 text-red-600 bg-red-50",
};

const TAB_COUNT_BG: Record<BookingStatus, string> = {
  pending:   "bg-amber-100 text-amber-700",
  accepted:  "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

interface NotificationData {
  booking: Booking;
  action: "accepted" | "cancelled";
}

function buildWhatsAppUrl(phone: string, name: string, service: string, date: string, action: "accepted" | "cancelled") {
  const digits = phone.replace(/\D/g, "");
  const waNumber = digits.startsWith("91") ? digits : `91${digits}`;
  const msg =
    action === "accepted"
      ? `Hi ${name}! 🌸 Your booking for *${service}* on *${date}* has been *accepted* by Drape & Grace. We look forward to serving you! For any queries, feel free to reach us here.`
      : `Hi ${name}, we regret to inform you that your booking for *${service}* on *${date}* has been *cancelled*. We apologise for the inconvenience. Please reach out to reschedule at your convenience. — Drape & Grace`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
}

function buildMailtoUrl(name: string, service: string, date: string, action: "accepted" | "cancelled") {
  const subject =
    action === "accepted"
      ? `Booking Confirmed — ${service} on ${date}`
      : `Booking Cancellation — ${service} on ${date}`;
  const body =
    action === "accepted"
      ? `Dear ${name},\n\nWe are delighted to confirm your booking!\n\nService: ${service}\nDate: ${date}\n\nOur team will arrive at your location on time. Please feel free to reach out if you have any special requests.\n\nWarm regards,\nDrape & Grace\ndrapeandgrace.in`
      : `Dear ${name},\n\nWe regret to inform you that your booking for ${service} on ${date} has been cancelled.\n\nWe apologise for any inconvenience caused. Please contact us to reschedule at a convenient time.\n\nWarm regards,\nDrape & Grace\ndrapeandgrace.in`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function BookingNotificationToast({
  data,
  onDismiss,
}: {
  data: NotificationData;
  onDismiss: () => void;
}) {
  const { booking, action } = data;
  const isAccepted = action === "accepted";
  const AUTO_DISMISS_MS = 9000;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [onDismiss]);

  const waUrl    = buildWhatsAppUrl(booking.phone, booking.name, booking.service, booking.date, action);
  const emailUrl = buildMailtoUrl(booking.name, booking.service, booking.date, action);
  const message  = isAccepted ? "Your booking has been accepted" : "Your booking has been cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.94 }}
      animate={{ opacity: 1, x: 0,  scale: 1 }}
      exit={{    opacity: 0, x: 80, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
    >
      <div className={`relative rounded-2xl shadow-2xl overflow-hidden border ${
        isAccepted
          ? "bg-white border-emerald-200"
          : "bg-white border-red-200"
      }`}>
        {/* Top colour bar */}
        <div className={`h-1 w-full ${isAccepted ? "bg-emerald-500" : "bg-red-500"}`}>
          {/* Shrinking progress */}
          <motion.div
            className={`h-full ${isAccepted ? "bg-emerald-300" : "bg-red-300"} origin-right`}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
          />
        </div>

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isAccepted ? "bg-emerald-50" : "bg-red-50"
              }`}>
                {isAccepted
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  : <XCircle      className="w-5 h-5 text-red-500" />}
              </div>
              <div>
                <p className={`text-sm font-semibold ${isAccepted ? "text-emerald-700" : "text-red-600"}`}>
                  {message}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Notify <span className="font-medium text-foreground">{booking.name}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onDismiss}
              className="p-1 rounded-lg hover:bg-muted/50 text-muted-foreground transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Booking detail pill */}
          <div className="bg-muted/40 rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-foreground">{booking.service}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {booking.date} &nbsp;·&nbsp;
                <Phone className="w-3 h-3" /> {booking.phone}
              </p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isAccepted ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            }`}>
              {booking.id}
            </span>
          </div>

          {/* Action label */}
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
            <Send className="w-3 h-3" />
            Send notification to client via:
          </p>

          {/* CTA buttons */}
          <div className="flex gap-2.5">
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.a>
            <motion.a
              href={emailUrl}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground/80 border border-border text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BookingsSection({
  bookings,
  onStatusChange,
}: {
  bookings: Booking[];
  onStatusChange: (id: string, status: BookingStatus) => void;
}) {
  const [activeTab, setActiveTab] = useState<BookingStatus>("pending");
  const [search, setSearch] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{ id: string; action: BookingStatus } | null>(null);
  const [notification, setNotification] = useState<NotificationData | null>(null);

  const tabBookings = bookings.filter(
    (b) =>
      b.status === activeTab &&
      (b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.service.toLowerCase().includes(search.toLowerCase()))
  );

  const counts: Record<BookingStatus, number> = {
    pending:   bookings.filter((b) => b.status === "pending").length,
    accepted:  bookings.filter((b) => b.status === "accepted").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const handleAction = (id: string, action: BookingStatus) => {
    setConfirmDialog({ id, action });
  };

  const confirmAction = () => {
    if (!confirmDialog) return;
    const booking = bookings.find((b) => b.id === confirmDialog.id);
    onStatusChange(confirmDialog.id, confirmDialog.action);
    setConfirmDialog(null);
    if (booking && (confirmDialog.action === "accepted" || confirmDialog.action === "cancelled")) {
      setNotification({ booking, action: confirmDialog.action });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">{bookings.length} total appointments</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />New Booking
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/50 pb-0 -mb-px overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.key
                ? `${TAB_ACTIVE[tab.key]} border-b-2`
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            {tab.icon}
            {tab.label}
            <span
              className={`ml-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                activeTab === tab.key ? TAB_COUNT_BG[tab.key] : "bg-muted text-muted-foreground"
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
        {/* Search */}
        <div className="px-6 py-4 border-b border-border/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
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
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                {activeTab === "pending" && (
                  <th className="text-center px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                )}
                {activeTab !== "pending" && (
                  <th className="text-center px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <AnimatePresence mode="popLayout">
                {tabBookings.map((b) => (
                  <motion.tr
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="hover:bg-muted/20 transition-colors group"
                  >
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
                    <td className="px-6 py-4 text-right font-semibold text-foreground">
                      ₹{b.amount.toLocaleString("en-IN")}
                    </td>

                    {/* Actions column — Pending tab */}
                    {activeTab === "pending" && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleAction(b.id, "accepted")}
                            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Accept
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleAction(b.id, "cancelled")}
                            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            Cancel
                          </motion.button>
                        </div>
                      </td>
                    )}

                    {/* Status badge — Accepted / Cancelled tabs */}
                    {activeTab !== "pending" && (
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[b.status]}`}>
                          {b.status === "accepted"  && <CheckCircle2 className="w-3 h-3" />}
                          {b.status === "cancelled" && <XCircle      className="w-3 h-3" />}
                          {STATUS_LABELS[b.status]}
                        </span>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {tabBookings.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                {activeTab === "pending"   && <Hourglass    className="w-5 h-5 text-muted-foreground" />}
                {activeTab === "accepted"  && <CheckCircle2 className="w-5 h-5 text-muted-foreground" />}
                {activeTab === "cancelled" && <XCircle      className="w-5 h-5 text-muted-foreground" />}
              </div>
              <p className="text-sm text-muted-foreground">No {activeTab} bookings found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm dialog */}
      <AnimatePresence>
        {confirmDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40"
              onClick={() => setConfirmDialog(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 pointer-events-auto">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  confirmDialog.action === "accepted" ? "bg-emerald-50" : "bg-red-50"
                }`}>
                  {confirmDialog.action === "accepted"
                    ? <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    : <XCircle      className="w-7 h-7 text-red-500" />}
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground text-center mb-1">
                  {confirmDialog.action === "accepted" ? "Accept Booking?" : "Cancel Booking?"}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {confirmDialog.action === "accepted"
                    ? "This booking will be moved to Accepted. The client will be notified."
                    : "This booking will be marked as Cancelled. This action can't be undone easily."}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDialog(null)}
                    className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground/70 hover:bg-muted/40 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={confirmAction}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
                      confirmDialog.action === "accepted"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {confirmDialog.action === "accepted" ? "Yes, Accept" : "Yes, Cancel"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notification toast */}
      <AnimatePresence>
        {notification && (
          <BookingNotificationToast
            data={notification}
            onDismiss={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
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

  const startEdit = (pkg: typeof PRICING[0]) => { setEditing(pkg.id); setDraft({ ...pkg }); };
  const saveEdit  = () => {
    if (!draft) return;
    setPackages((prev) => prev.map((p) => (p.id === draft.id ? draft : p)));
    setEditing(null); setDraft(null);
  };
  const cancelEdit = () => { setEditing(null); setDraft(null); };

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
                  <input className="w-full text-lg font-serif font-semibold text-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm font-medium">₹</span>
                    <input type="number" className="w-full text-3xl font-serif font-bold text-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" value={draft.price} onChange={(e) => setDraft({ ...draft, price: parseInt(e.target.value) || 0 })} />
                  </div>
                  <input className="w-full text-sm text-muted-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: e.target.value })} placeholder="Duration" />
                  <textarea className="w-full text-sm text-muted-foreground bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" value={draft.description} rows={2} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
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
                      <input className="flex-1 bg-muted/30 border border-border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30" value={f} onChange={(e) => { const u = [...draft.features]; u[i] = e.target.value; setDraft({ ...draft, features: u }); }} />
                    ) : <span>{f}</span>}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                {editing === pkg.id ? (
                  <>
                    <button onClick={saveEdit} className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"><Check className="w-4 h-4" />Save</button>
                    <button onClick={cancelEdit} className="flex items-center justify-center w-10 bg-muted rounded-xl hover:bg-muted/80 transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>
                  </>
                ) : (
                  <button onClick={() => startEdit(pkg)} className="flex-1 flex items-center justify-center gap-1.5 border border-border text-foreground/70 py-2 rounded-xl text-sm font-medium hover:bg-muted/40 transition-colors"><Pencil className="w-4 h-4" />Edit Package</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const GST_RATE = 0.18;

function InvoiceSection({ bookings }: { bookings: Booking[] }) {
  const [selectedId, setSelectedId] = useState(bookings[0].id);
  const [open, setOpen] = useState(false);
  const booking = bookings.find((b) => b.id === selectedId) ?? bookings[0];
  const invoiceNo = `INV-2026-${booking.id}`;
  const issueDate = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const gst = Math.round(booking.amount * GST_RATE);
  const total = booking.amount + gst;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Invoice Preview</h1>
          <p className="text-muted-foreground text-sm mt-1">Select a booking to generate its invoice.</p>
        </div>
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 border border-border bg-card px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted/30 transition-colors min-w-[220px] justify-between">
            <span>{booking.id} — {booking.name}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="absolute right-0 top-full mt-1.5 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden w-full min-w-[240px]">
                {bookings.map((b) => (
                  <button key={b.id} onClick={() => { setSelectedId(b.id); setOpen(false); }} className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-muted/40 transition-colors text-left ${b.id === selectedId ? "text-primary font-medium" : "text-foreground/80"}`}>
                    <span>{b.id} — {b.name}</span>
                    {b.id === selectedId && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button onClick={() => window.print()} className="flex items-center gap-2 border border-border bg-card px-5 py-2.5 rounded-xl text-sm font-medium text-foreground/80 hover:bg-muted/30 hover:text-foreground transition-all duration-200">
          <Printer className="w-4 h-4" />Print
        </button>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Download className="w-4 h-4" />Download PDF
        </button>
      </div>

      <motion.div key={booking.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="bg-white border border-border/60 rounded-2xl shadow-sm overflow-hidden max-w-3xl mx-auto" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div className="px-10 py-8 flex items-start justify-between gap-6" style={{ background: "hsl(20, 40%, 97%)" }}>
          <div>
            <p className="text-2xl font-serif font-bold" style={{ color: "hsl(20, 40%, 15%)" }}>Drape & Grace</p>
            <p className="text-sm mt-1" style={{ color: "hsl(20, 20%, 50%)" }}>Professional Saree Draping Services</p>
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "hsl(20, 20%, 50%)" }}>Koramangala, Bangalore — 560034<br />+91 98765 43210 · drapeandgrace.in</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "hsl(28, 60%, 65%)" }}>Invoice</p>
            <p className="text-2xl font-bold" style={{ color: "hsl(20, 40%, 15%)" }}>{invoiceNo}</p>
            <div className="mt-3 space-y-1 text-xs" style={{ color: "hsl(20, 20%, 50%)" }}>
              <p><span className="font-medium" style={{ color: "hsl(20, 40%, 25%)" }}>Issue Date:</span> {issueDate}</p>
              <p><span className="font-medium" style={{ color: "hsl(20, 40%, 25%)" }}>Due Date:</span> {booking.date}</p>
            </div>
          </div>
        </div>

        <div className="px-10 py-3 border-y flex items-center justify-between" style={{ borderColor: "hsl(20, 30%, 90%)", background: "white" }}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(20, 20%, 60%)" }}>Bill To</p>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_STYLES[booking.status]}`}>
            {STATUS_LABELS[booking.status]}
          </span>
        </div>

        <div className="px-10 py-6 grid grid-cols-2 gap-6 border-b" style={{ borderColor: "hsl(20, 30%, 92%)" }}>
          <div>
            <p className="text-base font-semibold" style={{ color: "hsl(20, 40%, 15%)" }}>{booking.name}</p>
            <p className="text-sm mt-1" style={{ color: "hsl(20, 20%, 50%)" }}>{booking.phone}</p>
            <p className="text-sm mt-0.5 flex items-center gap-1" style={{ color: "hsl(20, 20%, 50%)" }}><MapPin style={{ width: 12, height: 12 }} />{booking.location}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "hsl(20, 20%, 60%)" }}>Booking Reference</p>
            <p className="text-sm font-semibold" style={{ color: "hsl(20, 40%, 20%)" }}>{booking.id}</p>
            <p className="text-xs mt-2" style={{ color: "hsl(20, 20%, 55%)" }}>Session Date: <span className="font-medium">{booking.date}</span></p>
          </div>
        </div>

        <div className="px-10 py-6">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid hsl(20, 30%, 90%)" }}>
                <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(20, 20%, 55%)" }}>Description</th>
                <th className="text-center pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(20, 20%, 55%)" }}>Qty</th>
                <th className="text-right pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(20, 20%, 55%)" }}>Rate</th>
                <th className="text-right pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(20, 20%, 55%)" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid hsl(20, 30%, 94%)" }}>
                <td className="py-4" style={{ color: "hsl(20, 40%, 15%)" }}>
                  <p className="font-medium">{booking.service}</p>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(20, 20%, 55%)" }}>Professional saree draping at your location</p>
                </td>
                <td className="py-4 text-center" style={{ color: "hsl(20, 40%, 30%)" }}>1</td>
                <td className="py-4 text-right" style={{ color: "hsl(20, 40%, 30%)" }}>₹{booking.amount.toLocaleString("en-IN")}</td>
                <td className="py-4 text-right font-medium" style={{ color: "hsl(20, 40%, 15%)" }}>₹{booking.amount.toLocaleString("en-IN")}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid hsl(20, 30%, 94%)" }}>
                <td className="py-3" style={{ color: "hsl(20, 20%, 55%)" }}>Home Visit & Travel</td>
                <td className="py-3 text-center" style={{ color: "hsl(20, 20%, 55%)" }}>1</td>
                <td className="py-3 text-right" style={{ color: "hsl(20, 20%, 55%)" }}>₹0</td>
                <td className="py-3 text-right" style={{ color: "hsl(20, 20%, 55%)" }}>Included</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 ml-auto w-72 space-y-2.5">
            <div className="flex justify-between text-sm" style={{ color: "hsl(20, 20%, 50%)" }}><span>Subtotal</span><span>₹{booking.amount.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-sm" style={{ color: "hsl(20, 20%, 50%)" }}><span>GST (18%)</span><span>₹{gst.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-sm" style={{ color: "hsl(20, 20%, 50%)" }}><span>Discount</span><span style={{ color: "hsl(142, 71%, 40%)" }}>— ₹0</span></div>
            <div className="flex justify-between items-center pt-3 mt-1" style={{ borderTop: "2px solid hsl(20, 30%, 88%)" }}>
              <span className="font-bold text-base" style={{ color: "hsl(20, 40%, 15%)" }}>Total Due</span>
              <span className="font-bold text-xl" style={{ color: "hsl(28, 60%, 55%)" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <div className="px-10 pb-8 grid grid-cols-2 gap-8 border-t pt-6" style={{ borderColor: "hsl(20, 30%, 90%)" }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "hsl(20, 20%, 55%)" }}>Payment Methods</p>
            <div className="space-y-1.5 text-sm" style={{ color: "hsl(20, 40%, 30%)" }}>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0"></span>UPI: drapeandgrace@upi</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0"></span>Bank Transfer (details on request)</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0"></span>Cash accepted at time of service</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "hsl(20, 20%, 55%)" }}>Notes</p>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(20, 20%, 55%)" }}>Payment is due on or before the date of service. Cancellations made less than 24 hours in advance may attract a ₹200 cancellation fee. Thank you for choosing Drape & Grace!</p>
          </div>
        </div>

        <div className="px-10 py-4 text-center" style={{ background: "hsl(20, 40%, 97%)" }}>
          <p className="text-xs flex items-center justify-center gap-1.5" style={{ color: "hsl(20, 20%, 60%)" }}>
            <Sparkles style={{ width: 12, height: 12, color: "hsl(28, 60%, 65%)" }} />
            Thank you for trusting Drape & Grace with your special occasion.
            <Sparkles style={{ width: 12, height: 12, color: "hsl(28, 60%, 65%)" }} />
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "bookings",  label: "Bookings",  icon: <CalendarCheck  className="w-4 h-4" /> },
  { id: "images",    label: "Images",    icon: <Image          className="w-4 h-4" /> },
  { id: "pricing",   label: "Pricing",   icon: <Tag            className="w-4 h-4" /> },
  { id: "invoice",   label: "Invoice",   icon: <FileText       className="w-4 h-4" /> },
];

export default function Admin() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const handleStatusChange = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  const renderSection = () => {
    switch (active) {
      case "dashboard": return <DashboardSection bookings={bookings} />;
      case "bookings":  return <BookingsSection bookings={bookings} onStatusChange={handleStatusChange} />;
      case "images":    return <ImagesSection />;
      case "pricing":   return <PricingSection />;
      case "invoice":   return <InvoiceSection bookings={bookings} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-60 flex flex-col bg-foreground/[0.03] border-r border-border/50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
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
              {item.id === "bookings" && pendingCount > 0 && (
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${active === "bookings" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"}`}>
                  {pendingCount}
                </span>
              )}
              {active === item.id && item.id !== "bookings" && <ChevronRight className="w-3 h-3 ml-auto" />}
              {active === item.id && item.id === "bookings" && pendingCount === 0 && <ChevronRight className="w-3 h-3 ml-auto" />}
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border/50 px-6 flex items-center justify-between gap-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg hover:bg-muted/40 text-foreground/70 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-muted/40 text-foreground/70 transition-colors">
              <Bell className="w-5 h-5" />
              {pendingCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>}
            </button>
            <a href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </a>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>
            {renderSection()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
