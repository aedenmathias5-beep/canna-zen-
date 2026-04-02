export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
  carrier: string
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'colissimo',
    name: 'Colissimo Domicile',
    description: 'Livraison à domicile avec suivi',
    price: 4.90,
    estimatedDays: '2-3 jours ouvrés',
    carrier: 'colissimo',
  },
  {
    id: 'relay',
    name: 'Mondial Relay',
    description: 'Livraison en point relais',
    price: 3.90,
    estimatedDays: '3-5 jours ouvrés',
    carrier: 'mondial_relay',
  },
  {
    id: 'chronopost',
    name: 'Chronopost Express',
    description: 'Livraison express à domicile',
    price: 9.90,
    estimatedDays: '24h',
    carrier: 'chronopost',
  },
]

// Sendcloud shipping method IDs (weight-based, for reference)
// Colissimo Home: 371 (0-250g), 366 (250-500g), 367 (500-750g), 364 (750g-1kg), 1066 (1-2kg)
// Mondial Relay Point Relais: 28035 (0-250g), 28036 (250-500g), 28037 (500g-1kg), 28038 (1-2kg)
// Chrono 18: 1345 (0-2kg), 1346 (2-5kg)

export const FREE_SHIPPING_THRESHOLD = 49

export const getShippingCost = (methodId: string, cartTotal: number): number => {
  if (cartTotal >= FREE_SHIPPING_THRESHOLD) return 0
  const method = SHIPPING_METHODS.find(m => m.id === methodId)
  return method?.price || 0
}
