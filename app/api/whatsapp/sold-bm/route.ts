import { NextRequest, NextResponse } from 'next/server';
import { whatsappServiceSDK, WhatsAppServiceSDK } from '@/lib/whatsapp-service-sdk';
import { z } from 'zod';

// Schema de validação para BM vendida
const soldBMSchema = z.object({
  bmId: z.string().min(1, 'ID da BM é obrigatório'),
  name: z.string().min(1, 'Nome da BM é obrigatório'),
  price: z.number().positive('Preço deve ser positivo'),
  buyerInfo: z.string().optional(),
  bmNumber: z.string().optional(),
  recipients: z.array(z.string().min(1, 'Número de telefone inválido')).min(1, 'Pelo menos um destinatário é obrigatório'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados de entrada
    const validatedData = soldBMSchema.parse(body);
    
    const { bmId, name, price, buyerInfo, bmNumber, recipients } = validatedData;
    
    // Formatar números de telefone
    const formattedNumbers = recipients.map(number => 
      WhatsAppServiceSDK.formatBrazilianNumber(number)
    );
    
    // Verificar status da instância antes de enviar
    const instanceStatus = await whatsappServiceSDK.checkInstanceStatus();
    if (!instanceStatus.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Instância WhatsApp não está conectada',
          details: instanceStatus.error 
        },
        { status: 503 }
      );
    }
    
    // Enviar notificações
    const results = await whatsappServiceSDK.sendSoldBMNotification(
      formattedNumbers,
      {
        id: bmId,
        name,
        price,
        buyerInfo,
        bmNumber,
      }
    );
    
    // Verificar resultados
    const successCount = results.filter(result => result.success).length;
    const failureCount = results.length - successCount;
    
    const response = {
      success: successCount > 0,
      totalSent: successCount,
      totalFailed: failureCount,
      results: results.map((result, index) => ({
        number: formattedNumbers[index],
        success: result.success,
        error: result.error || null,
      })),
    };
    
    if (failureCount > 0 && successCount === 0) {
      return NextResponse.json(response, { status: 500 });
    }
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error('Erro na rota de BM vendida:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dados inválidos',
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}

// Método GET para testar a conexão
export async function GET() {
  try {
    const status = await whatsappServiceSDK.checkInstanceStatus();
    
    return NextResponse.json({
      success: true,
      whatsappStatus: status,
      message: 'Rota de BM vendida funcionando com SDK',
    });
    
  } catch (error) {
    console.error('Erro ao verificar status:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao verificar status da instância WhatsApp' 
      },
      { status: 500 }
    );
  }
}
