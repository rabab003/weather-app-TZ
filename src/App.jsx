import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import translation from "../public/locales/ar/translation.json";

// external librs
import axios, { Axios } from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";

import "moment/dist/locale/ar";
moment.locale("ar");

// icons
import CloudIcon from "@mui/icons-material/Cloud";

const theme = createTheme({
  typography: {
    fontFamily: ["NKA"],
  },
});

import { useEffect, useState } from "react";
import { Cancel } from "@mui/icons-material";

function App() {
  const { t, i18n } = useTranslation();
  let cancelAxios = null;
  const [temp, setTemp] = useState({
    number: null,
    desc: "",
    min: null,
    max: null,
    icon: null,
  });
  const [date, setDate] = useState("");
  const [locale, setLocale] = useState("ar");
  const direction = locale == "ar" ? "rtl" : "ltr";

  function handleLangaugeClick() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
    }
    setDate(moment().format("MMM Do YY"));
  }

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);

  useEffect(() => {
    setDate(moment().format("MMM Do YY"));
    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?unitGroup=us&key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.days[0].temp);
        const Tempmin = Math.round(response.data.days[0].tempmin);
        const Tempmax = Math.round(response.data.days[0].tempmax);
        const TempDesc = response.data.days[1].description;
        const responseIcon = response.data.days[0].icon;
        setTemp({
          number: responseTemp,
          min: Tempmin,
          max: Tempmax,
          desc: TempDesc,
          icon: responseIcon,
        });
        console.log(responseIcon);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* content container */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* card */}
            <div
              dir={direction}
              style={{
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                width: "100%",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0px 7px 10px rgba(0,0,0,0.5)",
              }}
            >
              {/* content */}
              <div>
                {/* city & time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={direction}
                >
                  <Typography
                    style={{ marginRight: "20px", fontWeight: "600" }}
                    variant="h2"
                    gutterBottom
                  >
                    {t("najaf")}
                  </Typography>
                  <Typography
                    style={{ marginRight: "20px" }}
                    variant="h5"
                    gutterBottom
                  >
                    {date}
                  </Typography>
                </div>
                <hr />

                {/* degree & disc */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    {/* temp */}
                    <div>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      {/* todo:temp image */}
                    </div>
                    {/* ===== temp */}
                    <Typography variant="h6">{t(temp.desc)}</Typography>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>
                        {t("min")} : {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 7px" }}>|</h5>
                      <h5>
                        {t("max")} : {temp.max}
                      </h5>
                    </div>
                  </div>
                  {/* ==== degree & disc ==== */}
                  <div>
                    <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                  </div>
                </div>
              </div>
              {/* /// content */}
            </div>
            {/* translation div */}
            <div
              // dir={direction}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                onClick={handleLangaugeClick}
                style={{ color: "white", marginTop: "7px" }}
              >
                {locale == "en" ? "arabic" : "انجليزي"}
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
