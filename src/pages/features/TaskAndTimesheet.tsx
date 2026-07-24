import { ModuleLandingPage } from "@/components/modules/ModuleLandingPage";
import { taskTimesheetContent } from "@/data/modules/task-timesheet";

export default function TaskAndTimesheet() {
  return <ModuleLandingPage content={taskTimesheetContent} />;
}
