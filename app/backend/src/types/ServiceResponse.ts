type ServiceResponseErrorType = 'invalidData' | 'unauthorized' | 'notFound';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: { message: string },
};

export type ServiceResponseSuccess<T> = {
  status: 'successful' | 'created',
  data: T,
};

export type ServiceResponseTokenSuccess = {
  status: 'successful',
  data: { token: string }
};

export type ServiceResponse<T> = ServiceResponseError |
ServiceResponseSuccess<T> | ServiceResponseTokenSuccess;
