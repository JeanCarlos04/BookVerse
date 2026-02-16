async function fetchFunction<T>(URL: string): Promise<T> {
  const res = await fetch(URL, { credentials: "include" });

  if (!res.ok) {
    throw new Error("request failed");
  }

  return res.json();
}

export default fetchFunction;
