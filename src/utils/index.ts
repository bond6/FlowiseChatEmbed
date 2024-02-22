export const isNotDefined = <T>(value: T | undefined | null): value is undefined | null => value === undefined || value === null;

export const isDefined = <T>(value: T | undefined | null): value is NonNullable<T> => value !== undefined && value !== null;

export const isEmpty = (value: string | undefined | null): value is undefined => value === undefined || value === null || value === '';

export const isNotEmpty = (value: string | undefined | null): value is string => value !== undefined && value !== null && value !== '';

export const sendRequest = async <ResponseData>(
  params:
    | {
        url: string;
        method: string;
        body?: Record<string, unknown> | FormData;
        type?: string;
      }
    | string,
): Promise<{ data?: ResponseData; error?: Error }> => {
  try {
    const maxRetries = 3;
    let attempt = 0;
    let data: any;
    while (attempt < maxRetries) {
      const url = typeof params === 'string' ? params : params.url;
      const response = await fetch(url, {
        method: typeof params === 'string' ? 'GET' : params.method,
        mode: 'cors',
        headers:
          typeof params !== 'string' && isDefined(params.body)
            ? {
                'Content-Type': 'application/json',
              }
            : undefined,
        body: typeof params !== 'string' && isDefined(params.body) ? JSON.stringify(params.body) : undefined,
      });
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (typeof params !== 'string' && params.type === 'blob') {
        data = await response.blob();
      } else {
        data = await response.text();
      }
      if (!response.ok) {
        let errorMessage;

        if (typeof data === 'object' && 'error' in data) {
          errorMessage = data.error;
        } else {
          errorMessage = data || response.statusText;
        }

        throw errorMessage;
      }
      if (data.text === '') {
        attempt++;
        continue;
      }
      return { data };
    }
    if (data.text) {
      return { data };
    } else {
      data.text =
        "Apologies for the inconvenience, but it seems I'm currently unable to process your request. Please try again, as I'm eager to assist you. Should this issue persist, don't hesitate to get in touch with our support team for immediate assistance. You can contact SmartDNS support at help@smartdnsproxy.com for any further queries or help needed.";
      return { data };
    }
  } catch (e) {
    console.error(e);
    return { error: e as Error };
  }
};
