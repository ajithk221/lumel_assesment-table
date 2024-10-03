import React, { useState } from 'react'
import './TableRow.css'

const TableRow = ({ row, onUpdateValue }) => {
    const [inputValue, setInputValue] = useState('');
    const [allocationPercent, setAllocationPercent] = useState('');
    const originalValue = row.value;
  
    const handlePercentageAllocation = () => {
      const percentage = parseFloat(allocationPercent);
      if (!isNaN(percentage)) {
        const newValue = originalValue * (1 + percentage / 100);
        onUpdateValue(row.id, newValue);
      }
      setAllocationPercent('');
    };
  
    const handleValueAllocation = () => {
      const value = parseFloat(inputValue);
      if (!isNaN(value)) {
        onUpdateValue(row.id, value);
      }
      setInputValue('');
    };
  
    return (
      <>
        <tr>
          <td>{row.label}</td>
          <td>{row.value.toFixed(2)}</td>
          <td>
            <input
              type="text"
              value={allocationPercent}
              onChange={(e) => setAllocationPercent(e.target.value)}
              placeholder="Allocation %"
            />
            <button onClick={handlePercentageAllocation}>Allocate %</button>
          </td>
          <td>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Allocation Value"
            />
            <button onClick={handleValueAllocation}>Allocate Value</button>
          </td>
        </tr>
        {row.children && row.children.map((child) => (
          <TableRow key={child.id} row={child} onUpdateValue={onUpdateValue} />
        ))}
      </>
    );
  };
  
  export default TableRow
