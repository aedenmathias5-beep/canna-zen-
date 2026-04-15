// Stub for supabaseDb functions
export async function addToWishlist(userId: string, productId: string) {}
export async function removeFromWishlist(userId: string, productId: string) {}
export async function getWishlist(userId: string): Promise<string[]> { return []; }
export async function getOrders(userId: string) { return []; }
export async function createOrder(userId: string, data: any) { return null; }
