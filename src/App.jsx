import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

// icons
import CloudIcon from "@mui/icons-material/Cloud";

const theme = createTheme({
  typography: {
    fontFamily: ["NKA"],
  },
});

import { useEffect } from "react";
// axios library

function App() {
  useEffect(() => {
    axios
      .get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?unitGroup=us&key=DN5KW8ENLZ3HSPQ3LKADLRQVN"
      )
      .then(function (response) {
        console.log(response.data.queryCost);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
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
              dir="rtl"
              style={{
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                width: "100%",
                padding: "10px",
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
                  dir="rtl"
                >
                  <Typography
                    style={{ marginRight: "20px", fontWeight: "600" }}
                    variant="h2"
                    gutterBottom
                  >
                    النجف
                  </Typography>
                  <Typography
                    style={{ marginRight: "20px" }}
                    variant="h5"
                    gutterBottom
                  >
                    الاحد 22/6
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
                        40
                      </Typography>

                      {/* todo:temp image */}
                    </div>
                    {/* ===== temp */}
                    <Typography variant="h6">broken clouds</Typography>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>الصغرى : 34</h5>
                      <h5 style={{ margin: "0px 7px" }}>|</h5>
                      <h5>الكبرى : 43</h5>
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
              dir="rtl"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button style={{ color: "white", marginTop: "7px" }}>
                انجليزي
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
