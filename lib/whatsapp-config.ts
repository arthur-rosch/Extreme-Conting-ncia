/**
 * Configuração de contatos para notificações WhatsApp
 * 
 * Você pode modificar esta lista ou criar uma interface de administração
 * para gerenciar os contatos dinamicamente.
 */

export interface WhatsAppContact {
  name: string;
  number: string;
  active: boolean;
  notifications: {
    newBM: boolean;
    soldBM: boolean;
  };
}

// Lista padrão de contatos que receberão notificações
export const DEFAULT_WHATSAPP_CONTACTS: WhatsAppContact[] = [
  {
    name: 'Teste',
    number: '47984473369', // Número de teste
    active: true,
    notifications: {
      newBM: true,
      soldBM: true,
    },
  },
  // Adicione mais contatos conforme necessário
];

/**
 * Obtém os contatos ativos que devem receber notificações de nova BM
 */
export function getNewBMNotificationContacts(): string[] {
  return DEFAULT_WHATSAPP_CONTACTS
    .filter(contact => contact.active && contact.notifications.newBM)
    .map(contact => contact.number);
}

/**
 * Obtém os contatos ativos que devem receber notificações de BM vendida
 */
export function getSoldBMNotificationContacts(): string[] {
  return DEFAULT_WHATSAPP_CONTACTS
    .filter(contact => contact.active && contact.notifications.soldBM)
    .map(contact => contact.number);
}

/**
 * Obtém todos os contatos ativos
 */
export function getAllActiveContacts(): WhatsAppContact[] {
  return DEFAULT_WHATSAPP_CONTACTS.filter(contact => contact.active);
}

/**
 * Adiciona um novo contato (para uso futuro em interface de admin)
 */
export function addContact(contact: Omit<WhatsAppContact, 'active'>): WhatsAppContact {
  return {
    ...contact,
    active: true,
  };
}

/**
 * Remove/desativa um contato
 */
export function deactivateContact(number: string): WhatsAppContact[] {
  return DEFAULT_WHATSAPP_CONTACTS.map(contact =>
    contact.number === number
      ? { ...contact, active: false }
      : contact
  );
}

/**
 * Valida formato de número brasileiro
 */
export function isValidBrazilianNumber(number: string): boolean {
  const cleanNumber = number.replace(/\D/g, '');
  
  // Formato: 5511999999999 (13 dígitos) ou 11999999999 (11 dígitos)
  if (cleanNumber.length === 13 && cleanNumber.startsWith('55')) {
    return true;
  }
  
  if (cleanNumber.length === 11) {
    return true;
  }
  
  return false;
}

