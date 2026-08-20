import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import TechOrbit from "./TechOrbit";
import { SkillsSkeleton } from "./Skeleton";

function formatCategory(category) {
  return String(category || "Other").replaceAll("_", " ");
}

export default function Skills() {
  const { data, isLoading } = usePortfolio();
  const skills = data.skills || [];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const skillCategories = useMemo(() => {
    const map = new Map();
    skills.forEach((skill) => {
      const key = formatCategory(skill.category);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(skill.name);
    });

    return Array.from(map.entries())
      .map(([category, items]) => ({
        category,
        items: [...new Set(items)].sort((a, b) => a.localeCompare(b)),
      }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }, [skills]);

  const categories = useMemo(() => ["all", ...skillCategories.map((g) => g.category)], [skillCategories]);

  const displayedSkillCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter((g) => g.category === selectedCategory);

  return (
    <section
      id="skills"
      className="border-t px-4 py-12"
      style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)" }}
    >
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="editorial-label">AI STACK</p>
          <h2 className="text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
            The ecosystem I build with
          </h2>
          <p className="text-lg leading-7" style={{ color: "var(--lsw-text-muted)" }}>
            Languages, frameworks, and AI tooling that power real shipped work — not vanity percentages.
          </p>
        </div>

        {!isLoading && skillCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full border px-4 py-2 text-sm font-semibold transition"
                style={
                  category === selectedCategory
                    ? {
                        borderColor: "var(--lsw-warning)",
                        background: "color-mix(in srgb, var(--lsw-warning) 16%, var(--lsw-white))",
                        color: "var(--lsw-warning)",
                      }
                    : {
                        borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                        background: "var(--lsw-white)",
                        color: "var(--lsw-text-muted)",
                      }
                }
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        )}

        <div>
          {isLoading ? (
            <SkillsSkeleton />
          ) : !displayedSkillCategories.length ? (
            <div
              className="rounded-3xl border border-dashed px-6 py-12 text-center text-sm"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 20%, transparent)",
                color: "var(--lsw-text-muted)",
                background: "var(--lsw-surface)",
              }}
            >
              {skills.length ? "No skills in this category yet." : "Skills will appear here once published."}
            </div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <TechOrbit skillCategories={displayedSkillCategories} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
