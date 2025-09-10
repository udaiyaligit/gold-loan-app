import React, { useState } from "react";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";

export default function NewLoan() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    govtId: "",
    address: ""
  });

  const [items, setItems] = useState([
    { id: 1, type: "", gross: "", wastage: "", stone: "", purity: "916", net: 0, value: 0 }
  ]);

  const goldRatePerGram = 5200; // placeholder: will be fetched later

  function handleCustomerChange(e) {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  }

  function handleItemChange(index, field, value) {
    const newItems = items.map((it, i) => {
      if (i !== index) return it;
      const updated = { ...it, [field]: value };

      // compute net weight and value when relevant fields change
      const gross = parseFloat(updated.gross) || 0;
      const stone = parseFloat(updated.stone) || 0;
      const wastagePct = parseFloat(updated.wastage) || 0;
      const purity = parseFloat(updated.purity) || 0;

      // net weight = gross - stone - (gross * wastage%)
      const net = Math.max(0, gross - stone - (gross * (wastagePct / 100)));
      updated.net = Number(net.toFixed(3));

      // value = net * (purity/1000) * ratePerGram
      // purity is like 916 or 999 so use purity/1000
      const value = updated.net * ((purity || 916) / 1000) * goldRatePerGram;
      updated.value = Number(value.toFixed(2));

      return updated;
    });

    setItems(newItems);
  }

  function handleAddItem() {
    setItems([
      ...items,
      { id: Date.now(), type: "", gross: "", wastage: "", stone: "", purity: "916", net: 0, value: 0 }
    ]);
  }

  function handleRemoveItem(idx) {
    const newItems = items.filter((_, i) => i !== idx);
    setItems(newItems);
  }

  // totals & loan calc (simple)
  const totalJewelValue = items.reduce((s, it) => s + (parseFloat(it.value) || 0), 0);
  const selectedLoanPct = 80; // example scheme default
  const loanAmount = Math.round((totalJewelValue * selectedLoanPct) / 100);
  const processingCharge = 10; // placeholder fixed
  const givenAmount = loanAmount - processingCharge;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar left - keep minimal because Dashboard already has it */}
      <aside className="w-64 bg-slate-800 text-white p-6 flex-shrink-0 h-screen sticky top-0">
        <div className="rounded-2xl overflow-hidden">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
          </div>
          <nav>
            <ul className="space-y-2 text-sm">
              <li><a href="/" onClick={(e)=>{e.preventDefault(); window.history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate"));}} className="block px-3 py-2 rounded-lg hover:bg-slate-700">Dashboard</a></li>
              <li className="font-semibold">Pledge Entry</li>
              <li><a href="/loan" onClick={(e)=>e.preventDefault()} className="block px-3 py-2 rounded-lg bg-slate-700">New Loan</a></li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">New Loan Entry</h1>

        {/* Customer Section */}
        <Card className="bg-white border mb-4">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input name="name" value={customer.name} onChange={handleCustomerChange} placeholder="Customer Name" className="p-2 border rounded" />
              <input name="phone" value={customer.phone} onChange={handleCustomerChange} placeholder="Phone Number" className="p-2 border rounded" />
              <input name="govtId" value={customer.govtId} onChange={handleCustomerChange} placeholder="Govt ID" className="p-2 border rounded" />
              <input name="address" value={customer.address} onChange={handleCustomerChange} placeholder="Address" className="p-2 border rounded" />
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium">Upload Customer Photo:</label>
              <input type="file" className="block mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Gold Items Section */}
        <Card className="bg-white border mb-4">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Gold Items</h3>

            <div className="text-sm font-medium grid grid-cols-8 gap-2 mb-1">
              <div>Type</div><div>Gross (g)</div><div>Wastage %</div><div>Stone (g)</div><div>Purity</div><div>Net (g)</div><div>Value (₹)</div><div></div>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-8 gap-2 text-sm items-center">
                  <select value={item.type} onChange={(e)=>handleItemChange(idx,"type",e.target.value)} className="p-2 border rounded">
                    <option value="">Type</option>
                    <option value="chain">Chain</option>
                    <option value="ring">Ring</option>
                    <option value="stud">Stud</option>
                  </select>

                  <input type="number" value={item.gross} onChange={(e)=>handleItemChange(idx,"gross",e.target.value)} placeholder="Gross" className="p-2 border rounded" />
                  <input type="number" value={item.wastage} onChange={(e)=>handleItemChange(idx,"wastage",e.target.value)} placeholder="Wastage %" className="p-2 border rounded" />
                  <input type="number" value={item.stone} onChange={(e)=>handleItemChange(idx,"stone",e.target.value)} placeholder="Stone" className="p-2 border rounded" />
                  <select value={item.purity} onChange={(e)=>handleItemChange(idx,"purity",e.target.value)} className="p-2 border rounded">
                    <option value="916">916</option>
                    <option value="999">999</option>
                    <option value="750">750</option>
                  </select>

                  <input type="text" value={item.net} readOnly className="p-2 border rounded bg-gray-50" />
                  <input type="text" value={item.value} readOnly className="p-2 border rounded bg-gray-50" />
                  <div className="flex items-center space-x-2">
                    <input type="file" />
                    {items.length > 1 && <button onClick={()=>handleRemoveItem(idx)} className="text-red-600">Remove</button>}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleAddItem} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">+ Add Item</button>
          </CardContent>
        </Card>

        {/* Loan Details */}
        <Card className="bg-white border mb-4">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Loan Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm">Total Jewel Value</p>
                <p className="text-lg font-bold">₹ {totalJewelValue.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-sm">Loan % (scheme)</p>
                <select className="p-2 border rounded w-full">
                  <option value="80">80%</option>
                  <option value="75">75%</option>
                  <option value="70">70%</option>
                </select>
              </div>

              <div>
                <p className="text-sm">Loan Amount</p>
                <p className="text-lg font-bold">₹ {loanAmount}</p>
              </div>

              <div>
                <p className="text-sm">Processing Charge</p>
                <input type="number" className="p-2 border rounded w-full" defaultValue={processingCharge} />
              </div>

              <div>
                <p className="text-sm">Given Amount</p>
                <p className="text-lg font-bold">₹ {givenAmount}</p>
              </div>

              <div>
                <p className="text-sm">Interest %</p>
                <select className="p-2 border rounded w-full">
                  <option>1%</option>
                  <option>1.5%</option>
                  <option>2%</option>
                </select>
              </div>

              <div>
                <p className="text-sm">Loan Date</p>
                <input type="date" className="p-2 border rounded w-full" />
              </div>

              <div>
                <p className="text-sm">Due Date</p>
                <input type="date" className="p-2 border rounded w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow">Save Loan</button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow">Save & Print Receipt</button>
        </div>
      </main>
    </div>
  );
}
