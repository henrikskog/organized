//const ROOT = process.env.api_root as string
const ROOT = 'http://localhost:1337'

const req = <TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> =>
  fetch(ROOT + url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse)

export const get = <TResponse>(url: string) => req<TResponse>(url)

// TBody extends BodyInit bruker bare så man kan enforce en type og kalle genericen for TBody
export const post = <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
  req<TResponse>(url, {
    method: 'POST',
    body,
    headers: {
      'Content-type': 'application/json',
    },
  })
