import portfolio from "../data/portfolio.json";

const result = {
  data: portfolio,
  isLoading: false,
  isError: false,
  error: null,
  refetch: () => Promise.resolve({ data: portfolio }),
};

export function usePortfolio() {
  return result;
}

export function findProjectBySlug(slug) {
  if (!slug) return null;
  return (
    (portfolio.real_projects || []).find((p) => p.slug === slug) ||
    (portfolio.projects || []).find((p) => p.slug === slug) ||
    null
  );
}