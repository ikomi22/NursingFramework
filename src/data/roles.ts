import type { RoleMapping } from "@/types";

export const roleMappings: RoleMapping[] = [
  { role: "Healthcare Support Worker (HCSW)", bands: "Band 2–3", description: "Provides direct patient care under qualified nurse supervision.", mandatoryCount: 15 },
  { role: "Nursing Associate", bands: "Band 4", description: "Bridges the gap between HCSWs and registered nurses.", mandatoryCount: 18 },
  { role: "Staff Nurse", bands: "Band 5", description: "Registered nurse delivering clinical care and leading shifts.", mandatoryCount: 22 },
  { role: "Senior Nurse", bands: "Band 6–7", description: "Senior clinical practitioner with leadership responsibilities.", mandatoryCount: 24 },
  { role: "Community Nurse", bands: "Band 5–6", description: "Provides nursing care in community and home settings.", mandatoryCount: 20 },
  { role: "ICU Nurse", bands: "Band 5–7", description: "Specialist nurse in intensive / critical care environments.", mandatoryCount: 26 },
];
