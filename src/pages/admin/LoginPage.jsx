import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-teal-300">Secure access</p>
        <h1 className="mt-2 text-3xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-400">Use the CMS email and password. Sessions are stored in this browser only.</p>
        <label className="mt-6 block text-sm text-slate-300">
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
        </label>
        <label className="mt-4 block text-sm text-slate-300">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
        </label>
        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        <button disabled={loading} className="mt-6 w-full rounded-lg bg-teal-400 py-3 font-semibold text-slate-950 disabled:opacity-50">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <a href="/" className="mt-4 block text-center text-sm text-slate-400">Back to site</a>
      </form>
    </main>
  );
}
