import axios, { AxiosError, AxiosInstance } from 'axios'

export interface WhatsAppMessage {
  number: string
  message: string
  instanceName?: string
  delay?: number
  linkPreview?: boolean
}

export interface WhatsAppResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  status?: number
}

type SendTextBody = {
  number: string
  text: string
  delay?: number
  linkPreview?: boolean
  // campos opcionais suportados no v2:
  mentionsEveryOne?: boolean
  mentioned?: string[]
  quoted?: {
    key?: { id?: string; remoteJid?: string; fromMe?: boolean; participant?: string }
    message?: Record<string, unknown>
  }
}

export class WhatsAppService {
  private api: AxiosInstance
  private instanceName: string

  constructor(opts?: { baseURL?: string; apiKey?: string; instanceName?: string; timeoutMs?: number }) {
    const baseURL =  'https://wsapi.dev.datainsiderai.com'
    const apiKey ='2CD91A9FA6FB-4C2D-856C-79DAD81E8DDD'
    this.instanceName =  'Teste Teste Teste'

    this.api = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json', apikey: apiKey },
      timeout: opts?.timeoutMs ?? 30_000,
    })
  }

  /**
   * Envia uma mensagem de texto (Evolution API v2: POST /message/sendText/{instance})
   * Docs: Send Plain Text.
   */
  async sendTextMessage(params: WhatsAppMessage): Promise<WhatsAppResponse> {
    const { instanceName, number, message, delay, linkPreview } = params
    const instance = encodeURIComponent(instanceName || this.instanceName)
    const payload: SendTextBody = {
      number: WhatsAppService.formatBrazilianNumber(number),
      text: message,
      ...(delay ? { delay } : {}),
      ...(typeof linkPreview === 'boolean' ? { linkPreview } : {}),
    }

    // pequeno retry para 5xx/timeout
    const attempt = async () =>
      this.api.post(`/message/sendText/${instance}`, payload)

    try {
      let res
      console.log('res', res)
      try {
        res = await attempt()
      } catch (err) {
        const ax = err as AxiosError
        if (ax.response?.status && ax.response.status >= 500) {
          await new Promise(r => setTimeout(r, 400))
          res = await attempt()
        } else throw err
      }
      return { success: true, data: res.data, status: res.status }
    } catch (err) {
      const ax = err as AxiosError<any>
      return {
        success: false,
        error:
          ax.response?.data?.message ??
          (typeof ax.response?.data === 'string' ? ax.response.data : ax.message),
        status: ax.response?.status,
      }
    }
  }

  /**
   * Verifica estado da instância (GET /instance/connectionState/{instance})
   */
  async checkInstanceStatus(instanceName?: string): Promise<WhatsAppResponse> {
    const instance = encodeURIComponent(instanceName || this.instanceName)
    try {
      const res = await this.api.get(`/instance/connectionState/${instance}`)
      return { success: true, data: res.data, status: res.status }
    } catch (err) {
      const ax = err as AxiosError<any>
      return {
        success: false,
        error:
          ax.response?.data?.message ??
          (typeof ax.response?.data === 'string' ? ax.response.data : ax.message),
        status: ax.response?.status,
      }
    }
  }

  /**
   * Notificação: Nova BM
   */
  async sendNewBMNotification(
    numbers: string[],
    bmData: { id: string; name: string; price: number; location: string; description?: string },
  ): Promise<WhatsAppResponse[]> {
    const message = `${bmData.name}\n\n${bmData.description || 'Nova BM disponível para venda.'}`
    const results: WhatsAppResponse[] = []
    for (const number of numbers) {
      results.push(await this.sendTextMessage({ number, message }))
      await new Promise(r => setTimeout(r, 1000))
    }
    return results
  }

  /**
   * Notificação: BM vendida
   */
  async sendSoldBMNotification(
    numbers: string[],
    bmData: { id: string; name: string; price: number; buyerInfo?: string; bmNumber?: string },
  ): Promise<WhatsAppResponse[]> {
    const bmNumber = bmData.bmNumber || bmData.id.slice(-3).padStart(3, '0')
    const message = `BM #${bmNumber} VENDIDA 🧙🏻‍♂️✅`
    const results: WhatsAppResponse[] = []
    for (const number of numbers) {
      results.push(await this.sendTextMessage({ number, message }))
      await new Promise(r => setTimeout(r, 1000))
    }
    return results
  }

  /**
   * Formata número para padrão aceito (idempotente)
   */
  static formatBrazilianNumber(number: string): string {
    const n = number.replace(/\D/g, '')
    if (n.startsWith('55')) return n
    if (n.length === 11 && n.startsWith('9')) return `55${n}`
    if (n.length === 10) return `55${n.slice(0, 2)}9${n.slice(2)}`
    if (n.length === 9) return `5511${n}`
    return n
  }
}

export const whatsappService = new WhatsAppService()
