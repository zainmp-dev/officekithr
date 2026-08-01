/** Shared FAQ types — homepage uses a short set; /faq uses the full library. */
export type HomeFaq = {
  question: string;
  answer: string;
  bullets?: string[];
  ordered?: boolean;
};

export type HomeFaqCategory = {
  id: string;
  label: string;
  faqs: HomeFaq[];
};

/** Lean homepage FAQs — high-intent questions by topic; full list lives on /faq. */
export const HOME_FAQ_CATEGORIES: HomeFaqCategory[] = [
  {
    id: "overview",
    label: "Overview",
    faqs: [
      {
        question: "What is HRMS software?",
        answer:
          "HRMS software is a digital solution that helps organizations manage employee information, payroll, attendance, leave, recruitment, performance, and other HR processes from a centralized platform.",
      },
      {
        question: "Is OfficeKit suitable for small businesses?",
        answer:
          "Yes. OfficeKit is designed for startups, SMEs, and large enterprises looking for scalable HR management solutions.",
      },
      {
        question: "Does OfficeKit include payroll management?",
        answer:
          "Yes. OfficeKit offers automated payroll processing, salary calculations, compliance management, and payroll reporting.",
      },
      {
        question: "Can employees access OfficeKit from mobile devices?",
        answer:
          "Yes. OfficeKit offers mobile applications for both employees and managers.",
      },
    ],
  },
  {
    id: "india-gcc",
    label: "India & GCC",
    faqs: [
      {
        question: "Which countries does OfficeKit HR support?",
        answer:
          "OfficeKit supports India, UAE, Saudi Arabia, Kuwait, Qatar, Oman, and Bahrain — with localized payroll, statutory compliance, and employee self-service for each market.",
      },
      {
        question: "Does OfficeKit HR support UAE payroll and WPS compliance?",
        answer:
          "Yes. OfficeKit generates WPS-compliant SIF bank files for UAE salary transfers, handles gratuity and end-of-service calculations, and includes WPS workflows in payroll — not as a paid add-on.",
      },
      {
        question: "Can one HRMS run payroll in both India and the GCC?",
        answer:
          "Yes. Companies with India headquarters and Gulf subsidiaries use OfficeKit to run PF/ESI/TDS payroll for Indian entities and WPS/GOSI payroll for GCC entities on one platform, with shared employee records and group-level reporting.",
      },
      {
        question: "What Indian statutory compliance does OfficeKit automate?",
        answer: "Indian payroll covers:",
        bullets: [
          "Provident Fund (PF) and Employee State Insurance (ESI) deductions and filings.",
          "Professional Tax (PT) across applicable states.",
          "Income tax (TDS) and Form 16 generation.",
          "Gratuity provisions and audit-ready statutory reports.",
        ],
      },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    faqs: [
      {
        question: "Does payroll sync with attendance and leave automatically?",
        answer:
          "Yes. Pay runs pull approved leave, overtime, and attendance data directly from the HRMS — reducing manual exports and reconciliation every month.",
      },
      {
        question: "Can OfficeKit handle multi-company or holding-group payroll?",
        answer:
          "Yes. Gold and Platinum plans support multi-company structures — run separate payroll entities, policies, and reports while sharing a unified HR database.",
      },
      {
        question: "Can employees download payslips and tax documents?",
        answer:
          "Yes. Employees access digital payslips, Form 16 (India), and salary certificates through self-service on web and mobile — anytime, without HR intervention.",
      },
      {
        question: "Does OfficeKit support reimbursements and salary advances?",
        answer:
          "Yes. Gold and Platinum plans include claims, reimbursements, and salary advance workflows with manager approvals — integrated into monthly payroll runs.",
      },
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    faqs: [
      {
        question: "How does OfficeKit HR track employee attendance?",
        answer: "Multiple capture methods work side by side:",
        ordered: true,
        bullets: [
          "Biometric devices — real-time sync from eSSL and compatible hardware across branches.",
          "Geo-fencing and geo-tagging — mobile check-in for field and remote teams within defined boundaries.",
          "Face Kit — facial recognition for touchless attendance.",
          "Web check-in — clock in/out through the employee self-service portal.",
        ],
      },
      {
        question: "Are shift and overtime rules configurable?",
        answer:
          "Yes. Define rotating shifts, night shifts, grace periods, break rules, and overtime policies by department or location. Overtime hours auto-calculate from attendance logs against assigned shifts.",
      },
      {
        question: "Can we configure custom leave policies?",
        answer:
          "Yes. Set up leave types (casual, sick, earned, maternity, unpaid, and more) with entitlement rules, accrual rates, and carry-forward limits per department, role, or geography.",
      },
      {
        question: "Can we integrate existing biometric attendance devices?",
        answer:
          "Yes. OfficeKit syncs in real time with eSSL and compatible biometric hardware across branches. Punch data flows directly into attendance logs — no manual CSV uploads.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    faqs: [
      {
        question: "What plans does OfficeKit HR offer?",
        answer:
          "Three tiers — Silver, Gold, and Platinum — priced per active user per month. Silver covers core HR essentials; Gold adds multi-company, claims, and performance; Platinum includes travel, training, and grievance modules.",
      },
      {
        question: "Is pricing based on the number of employees?",
        answer:
          "Yes. Pricing is per active user per month. You only pay for modules you enable — recruitment, payroll, attendance, performance, and more can be switched on as you grow.",
      },
      {
        question: "Is there a free demo available?",
        answer:
          "Yes. Book a free demo to see payroll, attendance, and compliance workflows configured for your region — no commitment required.",
      },
      {
        question: "Can we upgrade or downgrade plans as we grow?",
        answer:
          "Yes. Start on Silver for core HR and add Gold or Platinum modules — performance, multi-company, travel, training — as your needs expand. You only pay for active users and enabled modules.",
      },
    ],
  },
  {
    id: "modules",
    label: "HR Modules",
    faqs: [
      {
        question: "Does OfficeKit include applicant tracking?",
        answer:
          "Yes. Recruiters manage job posts, candidate pipelines, interview scheduling, and offer letters in one ATS. Hired candidates flow directly into onboarding and core HR records.",
      },
      {
        question: "What can employees do in the self-service portal?",
        answer:
          "Employees view payslips, apply for leave, check attendance, update profiles, submit HR requests, and access company policies — without waiting on HR for routine tasks.",
      },
      {
        question: "Does OfficeKit support OKRs and performance reviews?",
        answer:
          "Yes. Run scheduled appraisal cycles, continuous feedback, and goal tracking aligned to company OKRs. Managers get data-backed review drafts with the AI Review Co-Pilot.",
      },
      {
        question: "Does OfficeKit handle employee exit and full-and-final settlement?",
        answer:
          "Yes. Exit workflows cover resignation processing, clearance checklists, asset return, gratuity or leave encashment, and full-and-final settlement calculations tied directly to payroll.",
      },
    ],
  },
  {
    id: "ai-mobile",
    label: "AI & Mobile",
    faqs: [
      {
        question: "What AI features does OfficeKit include?",
        answer:
          "AI Pilot helps automate routine HR workflows, draft performance review inputs, and surface actionable insights — so HR teams spend less time on repetitive tasks and more on people decisions.",
      },
      {
        question: "Is there a mobile app for employees and managers?",
        answer:
          "Yes. Employees and managers use the OfficeKit mobile app for attendance, leave, payslips, approvals, and announcements — available on iOS and Android.",
      },
      {
        question: "Can managers approve requests on mobile?",
        answer:
          "Yes. Leave, attendance regularization, claims, and other approvals can be actioned from the mobile app with push notifications so managers are not tied to a desktop.",
      },
      {
        question: "Does Face Kit work with the mobile app?",
        answer:
          "Yes. Face Kit enables touchless facial recognition attendance and works alongside geo-fencing and biometric options for hybrid and multi-site teams.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    faqs: [
      {
        question: "How does OfficeKit protect employee data?",
        answer:
          "OfficeKit uses encrypted data in transit and at rest, role-based access controls, and audit logs so only authorized users can view or change sensitive HR and payroll information.",
      },
      {
        question: "Is OfficeKit GDPR and compliance ready?",
        answer:
          "Yes. Privacy controls, access policies, and data handling practices are designed to support GDPR-aligned operations and regional compliance requirements for India and GCC customers.",
      },
      {
        question: "Can we control who sees salary and payroll data?",
        answer:
          "Yes. Granular permissions restrict payroll, compensation, and confidential documents to HR, finance, and other approved roles — managers only see what their role allows.",
      },
      {
        question: "Do you support SSO or enterprise authentication?",
        answer:
          "Enterprise deployments can integrate with your identity and access policies. Talk to our team during the demo about SSO and security requirements for your organization.",
      },
    ],
  },
];
/** Full FAQ library for /faq — organized by topic, no duplicate product copy. */
export const FAQ_PAGE_CATEGORIES: HomeFaqCategory[] = [
  {
    id: "general",
    label: "General",
    faqs: [
      {
        question: "What is OfficeKit HR?",
        answer:
          "OfficeKit HR is an AI-powered HRMS that automates recruitment, onboarding, attendance, leave, payroll, performance, and exit on one platform — built for growing businesses in India and the GCC that have outgrown spreadsheets and disconnected tools.",
      },
      {
        question: "Who is OfficeKit HR built for?",
        answer:
          "Startups, SMEs, and mid-market companies with 50–2,000+ employees that need unified HR and payroll instead of spreadsheets or disconnected tools — especially organizations with teams across India and the Gulf.",
      },
      {
        question: "Is OfficeKit HR suitable for multi-location businesses?",
        answer:
          "Yes. Manage branches, stores, factories, or project sites from one dashboard with location-specific shifts, leave rules, and holiday calendars — while leadership sees consolidated headcount, payroll cost, and compliance reports.",
      },
      {
        question: "Is OfficeKit HR an HRMS or payroll software?",
        answer:
          "Both. OfficeKit is a full HRMS with native payroll for India and GCC countries — you do not need a separate payroll add-on for WPS, PF, ESI, or statutory filings.",
      },
      {
        question: "What is the minimum team size for OfficeKit HR?",
        answer:
          "OfficeKit is designed for teams of 50 employees and above. Smaller companies can use it, but the platform delivers the most value when you have multiple locations, shift patterns, or cross-border payroll to manage.",
      },
      {
        question: "How is OfficeKit different from spreadsheets or Excel for HR?",
        answer:
          "Spreadsheets break down as headcount grows — version conflicts, manual payroll errors, and no audit trail. OfficeKit centralizes employee records, automates statutory calculations, enforces approval workflows, and gives managers and employees self-service access without emailing HR for every request.",
      },
      {
        question: "Can OfficeKit replace our current HRMS or payroll tool?",
        answer:
          "Yes. Most customers migrate from legacy on-premise systems, India-only HRMS tools, or a mix of spreadsheets and payroll software. Our team assists with employee data migration, policy configuration, and parallel payroll runs before full cutover.",
      },
    ],
  },
  {
    id: "india-gcc",
    label: "India & GCC",
    faqs: [
      {
        question: "Which countries does OfficeKit HR support?",
        answer:
          "OfficeKit supports India, UAE, Saudi Arabia, Kuwait, Qatar, Oman, and Bahrain — with localized payroll, statutory compliance, and employee self-service for each market.",
      },
      {
        question: "What is the best HRMS software for companies in India?",
        answer:
          "For Indian SMEs and mid-market firms, a strong HRMS should cover PF, ESI, Professional Tax, TDS, attendance, leave, and payroll in one system. OfficeKit HR is built for this — with modular per-user pricing and no third-party payroll plugins.",
      },
      {
        question: "Does OfficeKit HR support UAE payroll and WPS compliance?",
        answer:
          "Yes. OfficeKit generates WPS-compliant SIF bank files for UAE salary transfers, handles gratuity and end-of-service calculations, and includes WPS workflows in payroll — not as a paid add-on.",
      },
      {
        question: "Can one HRMS run payroll in both India and the GCC?",
        answer:
          "Yes. Companies with India headquarters and Gulf subsidiaries use OfficeKit to run PF/ESI/TDS payroll for Indian entities and WPS/GOSI payroll for GCC entities on one platform, with shared employee records and group-level reporting.",
      },
      {
        question: "Does OfficeKit support Saudi Arabia payroll and GOSI?",
        answer:
          "Yes. Saudi payroll includes GOSI contribution calculations, WPS-compliant salary processing, and end-of-service benefits — aligned with Kingdom labour regulations.",
      },
      {
        question: "What Indian statutory compliance does OfficeKit automate?",
        answer: "Indian payroll covers:",
        bullets: [
          "Provident Fund (PF) and Employee State Insurance (ESI) deductions and filings.",
          "Professional Tax (PT) across applicable states.",
          "Income tax (TDS) and Form 16 generation.",
          "Gratuity provisions and audit-ready statutory reports.",
        ],
      },
      {
        question: "What is WPS and how does OfficeKit help UAE employers?",
        answer:
          "WPS (Wage Protection System) requires UAE employers to pay salaries through approved bank channels using compliant SIF files. OfficeKit automates SIF file generation, salary disbursement tracking, and WPS reporting so you avoid MOHRE penalties and failed transfers.",
      },
      {
        question: "Does OfficeKit support Kuwait, Qatar, Oman, and Bahrain payroll?",
        answer:
          "Yes. GCC payroll extends to Kuwait (PIFSS), Qatar (WPS), Oman (PASI), and Bahrain (SIO) with localized statutory deductions, gratuity rules, and compliant salary files for each country.",
      },
      {
        question: "Is OfficeKit HR a greytHR or Keka alternative for Indian SMEs?",
        answer:
          "OfficeKit is a strong alternative for Indian SMEs that also operate in the GCC. Unlike India-only HRMS tools, OfficeKit unifies India statutory payroll and Gulf WPS compliance on one platform — with AI automation, Face-Kit attendance, and modular per-user pricing.",
      },
      {
        question: "Does OfficeKit support Arabic and English for GCC employees?",
        answer:
          "Yes. Employee self-service supports English and Arabic — essential for UAE and wider GCC workforces where staff and managers need bilingual access to payslips, leave, policies, and approvals.",
      },
      {
        question: "Can OfficeKit calculate UAE gratuity and end-of-service benefits?",
        answer:
          "Yes. Gratuity and end-of-service settlements are calculated based on tenure, salary components, and UAE labour law rules — and flow into full-and-final payroll processing at exit.",
      },
      {
        question: "Does OfficeKit handle contract and probation employees?",
        answer:
          "Yes. Configure contract tenure, probation periods, and notice rules per employee type. Payroll, leave entitlements, and exit workflows adapt to permanent, contract, and probation classifications.",
      },
      {
        question: "How does leave encashment work in Indian payroll?",
        answer:
          "Unused earned leave can be encashed at exit or on policy-defined dates. OfficeKit calculates encashment based on salary components and leave balances, then includes it in full-and-final settlement with statutory deductions applied.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    faqs: [
      {
        question: "What plans does OfficeKit HR offer?",
        answer:
          "Three tiers — Silver, Gold, and Platinum — priced per active user per month. Silver covers core HR essentials; Gold adds multi-company, claims, and performance; Platinum includes travel, training, and grievance modules.",
      },
      {
        question: "How much does OfficeKit HR cost?",
        answer:
          "OfficeKit uses modular per-user pricing across Silver, Gold, and Platinum tiers. Final cost depends on team size, enabled modules, and deployment choice. See our pricing page or book a demo for a quote tailored to your organization.",
      },
      {
        question: "Is pricing based on the number of employees?",
        answer:
          "Yes. Pricing is per active user per month. You only pay for modules you enable — recruitment, payroll, attendance, performance, and more can be switched on as you grow.",
      },
      {
        question: "Can I customize OfficeKit HR to fit our needs?",
        answer:
          "Yes. OfficeKit is modular. Enable the HR, payroll, attendance, and compliance workflows you need today and add modules later without replacing your core system.",
      },
      {
        question: "Do you offer cloud and on-premise deployment?",
        answer:
          "Yes. Choose cloud, on-premise, or hybrid deployment depending on your IT and data-residency requirements.",
      },
      {
        question: "Are volume discounts available?",
        answer:
          "Yes. Organizations with 200+ employees receive volume pricing. Contact our sales team for a custom quote.",
      },
      {
        question: "Is there a free demo available?",
        answer:
          "Yes. Book a free demo to see payroll, attendance, and compliance workflows configured for your region — no commitment required.",
      },
      {
        question: "Is there a setup fee or long-term contract?",
        answer:
          "Pricing is modular and per-user — there is no mandatory multi-year lock-in. Implementation and migration support are scoped during your demo based on team size and data complexity.",
      },
      {
        question: "Can we upgrade or downgrade plans as we grow?",
        answer:
          "Yes. Start on Silver for core HR and add Gold or Platinum modules — performance, multi-company, travel, training — as your needs expand. You only pay for active users and enabled modules.",
      },
      {
        question: "What modules are included in each plan?",
        answer: "Plan tiers build on each other:",
        bullets: [
          "Silver — core HR, attendance, leave, payroll, and employee self-service.",
          "Gold — adds multi-company, claims, reimbursements, and performance management.",
          "Platinum — adds travel, training, grievance handling, and advanced automation.",
        ],
      },
    ],
  },
  {
    id: "modules",
    label: "HR Modules",
    faqs: [
      {
        question: "Does OfficeKit include applicant tracking?",
        answer:
          "Yes. Recruiters manage job posts, candidate pipelines, interview scheduling, and offer letters in one ATS. Hired candidates flow directly into onboarding and core HR records.",
      },
      {
        question: "Can onboarding be automated after hire?",
        answer:
          "Yes. New hires receive structured checklists for document collection, policy acknowledgements, asset assignment, and role setup — reducing manual HR follow-ups.",
      },
      {
        question: "What employee data is centralized in OfficeKit?",
        answer:
          "Core HR stores profiles, documents, org structure, employment history, compensation, and lifecycle events in one system of record accessible to authorized roles only.",
      },
      {
        question: "What can employees do in the self-service portal?",
        answer:
          "Employees view payslips, apply for leave, check attendance, update profiles, submit HR requests, and access company policies — without waiting on HR for routine tasks.",
      },
      {
        question: "Does OfficeKit support OKRs and performance reviews?",
        answer:
          "Yes. Run scheduled appraisal cycles, continuous feedback, and goal tracking aligned to company OKRs. Managers get data-backed review drafts with the AI Review Co-Pilot.",
      },
      {
        question: "Does OfficeKit handle employee exit and full-and-final settlement?",
        answer:
          "Yes. Exit workflows cover resignation processing, clearance checklists, asset return, gratuity or leave encashment, and full-and-final settlement calculations tied directly to payroll.",
      },
      {
        question: "Does OfficeKit include document management?",
        answer:
          "Yes. Store offer letters, ID proofs, contracts, certifications, and policy acknowledgements against each employee profile. HR can track expiry dates for visas, licences, and mandatory documents.",
      },
      {
        question: "Can managers view org charts and team headcount?",
        answer:
          "Yes. Interactive org charts show reporting lines, department structure, and headcount by location. Managers see their direct and indirect reports without requesting reports from HR.",
      },
      {
        question: "Does OfficeKit support travel and expense management?",
        answer:
          "Yes, on Platinum plans. Employees submit travel requests and expense claims through self-service. Managers approve in-app, and approved amounts flow into payroll or reimbursement runs.",
      },
      {
        question: "How does grievance handling work?",
        answer:
          "Platinum includes a structured grievance module. Employees raise concerns through a confidential workflow, HR assigns and tracks resolution steps, and audit logs maintain a record for compliance reviews.",
      },
      {
        question: "Does OfficeKit support training and learning tracking?",
        answer:
          "Yes, on Platinum. Schedule training sessions, track attendance and completion, and maintain skill records linked to employee profiles for compliance and performance reviews.",
      },
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    faqs: [
      {
        question: "How does OfficeKit HR track employee attendance?",
        answer: "Multiple capture methods work side by side:",
        ordered: true,
        bullets: [
          "Biometric devices — real-time sync from eSSL and compatible hardware across branches.",
          "Geo-fencing and geo-tagging — mobile check-in for field and remote teams within defined boundaries.",
          "Face Kit — facial recognition for touchless attendance.",
          "Web check-in — clock in/out through the employee self-service portal.",
        ],
      },
      {
        question: "Are shift and overtime rules configurable?",
        answer:
          "Yes. Define rotating shifts, night shifts, grace periods, break rules, and overtime policies by department or location. Overtime hours auto-calculate from attendance logs against assigned shifts.",
      },
      {
        question: "Can we configure custom leave policies?",
        answer:
          "Yes. Set up leave types (casual, sick, earned, maternity, unpaid, and more) with entitlement rules, accrual rates, and carry-forward limits per department, role, or geography.",
      },
      {
        question: "Can we integrate existing biometric attendance devices?",
        answer:
          "Yes. OfficeKit syncs in real time with eSSL and compatible biometric hardware across branches. Punch data flows directly into attendance logs — no manual CSV uploads.",
      },
      {
        question: "Does OfficeKit support remote and hybrid work attendance?",
        answer:
          "Yes. Geo-fencing and geo-tagging let field and remote staff check in from approved locations. Web check-in and Face Kit cover hybrid teams that split time between office and home.",
      },
      {
        question: "How are attendance regularizations handled?",
        answer:
          "Employees request regularization for missed punches or late arrivals through self-service. Managers approve or reject with comments, and approved changes update attendance records before payroll cutoff.",
      },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    faqs: [
      {
        question: "Can OfficeKit handle multi-company or holding-group payroll?",
        answer:
          "Yes. Gold and Platinum plans support multi-company structures — run separate payroll entities, policies, and reports while sharing a unified HR database.",
      },
      {
        question: "Does payroll sync with attendance and leave automatically?",
        answer:
          "Yes. Pay runs pull approved leave, overtime, and attendance data directly from the HRMS — reducing manual exports and reconciliation every month.",
      },
      {
        question: "Can it handle complex shift rotations and overtime in payroll?",
        answer:
          "Yes. Shift schedules cross-reference biometric and mobile attendance logs. Approved overtime flows into payroll calculations without spreadsheet work.",
      },
      {
        question: "Does OfficeKit support reimbursements and salary advances?",
        answer:
          "Yes. Gold and Platinum plans include claims, reimbursements, and salary advance workflows with manager approvals — integrated into monthly payroll runs.",
      },
      {
        question: "Can employees download payslips and tax documents?",
        answer:
          "Yes. Employees access digital payslips, Form 16 (India), and salary certificates through self-service on web and mobile — anytime, without HR intervention.",
      },
      {
        question: "How are salary revisions and arrears processed?",
        answer:
          "Configure effective dates for salary changes, promotions, and increments. OfficeKit calculates arrears for backdated revisions and includes them in the next payroll run with a clear audit trail.",
      },
      {
        question: "Can OfficeKit handle loan deductions and EMI recovery?",
        answer:
          "Yes. Set up salary advances and loan schedules with automatic EMI deductions each month. Remaining balances update until the loan is fully recovered.",
      },
      {
        question: "Does OfficeKit generate bank transfer files for salary disbursement?",
        answer:
          "Yes. Export bank transfer files for Indian salary accounts and WPS-compliant SIF files for UAE and GCC banks — ready for upload to your corporate banking portal.",
      },
    ],
  },
  {
    id: "ai-mobile",
    label: "AI & Mobile",
    faqs: [
      {
        question: 'What makes OfficeKit HR "AI-powered"?',
        answer:
          "OfficeKit applies AI across HR operations — not just as a chatbot:",
        bullets: [
          "Smart Payroll Auditing — flags anomalies and entry errors before you process a run.",
          "Predictive Insights — surfaces early burnout and attrition risk signals from attendance patterns.",
          "Review Co-Pilot — drafts objective, data-backed performance reviews for managers.",
          "AI Pilot — conversational assistant for policy questions and HR workflow guidance.",
        ],
      },
      {
        question: "What is Face Kit?",
        answer:
          "Face Kit is OfficeKit's facial recognition module for touchless attendance capture. It integrates with attendance policies and payroll the same way biometric devices do.",
      },
      {
        question: "Is there a mobile app for iOS and Android?",
        answer:
          "Yes. The OfficeKit app covers attendance, leave, approvals, payslips, expense claims, and travel requests for employees and managers on the go.",
      },
      {
        question: "What can managers do via the mobile app?",
        answer:
          "Managers approve or reject leave, attendance regularizations, salary advances, and travel requests with push notifications — no need to log in from a desktop.",
      },
      {
        question: "Can AI Pilot answer employee policy questions?",
        answer:
          "Yes. AI Pilot is a conversational assistant inside OfficeKit that helps employees and managers find answers on leave policies, payslips, attendance rules, and common HR workflows — reducing repetitive tickets to the HR desk.",
      },
      {
        question: "Does Smart Payroll Auditing catch errors before payroll runs?",
        answer:
          "Yes. Before you finalize a pay run, Smart Payroll Auditing scans for anomalies — missing attendance, duplicate entries, outlier amounts, and statutory mismatches — so you fix issues before salaries are processed.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    faqs: [
      {
        question: "Is our payroll and employee data secure?",
        answer:
          "OfficeKit uses encryption at rest and in transit, with role-based access controls so employees, managers, and HR admins only see data they are authorized to view.",
      },
      {
        question: "Can OfficeKit HR integrate with our existing software?",
        answer:
          "Yes. Open APIs connect biometric hardware, accounting systems, and ERP platforms so HR data flows across your existing business stack.",
      },
      {
        question: "Where is customer data hosted?",
        answer:
          "Cloud deployments use secure, region-appropriate infrastructure. On-premise and hybrid options are available for organizations with specific data-residency requirements.",
      },
      {
        question: "What support do you provide after go-live?",
        answer:
          "Dedicated onboarding assistance, data migration help, team training, and ongoing support via email, live chat, and phone. Enterprise customers can access priority support.",
      },
      {
        question: "Does OfficeKit support role-based access by department?",
        answer:
          "Yes. Granular role-based permissions control who sees payroll, personal data, reports, and admin settings — by department, location, or custom role. Employees only access their own records.",
      },
      {
        question: "Can we export our data if we leave OfficeKit?",
        answer:
          "Yes. Your employee and payroll data belongs to you. OfficeKit supports structured data exports so you can migrate records if your requirements change.",
      },
    ],
  },
  {
    id: "implementation",
    label: "Implementation",
    faqs: [
      {
        question: "How long does implementation typically take?",
        answer:
          "Most organizations go live in 2–6 weeks. Timelines depend on employee count, number of locations, policy complexity, and how much historical data you migrate. A phased rollout by department or region is also supported.",
      },
      {
        question: "How does data migration from our current HRMS work?",
        answer: "Our implementation team guides a structured migration:",
        ordered: true,
        bullets: [
          "Export employee master, attendance, and leave balances from your current system.",
          "Map fields and validate data in a staging environment.",
          "Configure policies, shifts, and statutory rules for your regions.",
          "Run parallel payroll (optional) before switching fully to OfficeKit.",
        ],
      },
      {
        question: "What training is included during onboarding?",
        answer:
          "HR admins receive hands-on training on configuration, payroll runs, and reporting. Managers learn approvals and team views. Employees get a quick-start guide for self-service and the mobile app.",
      },
      {
        question: "Do you help configure our leave and payroll policies?",
        answer:
          "Yes. Implementation specialists work with your HR team to replicate existing leave types, shift rules, salary structures, and statutory settings — so go-live matches how you already operate, not a generic template.",
      },
      {
        question: "Can we roll out OfficeKit in phases?",
        answer:
          "Yes. Many customers start with core HR and attendance at one location, then add payroll, performance, or additional branches. Modular pricing means you enable modules as each phase goes live.",
      },
    ],
  },
];

export const HOME_ALL_FAQS: HomeFaq[] = HOME_FAQ_CATEGORIES.flatMap(
  (category) => category.faqs
);

export const FAQ_PAGE_ALL_FAQS: HomeFaq[] = FAQ_PAGE_CATEGORIES.flatMap(
  (category) => category.faqs
);

/** Plain-text answer for FAQPage JSON-LD. */
export function homeFaqToSchemaAnswer(faq: HomeFaq): string {
  if (!faq.bullets?.length) return faq.answer;
  const list = faq.bullets.join(" ");
  return `${faq.answer} ${list}`;
}
