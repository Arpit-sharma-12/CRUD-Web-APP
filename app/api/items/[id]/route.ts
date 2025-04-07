import { NextResponse } from 'next/server';
import { store } from '@/app/lib/store';
import { validateItem } from '@/app/types/item';
import { ApiError, handleApiError } from '@/app/lib/errors';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    if (!params.id) {
      throw new ApiError(400, 'Item ID is required');
    }

    if (Object.keys(body).length > 0 && !validateItem(body)) {
      throw new ApiError(400, 'Invalid update data');
    }

    const updatedItem = store.updateItem(params.id, body);
    if (!updatedItem) {
      throw new ApiError(404, 'Item not found');
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    const { statusCode, message } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      throw new ApiError(400, 'Item ID is required');
    }

    const deleted = store.deleteItem(params.id);
    if (!deleted) {
      throw new ApiError(404, 'Item not found');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const { statusCode, message } = handleApiError(error);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
