import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic"
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/api/grievances");
    setGrievances(res.data);
  };

  const handleSubmit = async () => {
    await API.post("/api/grievances", form);
    setForm({ title: "", description: "", category: "Academic" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/grievances/${id}`);
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="topbar">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="card">
        <h3>Add Grievance</h3>

        <input placeholder="Title"
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})} />

        <input placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} />

        <select
          value={form.category}
          onChange={e => setForm({...form, category: e.target.value})}
        >
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <h3>All Grievances</h3>

      {grievances.map(g => (
        <div className="card" key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.description}</p>
          <p>Status: {g.status}</p>
          <button onClick={() => handleDelete(g._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}