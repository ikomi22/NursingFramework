import type { LearningPathway } from "@/types";

export const pathways: LearningPathway[] = [
  {
    id: "PATH-001",
    name: "Newly Qualified Nurse Pathway",
    targetRole: "Staff Nurse",
    competencyIds: ["COMP-001", "COMP-002", "COMP-003", "COMP-005", "COMP-004", "COMP-011", "COMP-012", "COMP-030", "COMP-020", "COMP-022"],
  },
  {
    id: "PATH-002",
    name: "HCA Induction Pathway",
    targetRole: "Healthcare Support Worker (HCSW)",
    competencyIds: ["COMP-001", "COMP-002", "COMP-003", "COMP-014", "COMP-030", "COMP-033", "COMP-015", "COMP-020"],
  },
  {
    id: "PATH-003",
    name: "ICU Nurse Advanced Skills Pathway",
    targetRole: "ICU Nurse",
    competencyIds: ["COMP-031", "COMP-034", "COMP-013", "COMP-035", "COMP-023", "COMP-040", "COMP-006"],
  },
];
