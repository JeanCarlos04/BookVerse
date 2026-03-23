import type { SectionType } from "../types/sectionType";

async function fetchBooksFunction<T>(
  URL: string,
  setBooksLoading: React.Dispatch<
    React.SetStateAction<Record<SectionType, string | boolean | undefined>>
  >,
  bookSection: SectionType,
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
