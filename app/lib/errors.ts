export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return { statusCode: error.statusCode, message: error.message };
  }
  return { statusCode: 500, message: 'Internal Server Error' };
};
