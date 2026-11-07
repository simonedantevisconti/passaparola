import { Link } from "react-router-dom";
import "../styles/category-card.css";

export default function CategoryCard({ category, index }) {
  return (
    <Link to={`/gioca/${category.id}`} className="category-card">
      <div className="category-card-top"><span className="category-number">0{index + 1}</span><i className={`bi ${category.icon}`} aria-hidden="true" /></div>
      <div><h3>{category.title}</h3><p>{category.description}</p></div>
      <span className="category-card-bottom">21 lettere <i className="bi bi-arrow-up-right" aria-hidden="true" /></span>
    </Link>
  );
}
