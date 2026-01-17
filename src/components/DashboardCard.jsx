import React from "react";

export default function DashboardCard({ title, value, children, footer, className = "" }) {
  const hasHeader = title || (value !== undefined && value !== null);

  return (
    <div className={`bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-lg transition ${className}`}>
      {hasHeader ? (
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {title && <h3 className="text-sm text-white/80 font-semibold">{title}</h3>}
            {value !== undefined && value !== null && (
              <div className="mt-2 text-2xl font-extrabold text-white">{value}</div>
            )}
          </div>
          {children}
        </div>
      ) : (
        <div className="w-full">{children}</div>
      )}

      {footer && <div className="mt-4 border-t border-white/5 pt-4 text-sm text-white/70">{footer}</div>}
    </div>
  );
}
