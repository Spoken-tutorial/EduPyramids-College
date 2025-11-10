// src/menu.ts
export type MenuItem = { label: string; to: string };
export type MenuSection = { title: string; items: MenuItem[] };

export const MENU: MenuSection[] = [
  {
    title: "Training Manager",
    items: [
      { label: "Pending / Ongoing Training Request", to: "/dashboard/training/pending" },
      { label: "Completed Training Request", to: "/dashboard/training/completed" },
      { label: "Participation Certificate Request", to: "/dashboard/training/cert-requests" },
    ],
  },
  {
    title: "Online Assessment Test",
    items: [
      { label: "Approval Pending", to: "/dashboard/assessment/approval-pending" },
      { label: "Approval Assessment Test", to: "/dashboard/assessment/approval" },
      { label: "Completed Assessment Test", to: "/dashboard/assessment/completed" },
    ],
  },
  {
    title: "Paid Workshop Events",
    items: [
      { label: "Add New Event", to: "/dashboard/events/new" },
      { label: "View / Edit Event", to: "/dashboard/events/list" },
      { label: "Approve Event Registration", to: "/dashboard/events/approve-registrations" },
      { label: "Approve Attendance for Certificates", to: "/dashboard/events/approve-attendance" },
      { label: "Event Transactions", to: "/dashboard/events/transactions" },
      { label: "CD-Download Transactions", to: "/dashboard/events/cd-transactions" },
    ],
  },
  {
    title: "Account Executive",
    items: [
      { label: "Pay here to subscribe", to: "/dashboard/accounts/pay" },
      { label: "View Payment Details", to: "/dashboard/accounts/payments" },
    ],
  },
  {
    title: "Invigilator",
    items: [
      { label: "Approval Pending", to: "/dashboard/invigilator/approval-pending" },
      { label: "Ongoing Test", to: "/dashboard/invigilator/ongoing" },
    ],
  },
  {
    title: "Organiser",
    items: [
      { label: "Semester Training Planner (STPS)", to: "/dashboard/organiser/stps" },
      { label: "Add Participant Attendance", to: "/dashboard/organiser/attendance" },
      { label: "New Test Request", to: "/dashboard/organiser/test-request" },
      { label: "Approved Assessment Test", to: "/dashboard/organiser/approved" },
      { label: "Completed Assessment Test", to: "/dashboard/organiser/completed" },
    ],
  },
];
