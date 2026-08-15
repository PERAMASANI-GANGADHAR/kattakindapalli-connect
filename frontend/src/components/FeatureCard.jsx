function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <h2>{icon}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;