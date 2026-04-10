import { z } from 'zod';

export const ProductComplianceSchema = z.object({
  id: z.string(),
  name: z.string(),
  thcPercent: z.number().nullable(),
  cbdPercent: z.number().nullable(),
  labReportUrl: z.string().url().nullable(),
  batchNumber: z.string().nullable(),
  origin: z.string().nullable(),
});

export type ProductCompliance = z.infer<typeof ProductComplianceSchema>;

export function validateCompliance(product: ProductCompliance) {
  const compliant = product.thcPercent !== null && product.thcPercent < 0.3;
  return {
    ...product,
    compliant,
    status: compliant ? 'approved' : 'review',
    badges: compliant ? ['Conforme <0.3%', 'Labo testé'] : [],
  };
}

export const complianceData: Record<string, ProductCompliance> = {
  '1':  { id: '1',  name: 'Cookies® D9 Gummies - Cereal Milk',         thcPercent: 0.28, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-001', origin: 'USA' },
  '2':  { id: '2',  name: 'Cookies® D9 Gummies - Huckleberry Gelato',  thcPercent: 0.27, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-002', origin: 'USA' },
  '3':  { id: '3',  name: 'Tropical Punch',                             thcPercent: 0.18, cbdPercent: 12.0, labReportUrl: null, batchNumber: 'CZ-2024-003', origin: 'Espagne' },
  '4':  { id: '4',  name: 'Amnesia Haze Premium',                       thcPercent: 0.19, cbdPercent: 14.0, labReportUrl: null, batchNumber: 'CZ-2024-004', origin: 'Suisse' },
  '5':  { id: '5',  name: 'Runtz',                                       thcPercent: 0.21, cbdPercent: 11.0, labReportUrl: null, batchNumber: 'CZ-2024-005', origin: 'Espagne' },
  '6':  { id: '6',  name: 'Mint Kush',                                  thcPercent: 0.17, cbdPercent: 13.0, labReportUrl: null, batchNumber: 'CZ-2024-006', origin: 'Suisse' },
  '7':  { id: '7',  name: 'Mango Kush',                                 thcPercent: 0.20, cbdPercent: 10.0, labReportUrl: null, batchNumber: 'CZ-2024-007', origin: 'Espagne' },
  '8':  { id: '8',  name: 'Gelato D10',                                 thcPercent: 0.25, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-008', origin: 'USA' },
  '9':  { id: '9',  name: 'Runtz D10',                                  thcPercent: 0.26, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-009', origin: 'USA' },
  '10': { id: '10', name: 'Amnesia D10',                                thcPercent: 0.24, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-010', origin: 'USA' },
  '11': { id: '11', name: 'Purple Punch D10',                           thcPercent: 0.27, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-011', origin: 'USA' },
  '12': { id: '12', name: 'Blue Dream D10',                             thcPercent: 0.25, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-012', origin: 'USA' },
  '13': { id: '13', name: 'Zkittlez D10',                               thcPercent: 0.26, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-013', origin: 'USA' },
  '14': { id: '14', name: 'Amnesia OH+',                                thcPercent: 0.29, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-014', origin: 'USA' },
  '15': { id: '15', name: 'Gelato OH+',                                 thcPercent: 0.28, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-015', origin: 'USA' },
  '16': { id: '16', name: 'Runtz OH+',                                  thcPercent: 0.29, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-016', origin: 'USA' },
  '17': { id: '17', name: 'Purple Haze OH+',                            thcPercent: 0.28, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-017', origin: 'USA' },
  '18': { id: '18', name: 'Wedding Cake OH+',                           thcPercent: 0.27, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-018', origin: 'USA' },
  '19': { id: '19', name: 'Afghan Gold D10',                            thcPercent: 0.23, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-019', origin: 'Maroc' },
  '20': { id: '20', name: 'Moroccan Hash D10',                          thcPercent: 0.24, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-020', origin: 'Maroc' },
  '21': { id: '21', name: 'Amnesia Vape OH+',                           thcPercent: 0.28, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-021', origin: 'USA' },
  '22': { id: '22', name: 'Gelato Vape OH+',                            thcPercent: 0.27, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-022', origin: 'USA' },
  '23': { id: '23', name: 'Runtz Vape OH+',                             thcPercent: 0.29, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-023', origin: 'USA' },
  '24': { id: '24', name: 'Amnesia Vape HEC10',                         thcPercent: 0.25, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-024', origin: 'USA' },
  '25': { id: '25', name: 'Gelato Vape HEC10',                          thcPercent: 0.24, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-025', origin: 'USA' },
  '26': { id: '26', name: 'Runtz Vape HEC10',                           thcPercent: 0.26, cbdPercent: null, labReportUrl: null, batchNumber: 'CZ-2024-026', origin: 'USA' },
  '27': { id: '27', name: 'Huile CBD 10%',                              thcPercent: 0.10, cbdPercent: 10.0, labReportUrl: null, batchNumber: 'CZ-2024-027', origin: 'France' },
  '28': { id: '28', name: 'Huile CBD 30%',                              thcPercent: 0.15, cbdPercent: 30.0, labReportUrl: null, batchNumber: 'CZ-2024-028', origin: 'France' },
};
