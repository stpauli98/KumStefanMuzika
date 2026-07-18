import Image from "next/image";
import { SITE } from "@/site";
import type { Dictionary } from "@/i18n/dictionaries";
import PoweredBy from "./PoweredBy";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <header
      id="top"
      className="relative overflow-hidden text-center"
      style={{
        background: "radial-gradient(120% 70% at 50% -10%, #1c1a16 0%, #0B0B0D 60%)",
      }}
    >
      <div className="beam pointer-events-none absolute left-1/2 top-[-6%] h-[86%] w-[46%] -translate-x-1/2" />
      <div className="container-site relative z-[2] pb-16 pt-14">
        <Image
          src="/logo.jpg"
          alt="SD Light and Sound"
          width={460}
          height={460}
          priority
          className="mx-auto w-[82%] max-w-[440px] rounded-2xl"
        />
        <h1 className="mt-7 font-display text-[clamp(26px,5.2vw,46px)] font-extrabold leading-[1.02] tracking-tight text-white">
          {dict.hero.slogan}
        </h1>
        <p className="mx-auto mt-4 max-w-[60ch] text-base text-[#C7C2B7]">{dict.hero.sub}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="#offerte" className="btn btn-primary">
            {dict.hero.cta1}
          </a>
          <a href={`https://wa.me/${SITE.whatsapp}`} className="btn btn-ghost">
            {dict.hero.cta2}
          </a>
        </div>
        <div className="mt-8">
          <PoweredBy />
        </div>
      </div>
    </header>
  );
}
