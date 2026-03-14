const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 60
): Promise<T> {
  const response = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`GraphQL fetch failed: ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data as T;
}