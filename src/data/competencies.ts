import type { Competency } from "@/types";

export const competencies: Competency[] = [
  { id: "COMP-001", name: "Hand Hygiene Compliance", category: "Infection Prevention & Control", band: "Band 2–8", description: "Demonstrates correct hand hygiene technique in accordance with IPC guidelines.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-002", name: "Basic Life Support (BLS)", category: "Emergency Response", band: "Band 2–8", description: "Performs adult basic life support and uses AED safely.", assessmentMethod: "Practical Assessment", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-003", name: "Vital Signs Monitoring", category: "Clinical Skills", band: "Band 2–5", description: "Accurately records temperature, pulse, respirations, blood pressure, and oxygen saturation.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-004", name: "NEWS2 Escalation", category: "Patient Safety", band: "Band 3–7", description: "Identifies deterioration using NEWS2 and escalates appropriately.", assessmentMethod: "Scenario Assessment", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-005", name: "Medication Administration", category: "Medicines Management", band: "Band 5–8", description: "Safely administers oral, topical, and subcutaneous medications.", assessmentMethod: "Drug Round Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-006", name: "Controlled Drugs Handling", category: "Medicines Management", band: "Band 5–8", description: "Follows policy for storage, checking, and administration of controlled drugs.", assessmentMethod: "Observation & Quiz", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-007", name: "Venepuncture", category: "Clinical Skills", band: "Band 3–6", description: "Performs venepuncture using aseptic technique.", assessmentMethod: "Practical Assessment", renewalPeriod: "Every 2 Years", mandatory: false },
  { id: "COMP-008", name: "Cannulation", category: "Clinical Skills", band: "Band 5–7", description: "Inserts peripheral cannulas safely and effectively.", assessmentMethod: "Practical Assessment", renewalPeriod: "Every 2 Years", mandatory: false },
  { id: "COMP-009", name: "Catheter Care", category: "Clinical Skills", band: "Band 2–6", description: "Provides urinary catheter care and identifies signs of infection.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-010", name: "Wound Assessment & Dressing", category: "Clinical Skills", band: "Band 3–7", description: "Assesses and dresses wounds using approved procedures.", assessmentMethod: "Practical Assessment", renewalPeriod: "Annual", mandatory: false },
  { id: "COMP-011", name: "Safeguarding Adults Level 2", category: "Safeguarding", band: "Band 2–8", description: "Recognises and reports safeguarding concerns involving adults.", assessmentMethod: "E-Learning & Quiz", renewalPeriod: "Every 3 Years", mandatory: true },
  { id: "COMP-012", name: "Safeguarding Children Level 2", category: "Safeguarding", band: "Band 2–8", description: "Recognises and escalates safeguarding concerns involving children.", assessmentMethod: "E-Learning & Quiz", renewalPeriod: "Every 3 Years", mandatory: true },
  { id: "COMP-013", name: "Sepsis Recognition", category: "Patient Safety", band: "Band 3–8", description: "Identifies signs of sepsis and initiates escalation pathway.", assessmentMethod: "Scenario Assessment", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-014", name: "Infection Control PPE Usage", category: "Infection Prevention & Control", band: "Band 2–8", description: "Demonstrates correct donning and doffing of PPE.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-015", name: "Pressure Ulcer Prevention", category: "Patient Safety", band: "Band 2–7", description: "Completes skin assessments and implements pressure ulcer prevention measures.", assessmentMethod: "Documentation Review", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-016", name: "Fluid Balance Monitoring", category: "Clinical Skills", band: "Band 2–5", description: "Accurately completes fluid balance charts and escalates concerns.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-017", name: "Blood Glucose Monitoring", category: "Clinical Skills", band: "Band 2–6", description: "Performs capillary blood glucose testing safely.", assessmentMethod: "Practical Assessment", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-018", name: "Nasogastric Tube Care", category: "Clinical Skills", band: "Band 5–7", description: "Verifies placement and manages NG feeding safely.", assessmentMethod: "Practical Assessment", renewalPeriod: "Every 2 Years", mandatory: false },
  { id: "COMP-019", name: "Mental Capacity Assessment Awareness", category: "Safeguarding", band: "Band 3–8", description: "Understands MCA principles and consent requirements.", assessmentMethod: "E-Learning", renewalPeriod: "Every 3 Years", mandatory: true },
  { id: "COMP-020", name: "Documentation Standards", category: "Digital & Documentation", band: "Band 2–8", description: "Completes accurate and timely patient documentation.", assessmentMethod: "Audit", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-021", name: "Electronic Patient Record Usage", category: "Digital & Documentation", band: "Band 2–8", description: "Uses EPR systems correctly for patient care documentation.", assessmentMethod: "System Assessment", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-022", name: "Incident Reporting (Datix)", category: "Patient Safety", band: "Band 2–8", description: "Reports incidents and near misses using Datix.", assessmentMethod: "Scenario Assessment", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-023", name: "Oxygen Therapy Administration", category: "Clinical Skills", band: "Band 3–7", description: "Administers oxygen safely according to prescription and protocol.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-024", name: "Blood Transfusion Awareness", category: "Clinical Skills", band: "Band 4–8", description: "Understands blood transfusion safety checks and escalation.", assessmentMethod: "E-Learning & Quiz", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-025", name: "Dysphagia & Swallow Screening", category: "Clinical Skills", band: "Band 4–7", description: "Identifies swallowing difficulties and escalates appropriately.", assessmentMethod: "Observation", renewalPeriod: "Every 2 Years", mandatory: false },
  { id: "COMP-026", name: "End of Life Care Communication", category: "Communication", band: "Band 3–8", description: "Communicates compassionately with patients and relatives during end-of-life care.", assessmentMethod: "Reflective Discussion", renewalPeriod: "Every 2 Years", mandatory: false },
  { id: "COMP-027", name: "Conflict Resolution", category: "Communication", band: "Band 2–8", description: "Uses de-escalation techniques during challenging interactions.", assessmentMethod: "Scenario Assessment", renewalPeriod: "Every 3 Years", mandatory: true },
  { id: "COMP-028", name: "Equality, Diversity & Inclusion", category: "Leadership & Professional Practice", band: "Band 2–8", description: "Demonstrates inclusive practice and understanding of EDI principles.", assessmentMethod: "E-Learning", renewalPeriod: "Every 3 Years", mandatory: true },
  { id: "COMP-029", name: "Fire Safety Awareness", category: "Patient Safety", band: "Band 2–8", description: "Responds appropriately during fire incidents and evacuations.", assessmentMethod: "E-Learning & Drill", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-030", name: "Moving & Handling", category: "Clinical Skills", band: "Band 2–8", description: "Demonstrates safe patient moving and handling techniques.", assessmentMethod: "Practical Assessment", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-031", name: "IV Medication Administration", category: "Medicines Management", band: "Band 5–8", description: "Administers intravenous medications safely according to policy.", assessmentMethod: "Supervised Practice", renewalPeriod: "Annual", mandatory: false },
  { id: "COMP-032", name: "Pain Assessment", category: "Clinical Skills", band: "Band 2–7", description: "Uses validated pain assessment tools appropriately.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-033", name: "Dementia Awareness", category: "Communication", band: "Band 2–8", description: "Provides person-centred care for patients with dementia.", assessmentMethod: "E-Learning", renewalPeriod: "Every 3 Years", mandatory: true },
  { id: "COMP-034", name: "Tracheostomy Care", category: "Clinical Skills", band: "Band 5–8", description: "Performs routine tracheostomy care and emergency response.", assessmentMethod: "Practical Assessment", renewalPeriod: "Annual", mandatory: false },
  { id: "COMP-035", name: "CPR Team Response", category: "Emergency Response", band: "Band 5–8", description: "Participates effectively in cardiac arrest response teams.", assessmentMethod: "Simulation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-036", name: "Clinical Supervision Participation", category: "Leadership & Professional Practice", band: "Band 5–8", description: "Engages in reflective clinical supervision sessions.", assessmentMethod: "Manager Review", renewalPeriod: "Annual", mandatory: false },
  { id: "COMP-037", name: "Patient Discharge Planning", category: "Communication", band: "Band 3–7", description: "Coordinates safe discharge planning with MDT and carers.", assessmentMethod: "Case Review", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-038", name: "Consent & Confidentiality", category: "Leadership & Professional Practice", band: "Band 2–8", description: "Applies confidentiality and informed consent principles.", assessmentMethod: "E-Learning", renewalPeriod: "Every 2 Years", mandatory: true },
  { id: "COMP-039", name: "Aseptic Non-Touch Technique (ANTT)", category: "Infection Prevention & Control", band: "Band 3–8", description: "Maintains aseptic technique during clinical procedures.", assessmentMethod: "Observation", renewalPeriod: "Annual", mandatory: true },
  { id: "COMP-040", name: "Escalation of Deteriorating Patient", category: "Patient Safety", band: "Band 2–8", description: "Recognises deterioration and follows escalation procedures promptly.", assessmentMethod: "Simulation", renewalPeriod: "Annual", mandatory: true },
];

export const categories = [
  "Clinical Skills",
  "Patient Safety",
  "Medicines Management",
  "Infection Prevention & Control",
  "Communication",
  "Digital & Documentation",
  "Emergency Response",
  "Safeguarding",
  "Leadership & Professional Practice",
] as const;

export function getCompetencyById(id: string): Competency | undefined {
  return competencies.find((c) => c.id === id);
}

export function getCompetenciesByCategory(category: string): Competency[] {
  return competencies.filter((c) => c.category === category);
}
