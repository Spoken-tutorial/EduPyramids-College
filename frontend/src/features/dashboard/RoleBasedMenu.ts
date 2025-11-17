export type MenuItem = { label: string; to: string };
export type MenuSection = { title: string; subSections?: MenuSubSection[]; items?: MenuItem[] };
export type MenuSubSection = { subtitle: string; items: MenuItem[] };

export const MENU: MenuSection[] = [
  {
    title: "Training Manager",
    subSections: [
      {
        subtitle: "Training Manager",
        items: [
          { label: "Pending / Ongoing Training Request", to: "/dashboard/training/pending" },
          { label: "Completed Training Request", to: "/dashboard/training/completed" },
          { label: "Participation Certificate Request", to: "/dashboard/training/cert-requests" },
        ],
      },
      {
        subtitle: "Online Assessment Test",
        items: [
          { label: "Approval Pending", to: "/dashboard/assessment/approval-pending" },
          { label: "Approval Assessment Test", to: "/dashboard/assessment/approval" },
          { label: "Completed Assessment Test", to: "/dashboard/assessment/completed" },
        ],
      },
      {
        subtitle: "Paid Workshop Events",
        items: [
          { label: "Add New Event", to: "/dashboard/events/new" },
          { label: "View / Edit Event", to: "/dashboard/events/list" },
          { label: "Approve Event Registration", to: "/dashboard/events/approve-registrations" },
          { label: "Approve Event Attendance for Certificates", to: "/dashboard/events/approve-attendance" },
          { label: "Event Participant Transaction Details", to: "/dashboard/events/transactions" },
          { label: "CD-Download Transaction Details", to: "/dashboard/events/cd-transactions" },
        ],
      },
      {
        subtitle: "List",
        items: [
          { label: "Organisers List", to: "/dashboard/lists/organisers" },
          { label: "Invigilators List", to: "/dashboard/lists/invigilators" },
          { label: "Institution List", to: "/dashboard/lists/institutions" },
          { label: "Account Executive List", to: "/dashboard/lists/accounts" },
          { label: "Company List", to: "/dashboard/lists/company" },
        ],
      },
      {
        subtitle: "Testimonials",
        items: [
          { label: "List Testimonials", to: "/dashboard/testimonials" },
        ],
      },
      {
        subtitle: "Academic Transactions",
        items: [
          { label: "Transaction Details", to: "/dashboard/academics/transactions" },
          { label: "Activated Academics", to: "/dashboard/academics/activated" },
          { label: "Add Academic Payments", to: "/dashboard/academics/add-payments" },
          { label: "Add Academic Payments (via CSV)", to: "/dashboard/academics/add-payments-csv" },
        ],
      },
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
    subSections: [
      {
        subtitle: "Online Assessment Test",
        items: [
          { label: "Approval Pending", to: "/dashboard/invigilator/approval-pending" },
          { label: "Ongoing Test", to: "/dashboard/invigilator/ongoing" },
        ],
      },
    ],
  },
  {
    title: "Organiser",
    subSections: [
      {
        subtitle: "Training (To start the training go here)",
        items: [
          { label: "Semester Training Planner Summary (STPS)", to: "/dashboard/organiser/stps" },
          { label: "Add Participant Attendance", to: "/dashboard/organiser/attendance" },
        ],
      },
      {
        subtitle: "Online Assessment Test",
        items: [
          { label: "New Test Request", to: "/dashboard/organiser/test-request" },
          { label: "Approved Assessment Test", to: "/dashboard/organiser/approved" },
          { label: "Completed Assessment Test", to: "/dashboard/organiser/completed" },
        ],
      },
    ],
  },
];
