interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T | null;
  error: unknown | null;
}

export default function formatResponse<T = unknown>(
  statusCode: number,
  message: string,
  data: T | null = null,
  error: unknown | null = null,
): ApiResponse<T> {
  return { statusCode, message, data, error };
}
