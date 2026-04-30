import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Cloud, Code, Cpu, Database, Globe, Sparkles, Star, Wrench } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const skillCategories = [
  { id: "all", name: "All Skills", icon: Star },
  { id: "AI_STACK", name: "GenAI Stack", icon: Cpu },
  { id: "ml_dl", name: "ML / Deep Learning", icon: Brain },
  { id: "vector_db", name: "Vector DBs", icon: Database },
  { id: "deployment", name: "Deployment", icon: Cloud },
  { id: "programming", name: "Languages", icon: Code },
  { id: "frameworks", name: "Frameworks", icon: Globe },
  { id: "tools", name: "Tools", icon: Wrench },
];

const getOrbitRingClass = (level) => {
  if (level >= 90) return "from-emerald-400/30 via-cyan-400/30 to-blue-400/30";
  if (level >= 75) return "from-purple-400/30 via-violet-400/30 to-pink-400/30";
  return "from-slate-400/20 via-slate-500/20 to-slate-600/20";
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { skills } = portfolioData;
  const allSkills = useMemo(() => Object.values(skills).flat(), [skills]);
  const displaySkills = useMemo(() => {
    if (selectedCategory === "all") {
      return allSkills;
    }
    return skills[selectedCategory] || [];
  }, [allSkills, selectedCategory, skills]);
  const highlightedSkills = useMemo(() => {
    return [...displaySkills].sort((firstSkill, secondSkill) => secondSkill.level - firstSkill.level).slice(0, 4);
  }, [displaySkills]);
  const averageLevel = useMemo(() => {
    if (allSkills.length === 0) {
      return 0;
    }
    const totalLevels = allSkills.reduce((accumulator, skill) => accumulator + skill.level, 0);
    return Math.round(totalLevels / allSkills.length);
  }, [allSkills]);
  return (
    <section id="skills" className="relative overflow-hidden py-20 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_35%)]" />
      <div className="container relative z-10 mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            <Sparkles className="h-4 w-4" />
            Skill Orbit
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">Technologies I Build With</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-400 md:text-lg">A curated orbit of tools, platforms, and frameworks I use to design and ship reliable AI-first products.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlightedSkills.map((skill, index) => (
            <motion.div key={skill.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.08 }} viewport={{ once: true }} className="rounded-2xl border border-slate-700/70 bg-slate-900/65 p-4 backdrop-blur">
              <div className="mb-3 text-sm font-medium text-slate-300">Top Signal</div>
              <div className="mb-1 flex items-center justify-between">
                <div className="text-lg font-semibold text-white">{skill.name}</div>
                <div className="text-sm text-emerald-300">{skill.level}%</div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700/80">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 0.8, delay: 0.2 + index * 0.08 }} viewport={{ once: true }} className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-10 flex justify-center">
          <div className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-slate-700/70 bg-slate-900/70 p-2">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const isActiveCategory = selectedCategory === category.id;
              return (
                <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm transition-all ${isActiveCategory ? "border-emerald-300/50 bg-emerald-400/15 text-emerald-200" : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white"}`}>
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {displaySkills.map((skill, index) => (
            <motion.article key={`${selectedCategory}-${skill.name}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }} viewport={{ once: true }} whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 backdrop-blur-md">
              <div className={`pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-gradient-to-br ${getOrbitRingClass(skill.level)} blur-2xl`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/60 text-lg">{skill.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                </div>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">{skill.level}%</span>
              </div>
              <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-slate-700/80">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 0.7, delay: 0.08 + index * 0.04 }} viewport={{ once: true }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400" />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Proficiency</span>
                <span>{skill.level >= 90 ? "Expert" : skill.level >= 75 ? "Advanced" : "Intermediate"}</span>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="mt-14 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div>
              <div className="text-3xl font-bold text-emerald-300">{allSkills.length}</div>
              <div className="mt-1 text-sm text-slate-400">Total Skills</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-300">{averageLevel}%</div>
              <div className="mt-1 text-sm text-slate-400">Average Mastery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-300">{allSkills.filter((skill) => skill.level >= 90).length}</div>
              <div className="mt-1 text-sm text-slate-400">Expert Skills</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-300">{skillCategories.length - 1}</div>
              <div className="mt-1 text-sm text-slate-400">Skill Domains</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
