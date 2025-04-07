import { NextResponse } from 'next/server';
import { store } from '@/app/lib/store';
import { validateItem } from '@/app/types/item';
import { ApiError, handleApiError } from '@/app/lib/errors';

export async function GET() {
  try {
    const items = store.getItems();
    return NextResponse.json(items);
  } catch (error) {
    const { statusCode, message } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!validateItem(body)) {
      throw new ApiError(400, 'Invalid item data');
    }

    const newItem = store.addItem(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    const { statusCode, message } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
