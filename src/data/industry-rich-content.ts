import type { FaqItem } from "@/seo/schema";

type IndustryRichContent = {
  highlights: string[];
  features: { title: string; description: string }[];
  compliancePoints: string[];
  sections: { heading: string; body: string }[];
  extraFaqs?: FaqItem[];
  extraFacts?: { heading: string; body: string }[];
};

export const INDUSTRY_RICH_CONTENT: Record<string, IndustryRichContent> = {
  "hrms-for-manufacturing": {
    "highlights": [
      "Multi-plant employee and attendance management",
      "Rotational shift and overtime automation",
      "Accurate manufacturing payroll with allowances",
      "Statutory compliance and digital documents",
      "Employee self-service for factory and office staff"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift Management",
        "description": "Create and manage multiple shifts, rotational schedules, weekly offs, and overtime policies for round-the-clock production."
      },
      {
        "title": "Payroll Management",
        "description": "Automate salary processing, overtime calculations, incentives, bonuses, deductions, tax calculations, statutory compliance, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets such as laptops, machinery access cards, uniforms, safety equipment, and other resources assigned to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "Factories Act alignment",
      "India PF & ESI",
      "Bonus Act",
      "Gratuity calculation",
      "UAE WPS",
      "Overtime & shift rules"
    ],
    "sections": [
      {
        "heading": "Overcoming everyday workforce challenges in manufacturing",
        "body": "Manufacturing businesses operate in a dynamic environment where managing people is just as important as managing production. From coordinating multiple shifts and tracking attendance to processing payroll accurately and maintaining statutory compliance, HR teams face complex operational challenges every day. Manual spreadsheets and disconnected systems often result in payroll errors, attendance discrepancies, delayed approvals, and compliance risks. OfficeKit HRMS digitizes these processes so manufacturers reduce manual effort, improve accuracy, and gain complete workforce visibility across factories and production units."
      },
      {
        "heading": "Built to meet the demands of modern manufacturing HR",
        "body": "Manufacturing businesses require an HRMS that is reliable, scalable, and capable of managing a large workforce efficiently. OfficeKit offers centralized employee records, smart attendance, shift and roster management, accurate payroll, leave workflows, compliance reporting, multi-location control, employee self-service, and real-time analytics tailored to factories and production facilities."
      },
      {
        "heading": "Ready to modernize your manufacturing HR operations?",
        "body": "Transform the way you manage your workforce with OfficeKit HRMS. Whether you manage one factory or multiple production units, OfficeKit helps you simplify HR operations, reduce manual effort, improve payroll accuracy, and enhance employee productivity."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Manufacturers including BOSQ, TEAM THAI, ETRONIX, HOTPACK, and Carryfoods trust OfficeKit to power workforce management."
      }
    ]
  },
  "hrms-for-healthcare": {
    "highlights": [
      "24/7 duty roster and emergency shift planning",
      "Credential and certification tracking",
      "Payroll with overtime and shift allowances",
      "Multi-branch hospital and clinic management",
      "Self-service for clinical and support staff"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, qualifications, certifications, organizational structure, employment history, and digital documents throughout the employee lifecycle."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift & Duty Roster Management",
        "description": "Create flexible duty rosters, manage rotating shifts, emergency shifts, night duties, and department-wise schedules efficiently."
      },
      {
        "title": "Payroll Management",
        "description": "Automate salary processing, overtime calculations, incentives, bonuses, deductions, tax calculations, statutory compliance, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Securely store employee certificates, licenses, contracts, identity documents, and compliance-related records in a centralized repository."
      },
      {
        "title": "Asset Management",
        "description": "Track and manage company assets issued to employees, including ID cards, laptops, medical devices, uniforms, and access cards."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Professional Tax",
      "TDS payroll",
      "UAE WPS payroll",
      "Gratuity & EOS (GCC)",
      "Overtime & on-call pay rules"
    ],
    "sections": [
      {
        "heading": "Addressing the unique HR needs of the healthcare industry",
        "body": "Healthcare organizations operate around the clock, making workforce management more complex than in many other industries. Hospitals, clinics, pharmacies, laboratories, and healthcare centers depend on a well-managed workforce to ensure uninterrupted patient care. Manual processes often lead to scheduling conflicts, payroll errors, compliance issues, and increased administrative work. OfficeKit HRMS helps digitize recruitment, onboarding, attendance, payroll, leave, and performance from one centralized system."
      },
      {
        "heading": "Designed to support fast-paced healthcare workplaces",
        "body": "OfficeKit maintains complete employee records and certifications, automates attendance, manages rotating and emergency duty rosters, processes payroll with shift allowances, streamlines leave approvals, and supports multi-branch workforce management with real-time HR analytics."
      },
      {
        "heading": "Build a smarter healthcare workplace with OfficeKit HRMS",
        "body": "Empower your healthcare organization with a modern HRMS designed to simplify employee management, attendance, shift scheduling, payroll, leave, and compliance — whether you manage a hospital, clinic, pharmacy, diagnostic center, or healthcare network."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Healthcare organizations including CAREWELL (AMC), STARCINE PHARMACY, Medical Fitness, MIDAC, and Nature X (Vitanatura) trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-real-estate": {
    "highlights": [
      "GPS attendance for site and field teams",
      "Multi-project workforce management",
      "Payroll with overtime and travel allowances",
      "Contract and permanent employee tracking",
      "Centralized documents and compliance reports"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Capture attendance through biometric integration, GPS attendance, mobile check-ins, QR attendance, and web attendance for office and field employees."
      },
      {
        "title": "Shift Management",
        "description": "Manage project-wise work schedules, rotating shifts, overtime rules, holidays, and weekly offs with ease."
      },
      {
        "title": "Payroll Management",
        "description": "Automate salary processing, overtime calculations, incentives, bonuses, deductions, tax calculations, statutory compliance, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Track employee goals, project performance, appraisals, KPIs, and feedback to improve workforce productivity."
      },
      {
        "title": "Document Management",
        "description": "Store employee contracts, identity proofs, certifications, project-related documents, and compliance records securely in a centralized repository."
      },
      {
        "title": "Asset Management",
        "description": "Track laptops, ID cards, safety equipment, company vehicles, access cards, and other assets issued to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "UAE WPS / MOHRE",
      "Gratuity & EOS",
      "India PF & ESI",
      "Professional Tax",
      "TDS payroll",
      "Commission tax handling"
    ],
    "sections": [
      {
        "heading": "Managing a mobile workforce across multiple projects",
        "body": "The real estate industry manages a diverse workforce that includes corporate employees, site engineers, project managers, architects, sales executives, supervisors, and field teams. As projects expand across locations, tracking attendance, contractors, payroll, and compliance manually becomes difficult. OfficeKit brings recruitment, onboarding, attendance, payroll, leave, and performance into one digital platform."
      },
      {
        "heading": "Built for dynamic real estate and construction workforces",
        "body": "OfficeKit maintains complete employee profiles, tracks office and site attendance, automates payroll with allowances, enables digital leave approvals, and manages employees across multiple construction sites and offices from one HRMS."
      },
      {
        "heading": "One intelligent HRMS platform for every project",
        "body": "Automate employee management, attendance, payroll, leave, recruitment, documents, performance, and self-service whether your workforce operates from corporate offices, construction sites, sales offices, or multiple branches."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Real estate businesses including LANDMARK, VELLAPPALLY, Rollecate Engineering Services Pvt Ltd, and Archi Decor / Esperso trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-apparel-textile": {
    "highlights": [
      "Factory and retail multi-location HR",
      "Production shifts and overtime automation",
      "Payroll with production incentives",
      "Seasonal and contract workforce support",
      "Centralized compliance and documents"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift Management",
        "description": "Configure production shifts, rotating schedules, overtime rules, weekly offs, holiday calendars, and workforce planning for multiple departments."
      },
      {
        "title": "Payroll Management",
        "description": "Automate payroll processing, salary calculations, overtime, incentives, production bonuses, statutory deductions, tax calculations, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Track employee goals, production KPIs, appraisals, feedback, and performance reviews to improve workforce productivity."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets including uniforms, ID cards, laptops, production equipment, and access cards issued to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Professional Tax",
      "Bonus Act",
      "TDS & digital payslips",
      "UAE WPS",
      "Overtime automation"
    ],
    "sections": [
      {
        "heading": "Managing a fast-moving workforce across manufacturing and retail",
        "body": "The apparel and textile industry operates in a highly competitive environment where workforce efficiency impacts production timelines, product quality, and customer satisfaction. Businesses often manage employees across manufacturing units, warehouses, distribution centers, and retail outlets. OfficeKit centralizes HR so teams eliminate repetitive manual tasks, improve payroll accuracy, and gain workforce insights through real-time dashboards."
      },
      {
        "heading": "Built to support the dynamic apparel & textile industry",
        "body": "OfficeKit maintains a secure digital employee database, captures attendance across factories and stores, creates flexible production shifts, automates incentive payroll, and manages leave, compliance, and multi-location teams from one platform."
      },
      {
        "heading": "One HRMS platform for every stage of the employee lifecycle",
        "body": "From onboarding and attendance to payroll, leave, recruitment, documents, performance, and self-service, OfficeKit helps apparel and textile businesses increase productivity and support long-term growth."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Apparel & textile brands including NOVELTY / PAVOOS, POPPEES, YESBHARATH WEDDING COLLECTION, RK WEDDING MALL, and RK-Kollam trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-fintech": {
    "highlights": [
      "Fast onboarding for growing fintech teams",
      "Incentive and commission-based payroll automation",
      "Document verification and compliance tracking",
      "Attendance for hybrid and remote teams",
      "Audit-ready statutory reports"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift Management",
        "description": "Configure shift schedules, rotating shifts, overtime rules, holidays, and weekly offs with ease."
      },
      {
        "title": "Payroll Management",
        "description": "Automate salary processing, incentives, commissions, bonuses, statutory deductions, tax calculations, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, and fast digital onboarding for growing fintech teams."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store KYC documents, background verification records, and compliance-related employee documents securely in a centralized repository."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets such as laptops, ID cards, uniforms, equipment, and other resources assigned to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF (EPFO)",
      "India ESI (ESIC)",
      "Professional Tax (multi-state)",
      "TDS & Form 16",
      "UAE WPS / SIF",
      "KSA GOSI"
    ],
    "sections": [
      {
        "heading": "Scaling HR alongside fast fintech growth",
        "body": "Fintech companies grow headcount quickly across engineering, sales, compliance, and operations. Manual spreadsheets and disconnected systems often lead to payroll errors, delayed onboarding, and compliance risks. OfficeKit HRMS digitizes these processes so fintech HR teams reduce manual effort and gain complete workforce visibility."
      },
      {
        "heading": "Built for the pace of financial technology",
        "body": "OfficeKit offers centralized employee records, smart attendance, incentive payroll, leave workflows, compliance reporting, and real-time analytics tailored to fast-growing fintech teams."
      },
      {
        "heading": "Ready to modernize your fintech HR operations?",
        "body": "Transform the way you manage your workforce with OfficeKit HRMS. Whether you are a fintech startup or an established NBFC, OfficeKit helps you simplify HR operations, reduce manual effort, and support rapid growth."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Fintech businesses including LULU EXCHANGE and Crowe trust OfficeKit HRMS to power their workforce management."
      }
    ]
  },
  "hrms-for-it-services": {
    "highlights": [
      "Hybrid and remote attendance tracking",
      "OKR-based performance management",
      "Fast hiring and digital onboarding",
      "Contractor and bench resource tracking",
      "Multi-office workforce management"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance for office, remote, and hybrid employees with mobile check-in, biometric integration at delivery centers, and geo-based validation."
      },
      {
        "title": "Hybrid Attendance Management",
        "description": "Configure office, remote, and hybrid work schedules, holidays, and weekly offs for distributed technology teams."
      },
      {
        "title": "Payroll Management",
        "description": "Automate salary processing, overtime calculations, incentives, bonuses, deductions, tax calculations, statutory compliance, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Manage the complete hiring pipeline for developers, engineers, and consultants including job postings, interviews, offer letters, and digital onboarding."
      },
      {
        "title": "Performance Management",
        "description": "Run OKR cycles, continuous feedback, appraisals, and goal tracking to build high-performing engineering and delivery teams."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets such as laptops, ID cards, uniforms, equipment, and other resources assigned to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Professional Tax (multi-state)",
      "TDS & Form 16",
      "UAE WPS",
      "KSA GOSI",
      "Gratuity calculation"
    ],
    "sections": [
      {
        "heading": "Scaling HR for fast-moving technology teams",
        "body": "IT services and software companies hire aggressively across engineering, delivery, sales, and support functions. Manual spreadsheets and disconnected performance tools often result in payroll errors, missed OKR reviews, and limited visibility into distributed teams. OfficeKit HRMS digitizes recruitment, attendance, performance, payroll, and leave from one centralized system."
      },
      {
        "heading": "Built for modern, hybrid technology teams",
        "body": "OfficeKit maintains complete employee records, tracks hybrid and remote attendance, runs OKR-based performance cycles, automates payroll, and manages contractors and bench resources across multiple offices and delivery centers."
      },
      {
        "heading": "Build a smarter IT workplace with OfficeKit HRMS",
        "body": "Empower your technology company with a modern HRMS designed to simplify employee management, attendance, performance, payroll, leave, and compliance — whether you run a product startup or a global IT services firm."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "IT and software companies including HEXWHALE, PERFECT, SAFE, STORILABS, Axel, AEROVACTIVE, MSI, Mind Story, and Mind Premium trust OfficeKit to power their workforce management."
      }
    ]
  },
  "hrms-for-hospitality": {
    "highlights": [
      "24/7 shift rostering for FOH and BOH teams",
      "Tip and service charge payroll integration",
      "Multi-outlet attendance consolidation",
      "Seasonal hiring and fast onboarding",
      "Compliance for round-the-clock operations"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift Management",
        "description": "Create flexible shift rosters, rotating schedules, weekly offs, and overtime rules for front-of-house and back-of-house hospitality teams."
      },
      {
        "title": "Payroll Management",
        "description": "Automate payroll with tips, service charges, overtime, incentives, statutory deductions, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track uniforms, ID cards, kitchen equipment, laptops, and other assets issued to hotel and restaurant staff."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "UAE WPS / MOHRE",
      "KSA GOSI",
      "India PF & ESI",
      "Gratuity & EOS",
      "Overtime regulations",
      "Holiday pay rules"
    ],
    "sections": [
      {
        "heading": "Managing round-the-clock hospitality teams",
        "body": "Hotels, restaurants, and resorts operate 24/7 with rotating shifts across front desk, kitchen, housekeeping, and management. Manual processes often lead to scheduling conflicts, payroll errors, and compliance gaps. OfficeKit HRMS digitizes recruitment, attendance, payroll, and leave so hospitality teams focus on guest experience."
      },
      {
        "heading": "Built for round-the-clock hospitality operations",
        "body": "OfficeKit maintains complete employee records, tracks attendance across outlets, manages rotating shift rosters, automates payroll with tips and service charges, and streamlines leave approvals for hospitality teams."
      },
      {
        "heading": "Build a smarter hospitality workplace with OfficeKit HRMS",
        "body": "Empower your hotel, restaurant, or resort with a modern HRMS designed to simplify employee management, attendance, shift scheduling, payroll, leave, and compliance across every outlet."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Hospitality businesses including EMPIRE GROUP, CLUB SULAIMANI, and Kovilakam trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-automotive": {
    "highlights": [
      "Combined sales and service team management",
      "Incentive and commission-based payroll",
      "Workshop technician shift scheduling",
      "Multi-showroom workforce visibility",
      "Compliance and document management"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift Management",
        "description": "Configure shift schedules for showroom sales staff and workshop technicians, including weekend and rotational shifts."
      },
      {
        "title": "Payroll Management",
        "description": "Automate payroll with sales commissions, service incentives, overtime, statutory deductions, and digital payslip generation for dealership and workshop staff."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track tools, uniforms, ID cards, laptops, and diagnostic equipment issued to technicians and staff."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Professional Tax",
      "Bonus Act",
      "Gratuity calculation",
      "UAE WPS",
      "Overtime & shift rules"
    ],
    "sections": [
      {
        "heading": "Managing sales and service teams under one roof",
        "body": "Automotive dealerships and service centers manage two distinct workforces — showroom sales executives driving revenue through commissions, and workshop technicians delivering service quality. Manual processes often create payroll errors and limited visibility. OfficeKit HRMS brings both teams onto one platform with tailored attendance, payroll, and performance tracking."
      },
      {
        "heading": "Built for sales and service-driven automotive teams",
        "body": "OfficeKit maintains complete employee records, tracks showroom and workshop attendance, automates commission and incentive payroll, and manages employees across multiple dealership locations."
      },
      {
        "heading": "Drive smarter operations with OfficeKit HRMS",
        "body": "Empower your dealership or workshop with a modern HRMS designed to simplify employee management, attendance, shift scheduling, payroll, leave, and compliance across every location."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Automotive businesses including ABRECO trust OfficeKit HRMS to power their workforce management."
      }
    ]
  },
  "hrms-for-retail": {
    "highlights": [
      "Multi-store attendance with mobile check-in",
      "Seasonal workforce onboarding templates",
      "Payroll with store incentives and commissions",
      "High-turnover onboarding support",
      "Centralized compliance across regions"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track store staff attendance with GPS mobile check-in, biometric integration, QR code, and web attendance across all outlets."
      },
      {
        "title": "Shift Management",
        "description": "Configure shift schedules, rotating shifts, overtime rules, holidays, and weekly offs with ease."
      },
      {
        "title": "Payroll Management",
        "description": "Automate payroll with store-wise incentives, commissions, overtime, statutory deductions, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Onboard seasonal and permanent store staff quickly with digital hiring workflows, document collection, and induction checklists."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets such as laptops, ID cards, uniforms, equipment, and other resources assigned to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "Shops & Establishments",
      "India PF & ESI",
      "State Professional Tax",
      "UAE WPS",
      "KSA GOSI",
      "Bonus Act compliance"
    ],
    "sections": [
      {
        "heading": "Managing store teams across every location",
        "body": "Retail chains operate across malls, high streets, and franchise outlets with distinct shift patterns and high staff turnover. Manual spreadsheets often lead to payroll errors, attendance discrepancies, and compliance risks. OfficeKit HRMS digitizes these processes so retail teams reduce manual effort and gain complete workforce visibility."
      },
      {
        "heading": "Built for multi-store retail operations",
        "body": "OfficeKit maintains centralized employee records, tracks store-level attendance, automates incentive payroll, and manages seasonal and permanent staff across every store location."
      },
      {
        "heading": "Ready to modernize your retail HR operations?",
        "body": "Transform the way you manage your workforce with OfficeKit HRMS. Whether you run a single store or a nationwide retail chain, OfficeKit helps you simplify HR operations and improve payroll accuracy."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Retail businesses including ABRECO UAE, K E Hassans, Mark&Orion, ADITHYA HONDA, SAFA GROUP, MYG, BGC Trading, BUDGET PHARMA, RACKETLOUNGE, Lufano, and Seven Years trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-logistics": {
    "highlights": [
      "GPS-based attendance for drivers and field staff",
      "24/7 warehouse shift management",
      "Trip and distance-based pay automation",
      "Contractor and temporary worker tracking",
      "Multi-hub workforce visibility"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track driver and field staff attendance through GPS mobile check-in, geo-fenced depots, and delivery point validation."
      },
      {
        "title": "Shift Management",
        "description": "Manage 24/7 warehouse shifts, rotational schedules, overtime rules, and night shift premiums."
      },
      {
        "title": "Payroll Management",
        "description": "Automate payroll with trip-based pay, distance allowances, overtime, statutory deductions, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets such as laptops, ID cards, uniforms, equipment, and other resources assigned to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Motor transport worker rules",
      "Bonus & gratuity",
      "UAE WPS",
      "Overtime regulations",
      "Contract labour compliance"
    ],
    "sections": [
      {
        "heading": "Managing a mobile and warehouse-based workforce",
        "body": "Logistics and supply chain companies manage drivers, warehouse staff, and admin teams across multiple depots and hubs with shift-based operations. Manual tracking of trips, attendance, and payroll becomes difficult at scale. OfficeKit brings recruitment, onboarding, attendance, payroll, and leave into one digital platform."
      },
      {
        "heading": "Built for field-based and warehouse operations",
        "body": "OfficeKit maintains complete employee profiles, tracks driver and warehouse attendance, automates trip-based and shift-based payroll, and manages employees across multiple depots and hubs from one HRMS."
      },
      {
        "heading": "One intelligent HRMS platform for every hub",
        "body": "Automate employee management, attendance, payroll, leave, recruitment, documents, and self-service whether your workforce operates from warehouses, transport hubs, or regional depots."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Logistics businesses including SEABLUESHIPYARD and EXXONIC trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-agriculture": {
    "highlights": [
      "Seasonal and daily-wage workforce management",
      "Wage-based and piece-rate payroll automation",
      "Multi-farm attendance tracking",
      "Fast onboarding during harvest seasons",
      "Labour law and minimum wage compliance"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track field worker attendance with GPS mobile check-in, biometric integration, and web attendance across farms and processing units."
      },
      {
        "title": "Shift Management",
        "description": "Configure shift schedules, rotating shifts, overtime rules, holidays, and weekly offs with ease."
      },
      {
        "title": "Payroll Management",
        "description": "Automate wage-based and piece-rate payroll, overtime, statutory deductions, and digital payslip generation for seasonal and permanent staff."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify seasonal hiring during harvest and peak periods with fast digital onboarding and document collection."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store employee documents securely in a centralized digital repository, making them easily accessible whenever required."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets such as laptops, ID cards, uniforms, equipment, and other resources assigned to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Minimum Wages Act",
      "Seasonal & contract labour rules",
      "Bonus & gratuity",
      "State agri-labour regulations",
      "UAE WPS (agri-export units)"
    ],
    "sections": [
      {
        "heading": "Managing seasonal workforces across farms",
        "body": "Agribusinesses and agricultural co-operatives manage large seasonal and daily-wage workforces that fluctuate with harvest cycles. Manual wage calculations and paper-based attendance often lead to errors and compliance risks. OfficeKit HRMS digitizes attendance, payroll, and leave so agribusinesses reduce manual effort during peak seasons."
      },
      {
        "heading": "Built for seasonal and field-based agricultural workforces",
        "body": "OfficeKit maintains employee records, tracks field attendance across farms, automates wage-based and piece-rate payroll, and manages seasonal hiring for harvest and peak periods."
      },
      {
        "heading": "Grow your agribusiness with a smarter HRMS",
        "body": "Empower your farm, agro processing unit, or co-operative with a modern HRMS designed to simplify employee management, attendance, payroll, leave, and compliance across every location."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Agriculture businesses including ROYAL MAX, ORIENTAL AGRO MULTISTATE CO-OPERATIVE SOCIETY, and Navakerala trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-education": {
    "highlights": [
      "Academic term-based leave policies",
      "Faculty contract and tenure tracking",
      "Multi-campus workforce management",
      "Qualification and certification document vault",
      "Payroll for teaching and non-teaching staff"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage faculty and staff profiles, qualifications, certifications, employment history, and digital documents across campuses."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift Management",
        "description": "Configure shift schedules, rotating shifts, overtime rules, holidays, and weekly offs with ease."
      },
      {
        "title": "Payroll Management",
        "description": "Automate salary processing, overtime calculations, incentives, bonuses, deductions, tax calculations, statutory compliance, and digital payslip generation."
      },
      {
        "title": "Leave Management",
        "description": "Configure academic calendar-based leave policies, semester leave planning, and carry-over rules suited for teaching staff."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Store faculty qualification certificates, contracts, identity documents, and compliance records securely in a centralized repository."
      },
      {
        "title": "Asset Management",
        "description": "Track company assets such as laptops, ID cards, uniforms, equipment, and other resources assigned to employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Professional Tax",
      "TDS payroll",
      "Gratuity for long-serving faculty",
      "GCC payroll (international schools)",
      "Contract labour rules"
    ],
    "sections": [
      {
        "heading": "Managing academic-calendar HR needs",
        "body": "Educational institutions manage diverse employee types — tenured faculty, adjunct lecturers, administrative staff, and seasonal exam staff — each with different leave rules and contract structures. Academic calendar-based HR policies differ significantly from standard corporate models. OfficeKit HRMS digitizes these workflows so institutions eliminate manual paperwork."
      },
      {
        "heading": "Built for academic-calendar HR needs",
        "body": "OfficeKit maintains a secure digital employee database, tracks faculty attendance by class schedule, manages academic term-based leave, automates payroll, and supports multi-campus institutions from one platform."
      },
      {
        "heading": "Build a smarter institution with OfficeKit HRMS",
        "body": "Empower your school, college, or university with a modern HRMS designed to simplify employee management, attendance, leave, payroll, and compliance across every campus."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Educational institutions including ANJUMAN, Civiianz, and Galaxy Educational trust OfficeKit HRMS."
      }
    ]
  },
  "hrms-for-bfsi": {
    "highlights": [
      "Branch-level employee grouping and reporting",
      "Sales incentive and RM commission payroll",
      "Audit-ready compliance records",
      "Call center and branch shift scheduling",
      "Regulatory document management"
    ],
    "features": [
      {
        "title": "Employee Management",
        "description": "Manage employee profiles, organizational hierarchy, employment history, contracts, digital documents, certifications, and the complete employee lifecycle from onboarding to exit."
      },
      {
        "title": "Attendance Management",
        "description": "Track attendance with biometric integration, GPS, mobile check-in, QR code, and web attendance while reducing manual intervention."
      },
      {
        "title": "Shift Management",
        "description": "Configure shift schedules, rotating shifts, overtime rules, holidays, and weekly offs with ease."
      },
      {
        "title": "Payroll Management",
        "description": "Automate payroll with sales commissions, incentives, statutory deductions, audit-ready registers, and digital payslip generation for branch and corporate staff."
      },
      {
        "title": "Leave Management",
        "description": "Manage leave policies, holiday calendars, leave approvals, leave balances, and compensatory leave through a centralized platform."
      },
      {
        "title": "Recruitment & Onboarding",
        "description": "Simplify hiring by managing job openings, candidate applications, interviews, offer letters, onboarding workflows, and employee induction digitally."
      },
      {
        "title": "Performance Management",
        "description": "Monitor employee goals, KPIs, appraisals, feedback, and performance reviews to build a high-performing workforce."
      },
      {
        "title": "Document Management",
        "description": "Maintain regulatory documents, background verification records, and audit-ready employee files securely in a centralized repository."
      },
      {
        "title": "Asset Management",
        "description": "Track ID cards, laptops, access cards, and other assets issued to branch and corporate employees."
      },
      {
        "title": "Reports & Dashboards",
        "description": "Access real-time dashboards and generate customized reports for attendance, payroll, workforce productivity, compliance, leave, and employee performance."
      }
    ],
    "compliancePoints": [
      "India PF & ESI",
      "Professional Tax",
      "TDS & Form 16",
      "UAE WPS",
      "KSA GOSI",
      "Audit-ready registers"
    ],
    "sections": [
      {
        "heading": "Managing branch networks and regulatory compliance",
        "body": "Banks, NBFCs, and insurance companies operate across large branch networks with strict regulatory record-keeping requirements. Manual processes often lead to payroll errors, compliance gaps, and limited visibility into branch performance. OfficeKit HRMS centralizes employee management, payroll, and compliance so BFSI organizations stay audit-ready."
      },
      {
        "heading": "Built for regulated, branch-based BFSI operations",
        "body": "OfficeKit maintains complete employee records, manages branch-level attendance and shifts, automates incentive payroll for relationship managers, and provides audit-ready compliance reporting across the branch network."
      },
      {
        "heading": "Bank on a smarter HRMS platform",
        "body": "Empower your bank, NBFC, or insurance company with a modern HRMS designed to simplify employee management, attendance, payroll, leave, and regulatory compliance across every branch."
      }
    ],
    "extraFacts": [
      {
        "heading": "Trusted by leading businesses",
        "body": "Banking and financial services organizations trust OfficeKit HRMS to power branch-level workforce management and compliance."
      }
    ]
  }
};
