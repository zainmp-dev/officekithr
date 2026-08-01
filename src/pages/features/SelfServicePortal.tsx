import { ModuleLandingPage } from "@/components/modules/ModuleLandingPage";
import { selfServiceContent } from "@/data/modules/self-service";

export default function SelfServicePortal() {
  return <ModuleLandingPage content={selfServiceContent} />;
}
