export function isCompliant(badge?: string) { return true; }
export function getComplianceLabel(badge?: string) { return badge || ''; }
export function validateCompliance(productId: string | number) { return { compliant: true, badges: [] as string[] }; }
export const complianceData: Record<string, { thc: string; origin: string; lab: string }> = {};
