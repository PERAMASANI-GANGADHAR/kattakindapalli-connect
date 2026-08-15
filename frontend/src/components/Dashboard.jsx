function Dashboard() {
  return (
    <div className="dashboard">

      <div className="stat-card">
        <h2>25</h2>
        <p>📢 Total Complaints</p>
      </div>

      <div className="stat-card">
        <h2>8</h2>
        <p>🟡 Pending</p>
      </div>

      <div className="stat-card">
        <h2>12</h2>
        <p>🛠 In Progress</p>
      </div>

      <div className="stat-card">
        <h2>5</h2>
        <p>✅ Completed</p>
      </div>

    </div>
  );
}

export default Dashboard;