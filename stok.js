// pages/api/stok.js
import data from "../../piskinler_stok.json" assert { type: "json" };

export default function handler(req, res) {
  const q = (req.query.q || "").toString().trim().toLowerCase();
  if (!q) return res.status(400).json({ error: "Parametre eksik: q" });

  const items = data.filter((r) => (`${r.Marka} ${r.Model}` || "").toLowerCase().includes(q));
  res.status(200).json({ count: items.length, items: items.slice(0, 5) });
}
