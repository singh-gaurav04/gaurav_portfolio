import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Code } from "lucide-react";
import SplitText from "./SplitText";
import { trackVisit } from "../api/public";

export default function LeftHero({ profile }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const downloadResumeHandler = () => {
    trackVisit({
      page: "resume downloaded",
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    }).catch(() => {});
  };

  const firstName = profile?.name?.split(" ")[0] || "Gaurav";

  return (
    <div className="flex flex-col px-2 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center space-y-7 text-center"
      >
        <p className="editorial-label">{greeting}</p>
        <SplitText
          text={`${firstName} here`}
          className="text-center text-4xl font-extrabold sm:text-6xl"
          delay={80}
          duration={1.1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 80 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-80px"
          textAlign="center"
          showCallback
        />
        <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          {profile?.bio || "Loading profile…"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={profile?.email ? `mailto:${profile.email}` : "#contact"}
            className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full bg-[#14FCD4] px-6 py-3 font-semibold text-[#07130f] transition hover:scale-105"
          >
            <Mail className="h-4 w-4" /> Contact
          </a>
          {profile?.resume_url && (
            <a
              href={profile.resume_url}
              download
              onClick={downloadResumeHandler}
              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-3 font-semibold text-white transition hover:scale-105"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-3 text-white/70 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-3 text-white/70 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {profile?.leetcode_url && (
            <a href={profile.leetcode_url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-3 text-white/70 hover:text-white">
              <Code className="h-5 w-5" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
