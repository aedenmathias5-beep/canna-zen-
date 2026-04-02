export interface OvriPaymentParams {
  orderId: string
  amount: number
  currency: string
  customerEmail: string
  customerFirstName: string
  customerLastName: string
  returnUrl: string
  cancelUrl: string
  notifyUrl: string
}

export interface OvriPaymentResponse {
  success: boolean
  paymentUrl?: string
  transactionId?: string
  error?: string
}

export const createOvriPayment = async (
  params: OvriPaymentParams
): Promise<OvriPaymentResponse> => {
  const OVRI_API_KEY = import.meta.env.VITE_OVRI_API_KEY
  const OVRI_MERCHANT_ID = import.meta.env.VITE_OVRI_MERCHANT_ID
  const OVRI_BASE_URL = import.meta.env.VITE_OVRI_BASE_URL

  if (!OVRI_API_KEY || OVRI_API_KEY === 'your_ovri_api_key_here') {
    return {
      success: false,
      error: 'OVRI_NOT_CONFIGURED'
    }
  }

  try {
    const response = await fetch(`${OVRI_BASE_URL}/v1/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': OVRI_API_KEY,
        'X-Merchant-Id': OVRI_MERCHANT_ID
      },
      body: JSON.stringify({
        reference: params.orderId,
        amount: Math.round(params.amount * 100),
        currency: params.currency || 'EUR',
        customer: {
          email: params.customerEmail,
          firstName: params.customerFirstName,
          lastName: params.customerLastName
        },
        urls: {
          return: params.returnUrl,
          cancel: params.cancelUrl,
          notify: params.notifyUrl
        },
        metadata: {
          orderId: params.orderId,
          source: 'CannaZen'
        }
      })
    })

    const data = await response.json()

    if (data.paymentUrl || data.payment_url || data.url) {
      return {
        success: true,
        paymentUrl: data.paymentUrl || data.payment_url || data.url,
        transactionId: data.transactionId || data.transaction_id || data.id
      }
    }

    return {
      success: false,
      error: data.message || data.error || 'Erreur OVRI inconnue'
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Erreur réseau'
    }
  }
}
