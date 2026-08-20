import React, { createContext, useContext, useMemo, useState } from "react";
import { platformDestination } from "../../lib/platform-destination";
import RequestAccessModal from "./RequestAccessModal";

const RequestAccessContext = createContext(null);

export function RequestAccessProvider({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({
      destination: platformDestination,
      openRequestAccess: () => setOpen(true),
    }),
    [],
  );

  return (
    <RequestAccessContext.Provider value={value}>
      {children}
      <RequestAccessModal open={open} onClose={() => setOpen(false)} />
    </RequestAccessContext.Provider>
  );
}
export function useRequestAccess() {
  const context = useContext(RequestAccessContext);

  if (!context) {
    throw new Error("useRequestAccess must be used inside RequestAccessProvider");
  }

  return context;
}

export function RequestAccessTrigger({ children, className = "", onClick, ...props }) {
  const { destination, openRequestAccess } = useRequestAccess();

  const handleClick = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) openRequestAccess();
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      data-platform-environment={destination.environment}
      data-access-mode={destination.accessMode}
      title={`${destination.statusLabel} · ${destination.hostLabel}`}
      {...props}
    >
      {children}
    </button>
  );
}
