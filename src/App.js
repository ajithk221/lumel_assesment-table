import React, { useState } from 'react';
import TableRow from './components/TableRow';

// Sample data
const initialData = {
  rows: [
    {
      id: 'electronics',
      label: 'Electronics',
      value: 1400,
      children: [
        { id: 'phones', label: 'Phones', value: 800 },
        { id: 'laptops', label: 'Laptops', value: 700 },
      ],
    },
    {
      id: 'furniture',
      label: 'Furniture',
      value: 1000,
      children: [
        { id: 'tables', label: 'Tables', value: 300 },
        { id: 'chairs', label: 'Chairs', value: 700 },
      ],
    },
  ],
};

const App = () => {
  const [data, setData] = useState(initialData);

  const updateValue = (id, newValue) => {
    const updateRecursive = (rows) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, value: newValue };
        } else if (row.children) {
          const updatedChildren = updateRecursive(row.children);
          const totalValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
          return { ...row, value: totalValue, children: updatedChildren };
        }
        return row;
      });
    };

    const updatedRows = updateRecursive(data.rows);
    setData({ rows: updatedRows });
  };

  const grandTotal = data.rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className='table'>
      <h1>Hierarchical Table</h1>
      <table >
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <TableRow key={row.id} row={row} onUpdateValue={updateValue} />
          ))}
          <tr>
            <td><strong>Grand Total</strong></td>
            <td><strong>{grandTotal.toFixed(2)}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;

