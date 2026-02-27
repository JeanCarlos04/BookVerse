import type { IsSectionEmpty } from "../context/MainContext";

async function fetchBooksFunction<T>(
  URL: string,
  setBooksLoading: React.Dispatch<React.SetStateAction<IsSectionEmpty>>,
  bookSection: keyof IsSectionEmpty,
): Promise<T> {
  try {
    setBooksLoading((prev) => ({
      ...prev,
      [bookSection]: true,
    }));

    const res = await fetch(URL, { credentials: "include" });

    if (!res.ok) {
      throw new Error("request failed");
    }

    const data = await res.json();

    if (data.length === 0) {
      setBooksLoading((prev) => ({
        ...prev,
        [bookSection]: "empty",
      }));
    } else {
      setBooksLoading((prev) => ({
        ...prev,
        [bookSection]: false,
      }));
    }

    return data;
  } catch (err) {
    setBooksLoading((prev) => ({
      ...prev,
      [bookSection]: "empty",
    }));

    throw err;
  }
}

export default fetchBooksFunction;
