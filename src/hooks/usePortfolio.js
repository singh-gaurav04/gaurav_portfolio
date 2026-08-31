import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../api/public";

const empty = {
  profile: null,
  skills: [],
  projects: [],
  real_projects: [],
  featured_projects: [],
  experiences: [],
  certifications: [],
  testimonials: [],
  services: [],
  faqs: [],
  stats: {},
};

export function usePortfolio() {
  const query = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
  });

  return {
    ...query,
    data: query.data || empty,
  };
}
