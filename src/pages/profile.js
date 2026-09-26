import { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Profile() {
  const { currentUser, updateProfile } = useInventory();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [savedMsg, setSavedMsg] = useState("");

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  function handleSaveProfile(e) {
    e.preventDefault();
    updateProfile({ name: name.trim() || currentUser?.name, email: email.trim() });
    setSavedMsg("Profile updated.");
    setTimeout(() => setSavedMsg(""), 2500);
  }

  function handleChangePassword(e) {
    e.preventDefault();
    setPwMsg("");
    if (!current || !next || !confirm) {
      setPwError("Fill in all three fields.");
      return;
    }
    if (next.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setPwError("New password and confirmation don't match.");
      return;
    }
    setPwError("");
    setPwMsg("Password updated.");
    setCurrent("");
    setNext("");
    setConfirm("");
    setTimeout(() => setPwMsg(""), 2500);
  }

  const initial = (currentUser?.name || "?").slice(0, 1).toUpperCase();

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>My profile</h1>
          <p>Manage your account details and password.</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <div
          aria-hidden="true"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--ink)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {initial}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{currentUser?.name || "—"}</div>
          <div style={{ color: "var(--slate)", fontSize: 13 }}>{currentUser?.email || "—"}</div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel__head">
          <h2>Account details</h2>
        </div>
        <form onSubmit={handleSaveProfile}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {savedMsg && (
            <div className="alert-box low" style={{ marginBottom: 12, width: "fit-content" }}>
              {savedMsg}
            </div>
          )}
          <Button type="submit">Save changes</Button>
        </form>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2>Change password</h2>
        </div>
        <form onSubmit={handleChangePassword}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <Input
              label="Current password"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
            <Input label="New password" type="password" value={next} onChange={(e) => setNext(e.target.value)} />
            <Input
              label="Confirm new password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {pwError && (
            <div className="field-error" style={{ marginBottom: 12 }}>
              {pwError}
            </div>
          )}
          {pwMsg && (
            <div className="alert-box low" style={{ marginBottom: 12, width: "fit-content" }}>
              {pwMsg}
            </div>
          )}
          <Button type="submit">Update password</Button>
        </form>
      </div>
    </div>
  );
}