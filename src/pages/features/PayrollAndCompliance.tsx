import { ModuleLandingPage } from "@/components/modules/ModuleLandingPage";
import { payrollComplianceContent } from "@/data/modules/payroll-compliance";

export default function PayrollAndCompliance() {
  return <ModuleLandingPage content={payrollComplianceContent} />;
}
