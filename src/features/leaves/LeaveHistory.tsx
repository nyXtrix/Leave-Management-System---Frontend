import { DataTable, type Column } from '@/components/tables/DataTable'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import React, { useState } from 'react'
import { Calendar, Clock, CheckCircle2, XCircle, Ban, Plus } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'

interface LeaveRecord {
    id: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    duration: string;
    status: 'Approved' | 'Pending' | 'Rejected' | 'Cancelled';
}

import ApplyLeaveModal from './ApplyLeaveModal';

const LeaveHistory = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    const columns: Column<LeaveRecord>[] = [
        {
            key: "leaveType",
            header: "Leave Type",
            sortable: true,
            render: (val) => (
                <span className="font-semibold text-slate-700">{String(val)}</span>
            )
        },
        {
            key: "startDate",
            header: "Start Date",
            sortable: true,
        },
        {
            key: "endDate",
            header: "End Date",
            sortable: true,
        },
        {
            key: "duration",
            header: "Duration",
            render: (val) => <span className="font-semibold text-secondary-500">{String(val)} {Number(val) > 1 ? 'Days' : 'Day'}</span>,
            sortable: true,
        },
        {
            key: "status",
            header: "Status",
            render: (val) => {
                const status = String(val);
                if (status === 'Approved') return <Badge variant="success" className="gap-1.5"><CheckCircle2 className="h-3 w-3" /> Approved</Badge>;
                if (status === 'Pending') return <Badge variant="warning" className="gap-1.5"><Clock className="h-3 w-3" /> Pending</Badge>;
                if (status === 'Rejected') return <Badge variant="danger" className="gap-1.5"><XCircle className="h-3 w-3" /> Rejected</Badge>;
                return <Badge className="gap-1.5"><Ban className="h-3 w-3" /> Cancelled</Badge>;
            },
            sortable: true,
        },
    ]

    const allData: LeaveRecord[] = [
        { id: "1", leaveType: "Sick Leave", startDate: "Oct 12, 2024", endDate: "Oct 14, 2024", duration: "2", status: "Approved" },
        { id: "2", leaveType: "Vacation", startDate: "Nov 01, 2024", endDate: "Nov 05, 2024", duration: "5", status: "Pending" },
        { id: "3", leaveType: "Casual Leave", startDate: "Sep 20, 2024", endDate: "Sep 21, 2024", duration: "1", status: "Rejected" },
        { id: "4", leaveType: "Maternity", startDate: "Dec 01, 2024", endDate: "Feb 28, 2025", duration: "90", status: "Approved" },
        { id: "5", leaveType: "Emergency", startDate: "Aug 15, 2024", endDate: "Aug 15, 2024", duration: "1", status: "Cancelled" },
        { id: "6", leaveType: "Sick Leave", startDate: "Oct 12, 2024", endDate: "Oct 14, 2024", duration: "2", status: "Approved" },
        { id: "7", leaveType: "Vacation", startDate: "Nov 01, 2024", endDate: "Nov 05, 2024", duration: "5", status: "Pending" },
        { id: "8", leaveType: "Casual Leave", startDate: "Sep 20, 2024", endDate: "Sep 21, 2024", duration: "1", status: "Rejected" },
        { id: "9", leaveType: "Maternity", startDate: "Dec 01, 2024", endDate: "Feb 28, 2025", duration: "90", status: "Approved" },
        { id: "10", leaveType: "Emergency", startDate: "Aug 15, 2024", endDate: "Aug 15, 2024", duration: "1", status: "Cancelled" },
        { id: "11", leaveType: "Sick Leave", startDate: "Oct 12, 2024", endDate: "Oct 14, 2024", duration: "2", status: "Approved" },
        { id: "12", leaveType: "Vacation", startDate: "Nov 01, 2024", endDate: "Nov 05, 2024", duration: "5", status: "Pending" },
        { id: "13", leaveType: "Casual Leave", startDate: "Sep 20, 2024", endDate: "Sep 21, 2024", duration: "1", status: "Rejected" },
        { id: "14", leaveType: "Maternity", startDate: "Dec 01, 2024", endDate: "Feb 28, 2025", duration: "90", status: "Approved" },
        { id: "15", leaveType: "Emergency", startDate: "Aug 15, 2024", endDate: "Aug 15, 2024", duration: "1", status: "Cancelled" },
        { id: "16", leaveType: "Sick Leave", startDate: "Oct 12, 2024", endDate: "Oct 14, 2024", duration: "2", status: "Approved" },
        { id: "17", leaveType: "Vacation", startDate: "Nov 01, 2024", endDate: "Nov 05, 2024", duration: "5", status: "Pending" },
        { id: "18", leaveType: "Casual Leave", startDate: "Sep 20, 2024", endDate: "Sep 21, 2024", duration: "1", status: "Rejected" },
        { id: "19", leaveType: "Maternity", startDate: "Dec 01, 2024", endDate: "Feb 28, 2025", duration: "90", status: "Approved" },
        { id: "20", leaveType: "Emergency", startDate: "Aug 15, 2024", endDate: "Aug 15, 2024", duration: "1", status: "Cancelled" },
    ];

    const filteredData = activeTab === 'all' 
        ? allData 
        : allData.filter(item => item.status.toLowerCase() === activeTab);

  return (
    <div className='space-y-3'>
        <div className='flex items-center justify-between'>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all" className='cursor-pointer'>All History</TabsTrigger>
                    <TabsTrigger value="approved" className='cursor-pointer'>Approved</TabsTrigger>
                    <TabsTrigger value="pending" className='cursor-pointer'>Pending</TabsTrigger>
                    <TabsTrigger value="rejected" className='cursor-pointer'>Rejected</TabsTrigger>
                    <TabsTrigger value="cancelled" className='cursor-pointer'>Cancelled</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <IconButton 
                    icon={Plus} 
                    variant="default"
                    onClick={() => setIsApplyModalOpen(true)}
                >
                    Apply Leave
                </IconButton>
            </div>
        </div>
        <div className="">
           <DataTable 
             columns={columns} 
             data={filteredData} 
             title="Request Timeline" 
             subtitle="A comprehensive log of your time-off history and status transitions."
             pageSize={5}
           />
        </div>
        <ApplyLeaveModal 
            isOpen={isApplyModalOpen} 
            onClose={() => setIsApplyModalOpen(false)} 
        />
    </div>
  )
}

export default LeaveHistory;