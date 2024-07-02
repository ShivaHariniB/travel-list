import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((items) => [...items, newItem]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far away💼</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItems, onToggleItem }) {
  const [sortBy, setSortBy] = useState("packed");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - b.packed);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((items) => (
          <Item
            item={items}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={items.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list🚀</em>
      </p>
    );
  }

  const itemsLength = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((itemsPacked / itemsLength) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "You got everything! Ready to go ✈"
          : `💼 You have ${itemsLength} items on your list, and you already packed
        ${itemsPacked}(${packedPercentage}%)`}
      </em>
    </footer>
  );
}
