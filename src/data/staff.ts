import type { StaffRecord } from "@/types";

export const staffRecords: StaffRecord[] = [
  { staffId: "STF-1001", staffName: "Sarah Ahmed", role: "Staff Nurse", ward: "Ward A", competencyId: "COMP-002", status: "Completed", completionDate: "2026-01-10", expiryDate: "2027-01-10" },
  { staffId: "STF-1001", staffName: "Sarah Ahmed", role: "Staff Nurse", ward: "Ward A", competencyId: "COMP-005", status: "Completed", completionDate: "2026-02-15", expiryDate: "2027-02-15" },
  { staffId: "STF-1001", staffName: "Sarah Ahmed", role: "Staff Nurse", ward: "Ward A", competencyId: "COMP-001", status: "Completed", completionDate: "2026-01-10", expiryDate: "2027-01-10" },
  { staffId: "STF-1001", staffName: "Sarah Ahmed", role: "Staff Nurse", ward: "Ward A", competencyId: "COMP-004", status: "In Progress", completionDate: null, expiryDate: null },
  { staffId: "STF-1002", staffName: "Daniel Smith", role: "Healthcare Support Worker (HCSW)", ward: "Ward B", competencyId: "COMP-001", status: "Completed", completionDate: "2026-03-01", expiryDate: "2027-03-01" },
  { staffId: "STF-1002", staffName: "Daniel Smith", role: "Healthcare Support Worker (HCSW)", ward: "Ward B", competencyId: "COMP-030", status: "Expired", completionDate: "2024-01-12", expiryDate: "2025-01-12" },
  { staffId: "STF-1002", staffName: "Daniel Smith", role: "Healthcare Support Worker (HCSW)", ward: "Ward B", competencyId: "COMP-002", status: "Not Started", completionDate: null, expiryDate: null },
  { staffId: "STF-1003", staffName: "Priya Patel", role: "Senior Nurse", ward: "ICU", competencyId: "COMP-031", status: "Completed", completionDate: "2026-01-20", expiryDate: "2027-01-20" },
  { staffId: "STF-1003", staffName: "Priya Patel", role: "Senior Nurse", ward: "ICU", competencyId: "COMP-034", status: "In Progress", completionDate: null, expiryDate: null },
  { staffId: "STF-1003", staffName: "Priya Patel", role: "Senior Nurse", ward: "ICU", competencyId: "COMP-035", status: "Completed", completionDate: "2026-02-01", expiryDate: "2027-02-01" },
  { staffId: "STF-1004", staffName: "James Walker", role: "Nursing Associate", ward: "Ward C", competencyId: "COMP-003", status: "Completed", completionDate: "2026-04-01", expiryDate: "2027-04-01" },
  { staffId: "STF-1004", staffName: "James Walker", role: "Nursing Associate", ward: "Ward C", competencyId: "COMP-001", status: "Completed", completionDate: "2026-03-15", expiryDate: "2027-03-15" },
  { staffId: "STF-1004", staffName: "James Walker", role: "Nursing Associate", ward: "Ward C", competencyId: "COMP-014", status: "Not Started", completionDate: null, expiryDate: null },
  { staffId: "STF-1005", staffName: "Emily Jones", role: "Community Nurse", ward: "Community", competencyId: "COMP-013", status: "Completed", completionDate: "2026-02-22", expiryDate: "2027-02-22" },
  { staffId: "STF-1005", staffName: "Emily Jones", role: "Community Nurse", ward: "Community", competencyId: "COMP-011", status: "Completed", completionDate: "2025-06-01", expiryDate: "2028-06-01" },
  { staffId: "STF-1006", staffName: "Marcus Obi", role: "ICU Nurse", ward: "ICU", competencyId: "COMP-034", status: "Completed", completionDate: "2026-01-05", expiryDate: "2027-01-05" },
  { staffId: "STF-1006", staffName: "Marcus Obi", role: "ICU Nurse", ward: "ICU", competencyId: "COMP-031", status: "Completed", completionDate: "2026-01-05", expiryDate: "2027-01-05" },
  { staffId: "STF-1006", staffName: "Marcus Obi", role: "ICU Nurse", ward: "ICU", competencyId: "COMP-035", status: "In Progress", completionDate: null, expiryDate: null },
];

export interface StaffSummary {
  staffId: string;
  staffName: string;
  role: string;
  ward: string;
  total: number;
  completed: number;
  expired: number;
  inProgress: number;
  notStarted: number;
}

export function getStaffSummaries(): StaffSummary[] {
  const map = new Map<string, StaffSummary>();
  for (const r of staffRecords) {
    if (!map.has(r.staffId)) {
      map.set(r.staffId, { staffId: r.staffId, staffName: r.staffName, role: r.role, ward: r.ward, total: 0, completed: 0, expired: 0, inProgress: 0, notStarted: 0 });
    }
    const s = map.get(r.staffId)!;
    s.total++;
    if (r.status === "Completed") s.completed++;
    else if (r.status === "Expired") s.expired++;
    else if (r.status === "In Progress") s.inProgress++;
    else s.notStarted++;
  }
  return Array.from(map.values());
}
