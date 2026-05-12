const AnimatedDashboard = () => (
  <div className="relative w-full max-w-4xl mx-auto">
    <div className="absolute inset-0 bg-linear-to-br from-primary-500/20 to-secondary-800/20 blur-3xl rounded-3xl" />
    <div className="relative bg-white border border-secondary-200 rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-secondary-100 bg-secondary-100/30">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <div className="ml-3 flex-1 max-w-xs bg-secondary-100 rounded-md h-5 flex items-center px-2">
          <span className="text-[10px] text-secondary-400 font-medium">
            flowoff.vercel.app
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-6 bg-secondary-100/20">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Leave Balance", value: "18", color: "text-primary-500" },
            { label: "Pending", value: "3", color: "text-amber-500" },
            { label: "Approved", value: "12", color: "text-emerald-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-3 border border-secondary-200/60 shadow-sm"
            >
              <p className="text-[10px] text-secondary-400 font-medium">
                {stat.label}
              </p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-secondary-200/60 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 border-b border-secondary-100 flex items-center justify-between">
            <p className="text-xs font-semibold text-secondary-700">
              Recent Requests
            </p>
            <span className="text-[10px] text-primary-500 font-semibold">
              View all
            </span>
          </div>
          {[
            {
              name: "Sarah K.",
              type: "Annual Leave",
              days: "3d",
              status: "Approved",
              statusColor: "bg-emerald-100 text-emerald-700",
            },
            {
              name: "Mike R.",
              type: "Sick Leave",
              days: "1d",
              status: "Pending",
              statusColor: "bg-amber-100 text-amber-700",
            },
            {
              name: "Lisa T.",
              type: "WFH",
              days: "2d",
              status: "Approved",
              statusColor: "bg-emerald-100 text-emerald-700",
            },
          ].map((req, i) => (
            <div
              key={req.name}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-secondary-50 last:border-0 hero-row"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="h-7 w-7 rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0">
                <span className="text-white text-[9px] font-bold">
                  {req.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-secondary-700 truncate">
                  {req.name}
                </p>
                <p className="text-[10px] text-secondary-400">
                  {req.type} · {req.days}
                </p>
              </div>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${req.statusColor}`}
              >
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute -top-4 -right-4 sm:-right-8 bg-white border border-secondary-200 rounded-xl px-3 py-2 shadow-lg float-badge-1 hidden sm:block">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg
            className="h-3 w-3 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-secondary-400">Leave Approved</p>
          <p className="text-xs font-bold text-secondary-700">Just now</p>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-white border border-secondary-200 rounded-xl px-3 py-2 shadow-lg float-badge-2 hidden sm:block">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
          <svg
            className="h-3 w-3 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-secondary-400">Team online</p>
          <p className="text-xs font-bold text-secondary-700">24 members</p>
        </div>
      </div>
    </div>
  </div>
);

export default AnimatedDashboard;
