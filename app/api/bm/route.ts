import { NextResponse } from 'next/server';
import { readBM, writeBM } from '@/lib/jsondb';
import { BMAccountSchema } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const accounts = await readBM();
    return NextResponse.json(accounts);
  } catch (error) {
    console.error('Error in GET /api/bm:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch BM accounts' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { saleStatus, ...restOfBody } = body;
    const newAccountData = BMAccountSchema.omit({ id: true, createdAt: true, updatedAt: true, hash: true }).parse(restOfBody);

    const accounts = await readBM();
    const newAccount = {
      id: uuidv4(),
      ...newAccountData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hash: uuidv4(),
      saleStatus,
    };
    accounts.push(newAccount);
    await writeBM(accounts);

    return new NextResponse(JSON.stringify(newAccount), { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/bm:', error);
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ message: 'Invalid data', error: error.message }), { status: 400 });
    }
    return new NextResponse(JSON.stringify({ message: 'Failed to create BM account' }), { status: 500 });
  }
}

export const dynamic = "force-dynamic";