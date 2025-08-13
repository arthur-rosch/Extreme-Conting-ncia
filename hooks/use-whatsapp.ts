import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getNewBMNotificationContacts, getSoldBMNotificationContacts } from '@/lib/whatsapp-config';

export interface WhatsAppNotificationData {
  bmId: string;
  name: string;
  price: number;
  location?: string;
  description?: string;
  buyerInfo?: string;
  bmNumber?: string;
}

// Os contatos são obtidos da configuração centralizada

export function useWhatsApp() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendNewBMNotification = async (
    data: WhatsAppNotificationData,
    recipients?: string[]
  ) => {
    const finalRecipients = recipients || getNewBMNotificationContacts();
    if (finalRecipients.length === 0) {
      toast({
        title: 'Erro',
        description: 'Nenhum contato configurado para receber notificações',
        variant: 'destructive',
      });
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/whatsapp/new-bm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bmId: data.bmId,
          name: data.name,
          price: data.price,
          location: data.location || 'Não informado',
          description: data.description,
          recipients: finalRecipients,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: '✅ Mensagens enviadas!',
          description: `${result.totalSent} mensagens enviadas com sucesso${
            result.totalFailed > 0 ? `, ${result.totalFailed} falharam` : ''
          }`,
        });
        return true;
      } else {
        toast({
          title: 'Erro ao enviar mensagens',
          description: result.error || 'Erro desconhecido',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Erro ao enviar notificação WhatsApp:', error);
      toast({
        title: 'Erro',
        description: 'Falha na comunicação com o servidor',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendSoldBMNotification = async (
    data: WhatsAppNotificationData,
    recipients?: string[]
  ) => {
    const finalRecipients = recipients || getSoldBMNotificationContacts();
    if (finalRecipients.length === 0) {
      toast({
        title: 'Erro',
        description: 'Nenhum contato configurado para receber notificações',
        variant: 'destructive',
      });
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/whatsapp/sold-bm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bmId: data.bmId,
          name: data.name,
          price: data.price,
          buyerInfo: data.buyerInfo,
          bmNumber: data.bmNumber,
          recipients: finalRecipients,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: '✅ Mensagens enviadas!',
          description: `${result.totalSent} mensagens enviadas com sucesso${
            result.totalFailed > 0 ? `, ${result.totalFailed} falharam` : ''
          }`,
        });
        return true;
      } else {
        toast({
          title: 'Erro ao enviar mensagens',
          description: result.error || 'Erro desconhecido',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Erro ao enviar notificação WhatsApp:', error);
      toast({
        title: 'Erro',
        description: 'Falha na comunicação com o servidor',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkWhatsAppStatus = async () => {
    try {
      const response = await fetch('/api/whatsapp/new-bm', {
        method: 'GET',
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao verificar status WhatsApp:', error);
      return null;
    }
  };

  return {
    sendNewBMNotification,
    sendSoldBMNotification,
    checkWhatsAppStatus,
    isLoading,
  };
}
