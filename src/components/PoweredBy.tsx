import { SITE } from "@/site";

export default function PoweredBy() {
  return (
    <div className="powered">
      POWERED BY&nbsp; <b>{SITE.poweredBy}</b>
    </div>
  );
}
