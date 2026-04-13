import React from 'react'
import LeaveCard from './LeaveCard'
import LeaveHistory from './LeaveHistory';

const LeaveManagement = () => {
  const balances = [
    { title: "some", available: 8, total: 12 },
    { title: "sick leave", available: 12, total: 15 },
    { title: "abc", available: 4, total: 10 },
    { title: " xyz", available: 90, total: 90 },
  ];

  return (
    <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {balances.map((b) => (
              <LeaveCard key={b.title} {...b} />
            ))}
        </div>
        <LeaveHistory />
    </div>
  )
}

export default LeaveManagement