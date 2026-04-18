import { useState } from "react";
import { createContact } from "../services/contactService";

export default function AddContact({ refresh }: { refresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    isFavorite: false,
    isPinned: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    setSubmitting(true);
    await createContact(form);
    setForm({ name: "", email: "", phone: "", isFavorite: false, isPinned: false });
    setSubmitting(false);
    setOpen(false);
    refresh();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .add-panel {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, transform 0.35s ease;
          transform: translateY(-8px);
        }
        .add-panel.open {
          max-height: 500px;
          opacity: 1;
          transform: translateY(0);
        }

        .sakura-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #f0c8d4;
          border-radius: 12px;
          background: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #2e1020;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .sakura-input::placeholder { color: #d4a0b4; font-weight: 300; }
        .sakura-input:focus {
          border-color: #e8849a;
          box-shadow: 0 0 0 3px rgba(232,132,154,0.15);
          background: #fff;
        }

        .toggle-btn {
          width: 100%;
          padding: 13px;
          border-radius: 14px;
          border: 1.5px dashed #f0b8c8;
          background: rgba(255,240,245,0.6);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #c0607a;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, border-color 0.2s;
          letter-spacing: 0.02em;
        }
        .toggle-btn:hover { background: rgba(255,220,230,0.7); border-color: #e890a4; }

        .submit-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #f08098 0%, #e06080 50%, #d04868 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.04em;
          box-shadow: 0 6px 20px rgba(220,80,100,0.3);
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(220,80,100,0.38);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .checkbox-row { display: flex; gap: 16px; }
        .check-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px;
          color: #905070;
          font-weight: 400;
          user-select: none;
        }
        .check-label input[type="checkbox"] { display: none; }
        .custom-check {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 1.5px solid #f0b8c8;
          background: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: background 0.18s, border-color 0.18s;
          flex-shrink: 0;
        }
        .custom-check.checked { background: #f08098; border-color: #e06080; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.7s linear infinite; display: inline-block; }
      `}</style>

      {/* Toggle button */}
      <button className="toggle-btn" onClick={() => setOpen((v) => !v)}>
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            fontSize: 18,
          }}
        >
          🌸
        </span>
        {open ? "Close" : "Add New Contact"}
      </button>

      {/* Expandable panel */}
      <div className={`add-panel${open ? " open" : ""}`}>
        <div
          style={{
            marginTop: 12,
            padding: "22px 20px",
            background: "rgba(255,245,248,0.85)",
            backdropFilter: "blur(10px)",
            border: "1.5px solid rgba(240,190,210,0.5)",
            borderRadius: 18,
            boxShadow: "0 8px 32px rgba(220,120,150,0.1)",
          }}
        >
          {/* Panel header */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 19,
              fontWeight: 600,
              color: "#3a1a24",
              marginBottom: 16,
              letterSpacing: "-0.01em",
            }}
          >
            🌷 New Blossom
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name *"
              className="sakura-input"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="sakura-input"
              type="email"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="sakura-input"
              type="tel"
            />

            {/* Checkboxes */}
            <div className="checkbox-row">
              <label className="check-label">
                <input
                  type="checkbox"
                  name="isFavorite"
                  checked={form.isFavorite}
                  onChange={handleChange}
                />
                <span className={`custom-check${form.isFavorite ? " checked" : ""}`}>
                  {form.isFavorite ? "⭐" : ""}
                </span>
                Favorite
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="isPinned"
                  checked={form.isPinned}
                  onChange={handleChange}
                />
                <span className={`custom-check${form.isPinned ? " checked" : ""}`}>
                  {form.isPinned ? "📌" : ""}
                </span>
                Pinned
              </label>
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={submitting || !form.name.trim()}
            >
              {submitting ? (
                <>
                  <span className="spin">🌸</span> Adding…
                </>
              ) : (
                <>🌸 Add to Garden</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}