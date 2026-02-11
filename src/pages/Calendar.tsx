import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Nav from "../components/Nav";
import ToastModal from "../components/UX/ToastModal";
import useContextHook from "../hooks/useContextHook";

function Calendar() {
  const { reservedBooks } = useContextHook();
  const [formatedDay, setFormatedDays] = useState<(number | null)[][]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [monthDay, setMonthDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const [weekDay, setWeekDay] = useState(new Date(year, month).getDay());

  const calendar = [
    { month: "january", days: 31 },
    { month: "february", days: 28 },
    { month: "march", days: 31 },
    { month: "april", days: 30 },
    { month: "may", days: 31 },
    { month: "june", days: 30 },
    { month: "july", days: 31 },
    { month: "august", days: 31 },
    { month: "september", days: 30 },
    { month: "october", days: 31 },
    { month: "november", days: 30 },
    { month: "december", days: 31 },
  ];

  const handleCalendarControl = () => {
    const monthData = calendar[month];
    const formated: (number | null)[][] = [[], [], [], [], [], []];

    let day = 0;

    for (let i = 1; i < monthData.days + weekDay + 1; i++) {
      if (formated[0].length < 7) {
        if (i <= weekDay) {
          formated[0].push(null);
        } else {
          day++;
          formated[0].push(day);
        }
      } else if (formated[1].length < 7) {
        day++;
        formated[1].push(day);
      } else if (formated[2].length < 7) {
        day++;
        formated[2].push(day);
      } else if (formated[3].length < 7) {
        day++;
        formated[3].push(day);
      } else if (formated[4].length < 7) {
        day++;
        formated[4].push(day);
      }
    }

    setFormatedDays(formated);
  };

  useEffect(() => {
    const init = async () => {
      handleCalendarControl();
    };

    init();
  }, [weekDay]);

  return (
    <>
      <main className="flex w-full h-full">
        <Aside />
        <div className="w-full">
          <Nav />

          <div className="w-full h-full flex bg-gray-50 justify-center pb-4 pt-8">
            <section className="w-fit px-8 rounded-lg bg-white shadow flex py-6 h-fit items-center flex-col gap-6">
              <header className="flex gap-4 bg-white shadow p-3 rounded-md">
                <h2 className="text-lg font-medium">My Calendar</h2>
                <input
                  onChange={(e) => {
                    const splittedDate = new Date(e.target.value)
                      .toLocaleDateString()
                      .split("/");

                    setMonth(() => Number(splittedDate[1]) - 1);
                    setYear(() => Number(splittedDate[2]));
                    setMonthDay(() => Number(splittedDate[0]) + 1);

                    setWeekDay(() =>
                      new Date(
                        Number(splittedDate[2]),
                        Number(splittedDate[1]) - 1,
                      ).getDay(),
                    );
                  }}
                  className="shadow border border-gray-200 px-3 rounded"
                  type="date"
                />
                <h2 className="text-center capitalize font-medium">
                  {calendar[month].month} - {monthDay} - {year}
                </h2>
              </header>
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <table>
                  <thead>
                    <tr className="h-12.5">
                      <th className="w-30 font-medium">Sunday</th>
                      <th className="w-30 font-medium">Monday</th>
                      <th className="w-30 font-medium">Tuesday</th>
                      <th className="w-30 font-medium">Wednesday</th>
                      <th className="w-30 font-medium">Thursday</th>
                      <th className="w-30 font-medium">Friday</th>
                      <th className="w-30 font-medium">Saturday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formatedDay.map((row, index) => {
                      return (
                        <tr key={index}>
                          {row.map((column, index) => {
                            return (
                              <td
                                key={index}
                                className={`${monthDay === column ? "border-blue-300 border-2" : "border-gray-200 border"}  h-25 pt-2 pb-8 px-2 font-medium text-xs rounded-md relative`}
                              >
                                {(() => {
                                  const booksThatDay = reservedBooks.filter(
                                    (book) => {
                                      const d = new Date(book.expires_in);

                                      return (
                                        d.getDate() === column &&
                                        d.getMonth() === month &&
                                        d.getFullYear() === year
                                      );
                                    },
                                  );

                                  if (booksThatDay.length === 0) return null;

                                  return (
                                    <div className="flex flex-col gap-2">
                                      <h3 className="text-blue-500">
                                        Books expired in:
                                      </h3>

                                      {booksThatDay.map((book) => (
                                        <p key={book.id}>- {book.title}</p>
                                      ))}
                                    </div>
                                  );
                                })()}

                                <h4
                                  className={` absolute bottom-2 right-2 text-gray-700`}
                                >
                                  {column}
                                </h4>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* {bookId && showModals.checkBookModal && (
            <>{<CheckBook book_id={bookId} />}</>
          )} */}
        </div>

        <ToastModal />
      </main>
    </>
  );
}

export default Calendar;
