export type Category =
  | "Clinical Skills"
  | "Patient Safety"
  | "Medicines Management"
  | "Infection Prevention & Control"
  | "Communication"
  | "Digital & Documentation"
  | "Emergency Response"
  | "Safeguarding"
  | "Leadership & Professional Practice";

export type AssessmentMethod =
  | "Observation"
  | "Practical Assessment"
  | "Scenario Assessment"
  | "Drug Round Observation"
  | "Observation & Quiz"
  | "E-Learning & Quiz"
  | "E-Learning"
  | "Documentation Review"
  | "System Assessment"
  | "Audit"
  | "Reflective Discussion"
  | "Case Review"
  | "Manager Review"
  | "Supervised Practice"
  | "Simulation"
  | "E-Learning & Drill";

export type RenewalPeriod = "Annual" | "Every 2 Years" | "Every 3 Years";

export type NursingRole =
  | "Healthcare Support Worker (HCSW)"
  | "Nursing Associate"
  | "Staff Nurse"
  | "Senior Nurse"
  | "Community Nurse"
  | "ICU Nurse";

export type CompetencyStatus = "Completed" | "Expired" | "In Progress" | "Not Started";

export interface Competency {
  id: string;
  name: string;
  category: Category;
  band: string;
  description: string;
  assessmentMethod: AssessmentMethod;
  renewalPeriod: RenewalPeriod;
  mandatory: boolean;
}

export interface StaffRecord {
  staffId: string;
  staffName: string;
  role: NursingRole;
  ward: string;
  competencyId: string;
  status: CompetencyStatus;
  completionDate: string | null;
  expiryDate: string | null;
}

export interface LearningPathway {
  id: string;
  name: string;
  targetRole: string;
  competencyIds: string[];
}

export interface RoleMapping {
  role: NursingRole;
  bands: string;
  description: string;
  mandatoryCount: number;
}
