import { useEffect, useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";

const Test = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = () => {
    setIsOnline(true);
  };
  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // clean up logic when the component unmount
    // window.removeEventListener("online", function () {
    //   handleOnline();
    // });
    // window.removeEventListener("offline", function () {
    //   handleOffline();
    // });
  }, []);

  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);
  const handleFile = (event) => {
    const file = event.target.files[0];
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        setHeader(response.rows[0]);
        setCols(response.rows);
      }
    });
  };

  return (
    <>
      {isOnline && (
        <div>
          <h1>test file</h1>
          <input type="file" onChange={handleFile} />
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {header.map((x, index) => (
                  <th style={{ border: "1px solid black" }} key={index}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cols.splice(1).map((col, index) => (
                <tr key={index}>
                  {col.map((h, index) => (
                    <td style={{ border: "1px solid black" }} key={index}>
                      {h}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isOnline && <h1>No internet connection</h1>}
    </>
  );
};

export default Test;
