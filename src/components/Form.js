import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);

    //Save only if items entered
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log("newItem", newItem);
    onAddItems(newItem);

    //Emptying values once stored in array
    setDescription("");
    setQuantity(1);
  }
  return (
    <div className="add-form" onClick={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </div>
  );
}
