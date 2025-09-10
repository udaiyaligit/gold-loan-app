// src/pages/NewLoan.jsx
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

/**
 * NewLoan page (complete)
 * - Single page UI for adding a new pledge / loan
 * - Local state only (no backend)
 */

// small helper to format INR
function fmtINR(num) {
  if (!num && num !== 0) return "₹ 0";
  return "₹ " + Number(num).toLocaleString("en-IN");
}

const defaultItem = () => ({
  id: Date.now() + Math.random().toString(36).slice(2, 7),
  type: "",
  gross: "",
  wastagePct: "",
  stone: "",
  purity: "916",
  net: 0,
  value: 0,
  image: null,
});

export default function NewLoan() {
  // shop-app-wide gold rate (would come from internet in final)
  const [goldRate, setGoldRate] = useState(5200); // rupees per gram
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    govtId: "",
    address: "",
    photo: null,
  });

  const [items, setItems] = useState([defaultItem()]);
  const [processingCharge, setProcessingCharge] = useState(10);
  const [loanPct, setLoanPct] = useState(80);
  const [interestPct, setInterestPct] = useState(1);
  const [loanDate, setLoanDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    // ensure at least one row
    if (items.length === 0) setItems([defaultItem()]);
    // eslint-disable-next-line
  }, []);

  function updateItem(id, changes) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...changes } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, defaultItem()]);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  // compute net grams and value for each item when inputs change
  useEffect(() => {
    setItems((prev) =>
      prev.map((it) => {
        const gross = parseFloat(it.gross) || 0;
        const wastagePct = parseFloat(it.wastagePct) || 0;
        const stone = parseFloat(it.stone) || 0;
        const purity = parseFloat(it.purity) || 916;
        // net grams = gross - (gross * wastage%) - stone grams
        const net = Math.max(0, gross - (gross * wastagePct) / 100 - stone);
        // value calculation uses goldRate and purity: value = net * goldRate * (purity/1000)
        const value = (net * goldRate * (purity / 1000)) || 0;
        return { ...it, net: Number(net.toFixed(3)), value: Number(value.toFixed(2)) };
      })
    );
  }, [items.map(i => `${i.gross}|${i.wastagePct}|${i.stone}|${i.purity}`).join("||"), goldRate]); // eslint note: we create a string to watch changes

  // totals
  const totals = useMemo(() => {
    const totalNet = items.reduce((s, it) => s + (parseFloat(it.net) || 0), 0);
    const totalValue = items.reduce((s, it) => s + (parseFloat(it.value) || 0), 0);
    const loanAmount = Math.round((totalValue * (loanPct / 100)) || 0);
    const givenAmount = Math.round(loanAmount - processingCharge);
    return { totalNet, totalValue: Number(totalValue.toFixed(2)), loanAmount, givenAmount };
  }, [items, loanPct, processingCharge]);

  function handleCustomerPhoto(file) {
    setCustomer((c) => ({ ...c, photo: file ? URL.createObjectURL(file) : null }));
  }

  function handleItemImage(id, file) {
    updateItem(id, { image: file ? URL.createObjectURL(file) : null });
  }

  function saveLoan(print = false) {
    // build payload (client-side mock)
    const payload = {
      customer,
      items,
      totals,
      processingCharge,
      loanPct,
      interestPct,
      loanDate,
      dueDate,
      goldRate,
      createdAt: new Date().toISOString(),
    };

    // for now just console.log and show alert
    console.log("Saving loan (mock):", payload);
    alert("Loan saved (mock). Check console for payload.\n" + (print ? "Print flow not implemented in demo." : ""));
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar initialActive="pledge-new" />

      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">New Loan Entry</h1>

        {/* Customer Details */}
        <section className="bg-white rounded-lg p-4 mb-6 shadow">
          <h2 className="text-lg font-medium mb-3">Customer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input className="border rounded px-3 py-2" placeholder="Customer Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Phone Number" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Govt ID" value={customer.govtId} onChange={(e) => setCustomer({ ...customer, govtId: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
            <div className="md:col-span-2 mt-2">
              <label className="block text-sm text-slate-700 mb-1">Upload Customer Photo</label>
              <input type="file" accept="image/*" onChange={(e) => { handleCustomerPhoto(e.target.files[0]); }} />
              {customer.photo && <img src={customer.photo} alt="customer" className="mt-2 w-28 h-28 object-cover rounded" />}
            </div>
            <div className="md:col-span-2"></div>
          </div>
        </section>

        {/* Gold Items */}
        <section className="bg-white rounded-lg p-4 mb-6 shadow">
          <h2 className="text-lg font-medium mb-3">Gold Items</h2>

          <div className="space-y-3">
            {items.map((it, idx) => (
              <div key={it.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border rounded p-3">
                <div className="md:col-span-2">
                  <select className="w-full border rounded px-2 py-1" value={it.type} onChange={(e) => updateItem(it.id, { type: e.target.value })}>
                    <option value="">Type</option>
                    <option>Ring</option>
                    <option>Chain</option>
                    <option>Bangle</option>
                    <option>Loose</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <input className="w-full border rounded px-2 py-1" placeholder="Gross (g)" value={it.gross} onChange={(e) => updateItem(it.id, { gross: e.target.value })} />
                </div>

                <div className="md:col-span-2">
                  <input className="w-full border rounded px-2 py-1" placeholder="Wastage %" value={it.wastagePct} onChange={(e) => updateItem(it.id, { wastagePct: e.target.value })} />
                </div>

                <div className="md:col-span-1">
                  <input className="w-full border rounded px-2 py-1" placeholder="Stone (g)" value={it.stone} onChange={(e) => updateItem(it.id, { stone: e.target.value })} />
                </div>

                <div className="md:col-span-2">
                  <select className="w-full border rounded px-2 py-1" value={it.purity} onChange={(e) => updateItem(it.id, { purity: e.target.value })}>
                    <option value="999">999</option>
                    <option value="916">916</option>
                    <option value="750">750</option>
                    <option value="585">585</option>
                  </select>
                </div>

                <div className="md:col-span-1 text-sm">
                  <div>Net</div>
                  <div className="font-semibold">{it.net} g</div>
                </div>

                <div className="md:col-span-2 text-sm">
                  <div>Value</div>
                  <div className="font-semibold">{fmtINR(it.value)}</div>
                </div>

                <div className="md:col-span-1 flex items-center gap-2">
                  <input type="file" accept="image/*" onChange={(e) => handleItemImage(it.id, e.target.files[0])} />
                  <button className="text-red-600 text-sm" onClick={() => removeItem(it.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addItem}>+ Add Item</button>
            </div>
          </div>
        </section>

        {/* Loan Details */}
        <section className="bg-white rounded-lg p-4 mb-6 shadow">
          <h2 className="text-lg font-medium mb-3">Loan Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded">
              <p className="text-sm">Total Jewel Value</p>
              <p className="text-xl font-bold">{fmtINR(totals.totalValue)}</p>
              <p className="text-sm text-slate-500 mt-1">{totals.totalNet} g total</p>
            </div>

            <div className="p-3 border rounded">
              <label className="block text-sm mb-1">Loan % (scheme)</label>
              <select className="w-full border rounded px-2 py-1" value={loanPct} onChange={(e) => setLoanPct(Number(e.target.value))}>
                <option value={80}>80%</option>
                <option value={75}>75%</option>
                <option value={70}>70%</option>
                <option value={85}>85%</option>
              </select>

              <div className="mt-3 text-sm">Loan Amount: <span className="font-semibold">{fmtINR(totals.loanAmount)}</span></div>
              <div className="mt-1 text-sm">Given Amount: <span className="font-semibold">{fmtINR(totals.givenAmount)}</span></div>
            </div>

            <div className="p-3 border rounded">
              <label className="block text-sm mb-1">Processing Charge</label>
              <input className="w-full border rounded px-2 py-1" value={processingCharge} onChange={(e) => setProcessingCharge(Number(e.target.value) || 0)} />
              <label className="block text-sm mt-3 mb-1">Interest %</label>
              <select className="w-full border rounded px-2 py-1" value={interestPct} onChange={(e) => setInterestPct(Number(e.target.value))}>
                <option value={1}>1%</option>
                <option value={1.5}>1.5%</option>
                <option value={2}>2%</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm mb-1">Loan Date</label>
              <input type="date" className="w-full border rounded px-2 py-1" value={loanDate} onChange={(e) => setLoanDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Due Date</label>
              <input type="date" className="w-full border rounded px-2 py-1" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Gold Rate (₹ / g)</label>
              <input className="w-full border rounded px-2 py-1" value={goldRate} onChange={(e) => setGoldRate(Number(e.target.value) || 0)} />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => saveLoan(false)}>Save Loan</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => saveLoan(true)}>Save & Print Receipt</button>
          </div>
        </section>
      </main>
    </div>
  );
}
