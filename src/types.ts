export interface Task {
  /** 1-based position in the drill list. */
  id: number;
  /** URL-safe identifier used in `/task/:slug`. */
  slug: string;
  title: string;
  description: string;
  /** 1 = warm-up, 2 = rust-check, 3 = senior-bar. */
  difficulty: 1 | 2 | 3;
  category: string;
  /** Marks the capstone drill. */
  seed: boolean;
  /** ISO date the drill was added. */
  dateAdded: string;
  /** Optional company that's known to ask this. */
  company: string | null;
}
