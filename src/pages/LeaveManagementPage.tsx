import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Sparkles,
  CalendarDays,
  Plus,
  MoreVertical,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import LeaveTypesManagement from "@/features/leave-types/LeaveTypesManagement";

const MOCK_LEAVE_TYPES = [
  {
    id: "1",
    name: "Sick Leave",
    code: "SL",
    allowance: 12,
    color: "bg-rose-500",
    icon: "🤒",
  },
  {
    id: "2",
    name: "Vacation",
    code: "VL",
    allowance: 15,
    color: "bg-emerald-500",
    icon: "🏖️",
  },
  {
    id: "3",
    name: "Casual Leave",
    code: "CL",
    allowance: 10,
    color: "bg-indigo-500",
    icon: "🏠",
  },
  {
    id: "4",
    name: "Maternity",
    code: "ML",
    allowance: 90,
    color: "bg-purple-500",
    icon: "👶",
  },
];

const MOCK_HOLIDAYS = [
  { id: "1", name: "New Year's Day", date: "2026-01-01", type: "Public" },
  { id: "2", name: "Independence Day", date: "2026-07-04", type: "Public" },
  { id: "3", name: "Labor Day", date: "2026-09-07", type: "Restricted" },
];

export function LeaveManagementPage() {
  return (
    // <PageLayout
    //   title="Setup & Management"
    //   subtitle="Configure leave categories and holiday calendars for your organization"
    // >
    //   <Tabs defaultValue="types" className="w-full space-y-8">
    //     <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200 w-fit">
    //       <TabsTrigger value="types" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-soft">
    //         <Sparkles className="h-4 w-4 mr-2" /> Leave Types
    //       </TabsTrigger>
    //       <TabsTrigger value="holidays" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-soft">
    //         <CalendarDays className="h-4 w-4 mr-2" /> Public Holidays
    //       </TabsTrigger>
    //     </TabsList>

    //     <TabsContent value="types" className="animate-reveal">
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //         {/* Create New Card */}
    //         <button className="h-[200px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all group">
    //           <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
    //             <Plus className="h-6 w-6" />
    //           </div>
    //           <span className="font-black tracking-tight">Create New Leave Type</span>
    //         </button>

    //         {MOCK_LEAVE_TYPES.map((type) => (
    //           <Card key={type.id} className="group relative border-none shadow-soft hover:shadow-premium transition-all duration-300 overflow-hidden">
    //             <div className={cn("absolute top-0 left-0 w-full h-1.5", type.color)} />
    //             <CardHeader className="flex flex-row items-center justify-between p-6">
    //               <div className="flex items-center gap-4">
    //                 <div className="text-3xl">{type.icon}</div>
    //                 <div>
    //                   <CardTitle className="text-lg font-black text-slate-800">{type.name}</CardTitle>
    //                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{type.code}</span>
    //                 </div>
    //               </div>
    //               <Button variant="ghost" size="icon" className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
    //                 <MoreVertical className="h-4 w-4" />
    //               </Button>
    //             </CardHeader>
    //             <CardContent className="px-6 pb-6 space-y-6">
    //                <div className="flex justify-between items-end border-b pb-4">
    //                   <div>
    //                     <p className="text-2xl font-black text-slate-900">{type.allowance}</p>
    //                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days / Year</p>
    //                   </div>
    //                   <Badge variant="outline" className="bg-slate-50 border-slate-200 py-1">Active</Badge>
    //                </div>
    //                <div className="flex gap-2">
    //                   <Button size="sm" variant="ghost" className="flex-1 text-slate-600 hover:bg-slate-100 rounded-xl">
    //                     <Edit3 className="h-3.5 w-3.5 mr-2" /> Edit
    //                   </Button>
    //                   <Button size="sm" variant="ghost" className="flex-1 text-rose-500 hover:bg-rose-50 rounded-xl">
    //                     <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
    //                   </Button>
    //                </div>
    //             </CardContent>
    //           </Card>
    //         ))}
    //       </div>
    //     </TabsContent>

    //     <TabsContent value="holidays" className="animate-reveal">
    //        <Card className="border-none shadow-premium bg-white/80 backdrop-blur-sm overflow-hidden">
    //          <CardHeader className="flex flex-row items-center justify-between p-8 bg-slate-50/50">
    //            <div>
    //               <CardTitle className="text-2xl font-black text-slate-900">2026 Holiday Calendar</CardTitle>
    //               <p className="text-slate-500 mt-1">Mark organization-wide holidays and observances</p>
    //            </div>
    //            <Button className="gradient-primary shadow-glow-primary rounded-2xl px-6 py-6 h-auto">
    //              <Plus className="h-4 w-4 mr-2" /> Add Holiday
    //            </Button>
    //          </CardHeader>
    //          <CardContent className="p-0">
    //            <div className="divide-y">
    //              {MOCK_HOLIDAYS.map((holiday) => (
    //                <div key={holiday.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group">
    //                   <div className="flex items-center gap-6">
    //                      <div className="w-14 h-14 rounded-2xl bg-white border shadow-soft flex flex-col items-center justify-center p-2">
    //                        <span className="text-[10px] font-black text-indigo-600 uppercase">JUL</span>
    //                        <span className="text-lg font-black text-slate-900 leading-none">04</span>
    //                      </div>
    //                      <div>
    //                         <p className="font-bold text-slate-800">{holiday.name}</p>
    //                         <Badge className="mt-1 bg-white border text-[10px]">{holiday.type}</Badge>
    //                      </div>
    //                   </div>
    //                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
    //                     <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><Edit3 className="h-4 w-4" /></Button>
    //                     <Button variant="ghost" size="icon" className="text-slate-400 hover:text-rose-500"><Trash2 className="h-4 w-4" /></Button>
    //                   </div>
    //                </div>
    //              ))}
    //            </div>
    //            <div className="p-8 bg-slate-50/30 text-center">
    //              <p className="text-sm text-slate-400 font-medium italic">Showing all standardized holidays for ACME Organization</p>
    //            </div>
    //          </CardContent>
    //        </Card>
    //     </TabsContent>
    //   </Tabs>
    // </PageLayout>
    <PageLayout title="Leave Management">
      <LeaveTypesManagement />
    </PageLayout>
  );
}
