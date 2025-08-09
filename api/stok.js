// api/stok.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const q = (req.query.q || "").toString().trim().toLowerCase();
  if (!q) return res.status(400).json({ error: "q parametresi gerekli" });

  const filePath = path.join(process.cwd(), "piskinler_stok.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const items = data.filter((r) =>
    (`${r.Marka} ${r.Model}` || "").toLowerCase().includes(q)
  );

  res.status(200).json({ count: items.length, items: items.slice(0, 5) });
}
