/** Structured copy for the OfficeKit HR homepage sections. */

export const HOME_HERO = {
  /** Intentional display lines matching the premium hero reference. */
  titleLines: ["AI-Powered HRMS for", "India, UAE & GCC Payroll"],
  /** @deprecated Prefer titleLines — kept for any legacy references. */
  titleLine1: "AI-Powered HRMS for",
  titleLine2: "India, UAE & GCC Payroll",
  subtitleParagraphs: [
    "Manage your entire workforce from a single platform - HR, payroll, attendance, recruitment, and employee management across India, UAE, and the GCC.",
  ],
  tagline: "Simplify HR. Empower Employees. Grow Faster.",
  highlights: ["Simplify HR.", "Empower Employees.", "Grow Faster."] as const,
  primaryCta: { label: "Book a Free Demo", href: "/contact" },
  secondaryCta: { label: "Talk to Our Experts", href: "/contact" },
  stats: [
    { value: "1,000+", label: "Businesses", icon: "building" },
    { value: "100,000+", label: "Employees Managed", icon: "users" },
    { value: "99.9%", label: "Payroll Accuracy", icon: "shield" },
  ] as const,
} as const;

export const HOME_TRUSTED = {
  heading: "Trusted by Growing Businesses",
  subheading: "Trusted by Businesses Across India, UAE & the GCC",
  description:
    "Organizations across India, UAE, and the GCC rely on OfficeKit to manage their workforce efficiently. From employee onboarding to payroll processing, OfficeKit helps businesses build smarter and more productive workplaces.",
  stats: [
    { value: "1,000+", label: "Businesses" },
    { value: "100,000+", label: "Employees Managed" },
    { value: "99.9%", label: "Payroll Accuracy" },
  ],
  logoHeading: "Empowering Leading Organizations with Smarter HR Management",
  logoSubheading:
    "Organizations across India and the GCC trust OfficeKit HR to streamline workforce management, automate payroll compliance, and drive employee productivity.",
} as const;

export const HOME_WHY = {
  badge: "Better Starts here",
  title: "Why does OfficeKit stand out?",
  titleAccent: "OfficeKit",
  subtitle: "Why Businesses Choose OfficeKit as Their HRMS Software",
  intro:
    "Managing HR should not be complicated. OfficeKit combines powerful automation, user-friendly design, and advanced HR capabilities into one unified platform.",
  items: [
    {
      id: "all-in-one",
      title: "All-in-One HRMS Platform",
      description:
        "Manage employee records, attendance, payroll, recruitment, performance, and compliance from a centralized dashboard. This unified approach eliminates the need for multiple software tools and improves operational efficiency.",
    },
    {
      id: "payroll",
      title: "Automated Payroll & Compliance",
      description:
        "Reduce payroll errors and stay compliant with statutory requirements through automated payroll processing and reporting. Ensure timely salary disbursements while maintaining complete compliance with labor laws and tax regulations.",
    },
    {
      id: "recruitment",
      title: "AI-Powered Recruitment",
      description:
        "Speed up hiring with intelligent applicant tracking, resume management, and recruitment workflows. Identify and onboard the right talent faster with streamlined hiring processes and improved candidate experiences.",
    },
    {
      id: "ess",
      title: "Employee Self-Service",
      description:
        "Enable employees to access payslips, apply for leave, update profiles, and manage requests independently. This reduces HR workload while enhancing transparency and employee satisfaction.",
    },
    {
      id: "cloud",
      title: "Cloud-Based Accessibility",
      description:
        "Access HR data securely anytime, anywhere through web and mobile applications. Support remote, hybrid, and on-site teams with real-time access to critical workforce information.",
    },
    {
      id: "support",
      title: "Dedicated Customer Support",
      description:
        "Get implementation guidance and continuous support from HR technology experts. Our team ensures a smooth onboarding experience and helps maximize the value of your HRMS investment.",
    },
  ],
  closing:
    "Whether you are searching for the best HR software in India, the best HRMS in India, or the best HRMS software in India, OfficeKit is built to support your journey with a scalable and future-ready HRMS solution.",
  cta: { label: "Learn more about OfficeKit HR", href: "/about-us" },
} as const;

export const HOME_MODULES = {
  badge: "Complete HRMS Modules",
  title: "Complete HRMS Modules",
  titleAccent: "Everything You Need to Manage Your Workforce",
  subtitle:
    "OfficeKit offers a comprehensive suite of HR tools that support every stage of the employee lifecycle.",
  modules: [
    {
      title: "Recruitment & Applicant Tracking",
      description:
        "Attract, manage, and hire top talent through an organized recruitment process. Streamline every stage of hiring from job posting and candidate screening to interview scheduling and onboarding.",
      href: "/features/recruitment-management",
    },
    {
      title: "Employee Information Management",
      description:
        "Maintain a centralized employee database with secure access and real-time updates. Keep employee records accurate, organized, and easily accessible whenever needed.",
      href: "/features/employee-management",
    },
    {
      title: "Attendance Management",
      description:
        "Track attendance accurately through biometric integration, mobile attendance, and automated reports. Gain real-time visibility into workforce attendance patterns and improve accountability across teams.",
      href: "/features/attendance-and-leave",
    },
    {
      title: "Leave Management",
      description:
        "Simplify leave requests, approvals, and leave balance tracking. Automate leave policies and ensure a seamless experience for both employees and managers.",
      href: "/features/leave-management",
    },
    {
      title: "Payroll Management",
      description:
        "Automate salary processing, deductions, reimbursements, and payroll reporting. Improve payroll accuracy while significantly reducing manual effort and administrative time.",
      href: "/features/payroll-and-compliance",
    },
    {
      title: "Performance Management",
      description:
        "Set goals, conduct evaluations, and effectively monitor employee performance. Foster continuous growth and development through structured feedback and performance tracking.",
      href: "/features/performance-appraisal",
    },
    {
      title: "Employee Self-Service Portal",
      description:
        "Empower employees to manage routine HR activities independently. Provide instant access to important HR information and services without relying on HR personnel.",
      href: "/features/self-service-portal",
    },
    {
      title: "Asset Management",
      description:
        "Track and manage company assets assigned to employees. Maintain complete visibility of asset allocation, usage, and returns throughout the employee lifecycle.",
      href: "/features/employee-management",
    },
    {
      title: "Reports & Analytics",
      description:
        "Make informed decisions with real-time HR insights and workforce analytics. Generate comprehensive reports to identify trends, improve planning, and support strategic decision-making.",
      href: "/features/employee-management",
    },
    {
      title: "Task & Timesheet",
      description:
        "Assign tasks, track timesheets, and monitor project effort with clear visibility for managers and teams.",
      href: "/features/task-and-timesheet",
    },
    {
      title: "Claim & Reimbursement",
      description:
        "Submit, approve, and process expense claims and reimbursements with audit-ready workflows.",
      href: "/features/claim-and-reimbursement",
    },
    {
      title: "Document Management",
      description:
        "Store, organize, and retrieve employee documents securely with expiry tracking and controlled access.",
      href: "/features/document-management",
    },
  ],
  closing:
    "OfficeKit combines all essential HRMS tools in India into a single easy-to-use platform, making it one of the best HRMS software in India for businesses of every size.",
} as const;

export const HOME_INDUSTRIES = {
  badge: "Industry Solutions",
  title: "Industry Solutions",
  titleAccent: "HRMS Solutions Designed for Every Industry",
  subtitle:
    "Every industry has unique workforce management challenges. OfficeKit provides flexible HRMS solutions that adapt to your business requirements.",
  items: [
    {
      name: "Manufacturing",
      description:
        "Manage shift-based employees, attendance tracking, and payroll efficiently.",
      href: "/industries/hrms-for-manufacturing",
    },
    {
      name: "Retail",
      description:
        "Handle distributed teams, multiple locations, and workforce scheduling.",
      href: "/industries/hrms-for-retail",
    },
    {
      name: "Healthcare",
      description:
        "Streamline employee management for hospitals, clinics, and healthcare providers.",
      href: "/industries/hrms-for-healthcare",
    },
    {
      name: "Construction",
      description:
        "Track field workforce attendance and workforce allocation in real time.",
      href: "/best-hrms-for-construction",
    },
    {
      name: "Logistics & Transportation",
      description:
        "Manage mobile teams, attendance, and payroll across locations.",
      href: "/industries/hrms-for-logistics",
    },
    {
      name: "IT & Software",
      description:
        "Support hybrid and remote workforce management with advanced employee self-service features.",
      href: "/industries/hrms-for-it-services",
    },
    {
      name: "Hospitality",
      description:
        "Simplify workforce scheduling, attendance, and performance tracking.",
      href: "/industries/hrms-for-hospitality",
    },
    {
      name: "Education",
      description:
        "Manage faculty, staff, attendance, and payroll from a centralized platform.",
      href: "/industries/hrms-for-education",
    },
  ],
  viewAllHref: "/industries",
} as const;

export const HOME_MOBILE = {
  badge: "Mobile App",
  title: "Manage HR Anytime, Anywhere",
  subtitle: "Stay connected with your workforce through the OfficeKit mobile application.",
  employeesCan: {
    heading: "Employees can:",
    items: [
      "Mark Attendance",
      "Apply for Leave",
      "Access Payslips",
      "View Company Announcements",
      "Submit Requests",
      "Track Attendance History",
    ],
  },
  managersCan: {
    heading: "Managers can:",
    items: [
      "Approve Leave Requests",
      "Monitor Team Attendance",
      "Access Employee Information",
      "Review Workforce Reports",
    ],
  },
  closing:
    "Bring HR closer to your workforce with a modern mobile-first experience.",
} as const;

export const HOME_TESTIMONIALS_INTRO = {
  badge: "Customer Testimonials",
  title: "What Our Customers Say",
  intro:
    "Businesses across industries consider OfficeKit among the best HRMS in India because of its powerful automation, ease of use, and reliable customer support.",
  subtitle:
    "Businesses choose OfficeKit because it helps them save time, improve accuracy, and create better employee experiences.",
} as const;

export const HOME_FINAL_CTA = {
  seoParagraphs: [
    "Thousands of businesses trust OfficeKit to simplify HR management, automate payroll, improve employee experiences, and streamline workforce operations. If you're searching for the best HR software in India, the best HRMS in India, or the best HRMS software in India, OfficeKit delivers a secure, scalable, and feature-rich solution designed to support businesses of every size.",
  ],
  heading: "Ready to Upgrade Your HR Operations?",
  supporting:
    "OfficeKit helps businesses automate HR processes, improve employee experiences, and streamline workforce management from a single platform.",
  seoSupporting:
    "Whether you're looking for an HRMS software in Kerala, the best HR software in India, the best HRMS in India, the best HRMS software in India, or a modern payroll and employee management solution, OfficeKit provides the tools you need to manage your workforce efficiently.",
  experienceHeading: "Experience the Future of HR Management",
  experienceSubheading: "Book Your Free Demo Today",
  checkmarks: [
    "Easy Implementation",
    "Secure Cloud Platform",
    "Payroll & Compliance Automation",
    "Dedicated Support Team",
    "Scalable for Businesses of All Sizes",
  ],
  ctaLabel: "Schedule a Demo Now",
  ctaHref: "/contact",
} as const;
