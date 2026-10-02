import { useEffect, useState } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "./api";

const empty = { name: "", email: "", dateOfBirth: "", major: "" };

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const { data } = await getStudents(search);
    setStudents(data);
  };
  useEffect(() => { load(); }, [search]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      editingId ? await updateStudent(editingId, form) : await createStudent(form);
      setForm(empty);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (s) => { setForm(s); setEditingId(s.id); };
  const handleDelete = async (id) => {
    if (confirm("Delete this student?")) { await deleteStudent(id); load(); }
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Student Management</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, marginBottom: 24 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="dateOfBirth" type="date" value={form.dateOfBirth || ""} onChange={handleChange} />
        <input name="major" placeholder="Major" value={form.major || ""} onChange={handleChange} />
        <button type="submit">{editingId ? "Update" : "Add"} Student</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <input placeholder="Search by name..." value={search}
             onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 12, width: "100%" }} />

      <table width="100%" border="1" cellPadding="6">
        <thead><tr><th>Name</th><th>Email</th><th>DOB</th><th>Major</th><th></th></tr></thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td><td>{s.email}</td><td>{s.dateOfBirth}</td><td>{s.major}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>{" "}
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}