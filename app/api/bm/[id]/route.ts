import { NextResponse } from 'next/server';
import { readBM, writeBM } from '@/lib/jsondb';
import { BMAccountSchema } from '@/lib/types';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updatedAccountData = BMAccountSchema.omit({ id: true, createdAt: true, updatedAt: true, hash: true, saleStatus: true }).parse(body);

    let accounts = await readBM();
    const accountIndex = accounts.findIndex(acc => acc.id === id);

    if (accountIndex === -1) {
      return new NextResponse(JSON.stringify({ message: 'BM account not found' }), { status: 404 });
    }

    const updatedAccount = {
      ...accounts[accountIndex],
      ...updatedAccountData,
      updatedAt: new Date().toISOString(),
      saleStatus: body.saleStatus ?? accounts[accountIndex].saleStatus,
    };
    accounts[accountIndex] = updatedAccount;
    await writeBM(accounts);

    return new NextResponse(JSON.stringify(updatedAccount), { status: 200 });
  } catch (error) {
    console.error(`Error in PUT /api/bm/${params.id}:`, error);
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ message: 'Invalid data', error: error.message }), { status: 400 });
    }
    return new NextResponse(JSON.stringify({ message: 'Failed to update BM account' }), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    let accounts = await readBM();
    const initialLength = accounts.length;
    accounts = accounts.filter(acc => acc.id !== id);

    if (accounts.length === initialLength) {
      return new NextResponse(JSON.stringify({ message: 'BM account not found' }), { status: 404 });
    }

    await writeBM(accounts);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error in DELETE /api/bm/${params.id}:`, error);
    return new NextResponse(JSON.stringify({ message: 'Failed to delete BM account' }), { status: 500 });
  }
}

export const dynamic = "force-dynamic";