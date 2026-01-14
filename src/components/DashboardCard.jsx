import React from "react";

export default function DashboardCard({ title, value, children, footer, className = "" }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg transition ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm text-white/80 font-semibold">{title}</h3>
          {value && <div className="mt-2 text-2xl font-extrabold text-white">{value}</div>}
        </div>
        {children}
      </div>

      {footer && <div className="mt-4 border-t border-white/5 pt-4 text-sm text-white/70">{footer}</div>}
    </div>
  );
}
