import { ModuleLandingPage } from "@/components/modules/ModuleLandingPage";
import { leaveManagementContent } from "@/data/modules/leave-management";

export default function LeaveManagement() {
  return <ModuleLandingPage content={leaveManagementContent} />;
}
