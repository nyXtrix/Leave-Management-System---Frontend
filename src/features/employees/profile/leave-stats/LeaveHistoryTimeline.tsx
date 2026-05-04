import { ChartBarDefault, type ChartData } from '@/components/charts/BarChart'

interface LeaveHistoryTimelineProps {
  leaveHistory: ChartData[];
}

const LeaveHistoryTimeline = ({ leaveHistory }: LeaveHistoryTimelineProps) => {
  return (
    <div className='animate-reveal'>
        <ChartBarDefault data={leaveHistory} />
    </div>
  )
}

export default LeaveHistoryTimeline