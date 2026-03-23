import { useEffect, useState } from "react";
import useBookContext from "../hooks/useBookContext";
import calendarConst from "../constant/Calendar";
import WidthResponsiveHook from "../hooks/widthHook";

function Calendar() {
  const { reservedBooks } = useBookContext();
  const [formatedDay, setFormatedDays] = useState<(number | null)[][]>([]);
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [monthDay, setMonthDay] = useState(() => new Date().getDate());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [weekDay, setWeekDay] = useState(() => new Date(year, month).getDay());

  const width = WidthResponsiveHook();

  const handleCalendarControl = () => {
    const monthData = calendarConst[month];
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
    <main className="flex w-full h-full xl:pl-(--aside-width)">
      <div className="w-full h-full flex bg-gray-50 justify-center pb-4 pt-8">
        <section className="w-fit md:px-8 p-2  rounded-lg bg-white shadow flex py-6 h-fit items-center flex-col gap-6">
          <header className="flex xl:border-0 items-center border border-gray-100 gap-4 bg-white shadow p-3 rounded-md">
            <h2 className="md:text-lg font-medium">
              {width > 768 ? "My Calendar" : "Calendar"}
            </h2>
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
            <h2 className="text-center md:text-base text-sm capitalize font-medium">
              {calendarConst[month].month} - {monthDay} - {year}
            </h2>
          </header>
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            <table>
              <thead>
                <tr className="h-12.5">
                  <th className="w-30 font-medium">
                    {width < 1024 ? "Sun" : "Sunday"}{" "}
                  </th>
                  <th className="w-30 font-medium">
                    {width < 1024 ? "Mon" : "Monday"}{" "}
                  </th>
                  <th className="w-30 font-medium">
                    {width < 1024 ? "Tue" : "Tuesday"}{" "}
                  </th>
                  <th className="w-30 font-medium">
                    {width < 1024 ? "Wed" : "Wednesday"}{" "}
                  </th>
                  <th className="w-30 font-medium">
                    {width < 1024 ? "Thu" : "Thursday"}{" "}
                  </th>
                  <th className="w-30 font-medium">
                    {width < 1024 ? "Fri" : "Friday"}{" "}
                  </th>
                  <th className="w-30 font-medium">
                    {width < 1024 ? "Sat" : "Saturday"}{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {formatedDay.map((row) => {
                  return (
                    <tr key={Number(row)}>
                      {row.map((column) => {
                        return (
                          <td
                            key={column}
                            className={`${monthDay === column && month === new Date().getMonth() ? "border-blue-300 border-2" : "border-gray-200 border"}  h-25 pt-2 pb-8 px-2 font-medium text-xs rounded-md relative`}
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
                                    <p key={book.id}> - {book.title}</p>
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
    </main>
  );
}

export default Calendar;
