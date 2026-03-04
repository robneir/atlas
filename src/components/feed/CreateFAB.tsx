"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CreateMenu } from "./CreateMenu";

export function CreateFAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden fixed z-50" style={{ bottom: 24, right: 16 }}>
      {/* Menu positioned above the FAB */}
      <div style={{ position: "relative" }}>
        <CreateMenu open={open} onClose={() => setOpen(false)} />
      </div>

      <button
        type="button"
        aria-label="Create new post"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "var(--atlas-accent)",
          color: "#ffffff",
          border: "none",
          boxShadow: "var(--atlas-shadow-lg)",
        }}
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
