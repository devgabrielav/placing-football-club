export default function httpMapStatus(status: string): number {
  const statusHttp: Record<string, number> = {
    successful: 200,
    created: 201,
    invalidData: 400,
    unauthorized: 401,
    notFound: 404,
    unprocessable: 422,
  };
  return statusHttp[status] ?? 500;
}
