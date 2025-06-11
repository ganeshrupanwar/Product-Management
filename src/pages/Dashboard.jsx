// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchProducts } from "../store/productsSlice";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const [chartData, setChartData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function load() {
//       const resp = await dispatch(fetchProducts()).unwrap();
//       const data = resp.map((p) => ({ name: p.title, value: p.rating }));
//       setChartData(data.slice(0, 10));
//     }
//     load();
//   }, [dispatch]);

//   return (
//     <div className="container">
//       <div className="card">
//         <h2>Dashboard</h2>
//         <LineChart width={600} height={300} data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="value" />
//         </LineChart>
//         <button className="button" onClick={() => navigate("/products")}>
//           Manage Products
//         </button>
//       </div>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((s) => s.products.items);
  const [loading, setLoading] = useState(true);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts()).unwrap()
      .then((items) => {
        // prepare line chart: rating over first 10 products
        setLineData(items.slice(0,10).map(p => ({
          name: p.title.slice(0,10) + "...",
          rating: p.rating
        })));
        // prepare bar chart: price buckets
        const buckets = {};
        items.forEach(p => {
          const range = `${Math.floor(p.price/50)*50}-${Math.floor(p.price/50)*50 + 49}`;
          buckets[range] = (buckets[range] || 0) + 1;
        });
        setBarData(Object.entries(buckets).map(([range, count])=>({ range, count })));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  // Summary stats
  const total = products.length;
  const avgPrice = total
    ? (products.reduce((sum,p)=>sum+p.price,0)/total).toFixed(2)
    : 0;
  const avgRating = total
    ? (products.reduce((sum,p)=>sum+p.rating,0)/total).toFixed(1)
    : 0;

  if (loading) return <div className="container"><p>Loading dashboard…</p></div>;

  return (
    <div className="container">
      <div className="summary-container">
        <div className="summary-card">
          <h3>Total Products</h3>
          <p>{total}</p>
        </div>
        <div className="summary-card">
          <h3>Average Price</h3>
          <p>${avgPrice}</p>
        </div>
        <div className="summary-card">
          <h3>Average Rating</h3>
          <p>{avgRating}</p>
        </div>
      </div>

      <div className="card">
        <h2>Ratings (Line Chart)</h2>
        <LineChart width={600} height={250} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rating" />
        </LineChart>
      </div>

      <div className="card">
        <h2>Price Distribution (Bar Chart)</h2>
        <BarChart width={600} height={250} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>
    </div>
  );
}
