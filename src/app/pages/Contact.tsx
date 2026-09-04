import { type FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, Check, Clock3, Copy, Github, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react";
import { Eyebrow, Reveal, SectionNumber } from "../components/primitives";
import { PERSON } from "../data";

const contactLinks = [
  { icon: Github, label: "GitHub", href: `https://${PERSON.github}` },
  { icon: Linkedin, label: "LinkedIn", href: `https://${PERSON.linkedin}` },
  { icon: Twitter, label: "X / Twitter", href: `https://${PERSON.x}` },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Nairobi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const copyEmail = async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(PERSON.email);
      // Only announce success after the write actually resolves
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — inform the user honestly
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2500);
    }
  };

  const sendEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString().trim() || "";
    const email = form.get("email")?.toString().trim() || "";
    const scope = form.get("scope")?.toString().trim() || "";
    const message = form.get("message")?.toString().trim() || "";
    const subject = `Project enquiry${scope ? ` — ${scope}` : ""}`;
    const body = `Name: ${name}\nEmail: ${email}\nScope: ${scope}\n\n${message}`;
    window.location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="pt-[68px]">
      <section className="mx-auto max-w-[1200px] px-5 pt-20 sm:px-8 sm:pt-28">
        <SectionNumber n="06" label="Contact" />

        <div className="mt-10 grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.55fr)] lg:items-end lg:gap-20 sm:pb-20">
          <Reveal>
            <h1 className="max-w-4xl font-[Newsreader] text-[clamp(3rem,6.2vw,5.7rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#f4f3f1]">
              Bring the hard problem.
              <span className="block text-[#aebcff]">I&apos;ll bring the system.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12} className="max-w-md lg:pb-1">
            <p className="text-[15px] leading-7 text-[#aaaab2]">
              I work with founders and teams who need more than a prototype: a clear technical
              direction, dependable software, and the judgment to know what not to automate.
            </p>
            <a
              href={`mailto:${PERSON.email}`}
              className="group mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-white transition hover:text-[#c5d0ff]"
            >
              Start with an email
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-20">
          <aside className="space-y-10">
            <Reveal>
              <div className="border-y border-white/10 py-5">
                <div className="flex items-center justify-between gap-5">
                  <Eyebrow>Availability</Eyebrow>
                  <span className="flex items-center gap-2 text-[12px] text-[#dcddd9]">
                    <span className="size-1.5 rounded-full bg-[#9aae85]" aria-hidden />
                    Open to select engagements
                  </span>
                </div>
                <p className="mt-4 max-w-sm text-[14px] leading-6 text-[#9797a0]">
                  Best fit: AI product strategy, retrieval systems, internal tools, and technically demanding 0→1 builds.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div>
                <Eyebrow>Direct</Eyebrow>
                <a
                  href={`mailto:${PERSON.email}`}
                  className="group mt-3 flex items-center justify-between border-b border-white/10 pb-4 font-[DM_Mono] text-[clamp(0.9rem,1.5vw,1.05rem)] text-[#ededeb] transition-colors hover:border-white/40 hover:text-white"
                >
                  {PERSON.email}
                  <Mail size={16} className="text-[#85858e] transition-colors group-hover:text-[#c5d0ff]" aria-hidden />
                </a>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 text-[12px] text-[#83838c] transition-colors hover:text-white"
                    aria-live="polite"
                  >
                    {copied
                      ? <><Check size={14} className="text-[#9aae85]" aria-hidden /> Email copied</>
                      : copyFailed
                        ? <><span className="text-[#d4836a]" aria-hidden>✕</span> Copy failed — use the link above</>
                        : <><Copy size={13} aria-hidden /> Copy email address</>
                    }
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-7">
                <div>
                  <Eyebrow>Based in</Eyebrow>
                  <div className="mt-3 flex items-center gap-2 text-[13px] text-[#d4d4da]">
                    <MapPin size={14} className="text-[#8e9fff]" aria-hidden />
                    {PERSON.location}
                  </div>
                </div>
                <div>
                  <Eyebrow>Local time</Eyebrow>
                  <div className="mt-3 flex items-center gap-2 font-[DM_Mono] text-[13px] text-[#d4d4da]">
                    <Clock3 size={14} className="text-[#8e9fff]" aria-hidden />
                    <time dateTime={time || undefined}>{time || "—"} EAT</time>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div>
                <Eyebrow>Elsewhere</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-[13px] text-[#9999a2] transition-colors hover:text-white"
                    >
                      <link.icon size={15} className="transition-transform group-hover:-translate-y-0.5" aria-hidden />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>

          <Reveal delay={0.1}>
            <form onSubmit={sendEnquiry} className="border-t border-white/15 pt-5">
              <div className="flex items-center justify-between gap-5">
                <Eyebrow>Project enquiry</Eyebrow>
                <span className="font-[DM_Mono] text-[10px] uppercase tracking-[0.16em] text-[#777780]">Typically replies within 2 days</span>
              </div>

              <div className="mt-8 grid gap-x-7 gap-y-7 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[12px] text-[#a4a4ad]">Your name</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-[15px] text-white placeholder:text-[#565661] focus:border-[#aebcff] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] text-[#a4a4ad]">Email address</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-[15px] text-white placeholder:text-[#565661] focus:border-[#aebcff] focus:outline-none"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[12px] text-[#a4a4ad]">What can I help with?</span>
                  <select
                    name="scope"
                    required
                    defaultValue=""
                    autoComplete="off"
                    className="mt-3 w-full appearance-none border-b border-white/15 bg-[#06070d] pb-3 text-[15px] text-white focus:border-[#aebcff] focus:outline-none"
                  >
                    <option value="" disabled>Select a starting point</option>
                    <option>AI product / agent system</option>
                    <option>Retrieval or knowledge system</option>
                    <option>Technical advisory</option>
                    <option>Custom software build</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[12px] text-[#a4a4ad]">A little context</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    autoComplete="off"
                    placeholder="The problem, where you are now, and what a useful outcome would look like."
                    className="mt-3 w-full resize-none border-b border-white/15 bg-transparent pb-3 text-[15px] leading-7 text-white placeholder:text-[#565661] focus:border-[#aebcff] focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-[12px] leading-5 text-[#777780]">
                  This opens your mail client with the enquiry filled in. No form service, no tracking.
                </p>
                <button type="submit" className="group inline-flex items-center justify-center gap-2 bg-[#f1f0ed] px-5 py-3 text-[13px] font-semibold text-[#0a0a0c] transition hover:bg-white">
                  Send enquiry
                  <Send size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
