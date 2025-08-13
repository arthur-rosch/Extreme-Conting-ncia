import { NextRequest, NextResponse } from 'next/server';
import { whatsappServiceSDK } from '@/lib/whatsapp-service-sdk';

export async function GET() {
  try {
    console.log('🔍 Testando conexão com Evolution API...');
    
    // Verificar variáveis de ambiente
    const envVars = {
      EVOLUTION_API_URL: process.env.EVOLUTION_API_URL,
      EVOLUTION_API_KEY: process.env.EVOLUTION_API_KEY ? '***configurado***' : 'não configurado',
      EVOLUTION_INSTANCE_NAME: process.env.EVOLUTION_INSTANCE_NAME,
    };
    
    console.log('📋 Variáveis de ambiente:', envVars);
    
    // Testar conexão completa usando SDK
    const connectionTest = await whatsappServiceSDK.testConnection();
    console.log('🔌 Teste de conexão:', connectionTest);
    
    return NextResponse.json({
      success: true,
      message: 'Rota de teste funcionando com SDK oficial',
      environment: envVars,
      connectionTest: connectionTest,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error: any) {
    console.error('❌ Erro no teste:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message = 'Teste de mensagem WhatsApp! 🚀' } = body;
    
    console.log('📤 Enviando mensagem de teste:', message);
    
    // Enviar mensagem de teste para o número configurado
    const result = await whatsappServiceSDK.sendTextMessage({
      number: '47984473369', // Número de teste
      message,
    });
    
    console.log('📋 Resultado:', result);
    
    return NextResponse.json({
      success: result.success,
      message: 'Teste de envio de mensagem',
      result: result,
      sentTo: '47984473369',
      timestamp: new Date().toISOString(),
    });
    
  } catch (error: any) {
    console.error('❌ Erro no envio de teste:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
