import { useEffect } from "react";
import { useState } from "react";
import { CiWifiOff } from "react-icons/ci";
import { ExcelRenderer } from "react-excel-renderer";
import { CiWifiOn } from "react-icons/ci";

const Home = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // online offline functionality is still working without remove event listener
    // return () => {
    //   window.removeEventListener("online", handleOnline);
    //   window.removeEventListener("offline", handleOffline);
    // };
  }, []);

  //   excel export
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
      <div className="homeSty">
        {isOnline && (
          <div>
            <h1>Home page</h1>
            <h2
              style={{ color: "green", textAlign: "center", marginTop: "30px" }}
            >
              you connected with good internet connection
              <br />
              <CiWifiOn style={{ fontSize: "50px" }} />
            </h2>
            <input
              style={{ margin: "10px auto" }}
              type="file"
              onChange={handleFile}
            />
            <br />
            <table style={{ borderCollapse: "collapse", margin: "0px auto" }}>
              <thead>
                <tr>
                  {header.map((h, index) => (
                    <th style={{ border: "1px solid black" }} key={index}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cols.splice(1).map((col, index) => (
                  <tr key={index}>
                    {col.map((c, index) => (
                      <td style={{ border: "1px solid black" }} key={index}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!isOnline && (
        <div style={{ textAlign: "center", color: "red" }}>
          <CiWifiOff className="wifi" />
          <h1>No Internet Connection..........</h1>
        </div>
      )}
    </>
  );
};
export default Home;
