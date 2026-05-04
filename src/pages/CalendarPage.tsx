import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CalenderManagement from '@/features/calender/CalenderManagement';

export const CalendarPage = () => {
  return (
    <PageLayout title="Calendar">
      <CalenderManagement />
    </PageLayout>
  );
};

export default CalendarPage;
