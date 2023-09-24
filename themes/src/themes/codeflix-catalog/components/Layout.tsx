import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  styled,
} from "@mui/material";
import React from "react";
import { Navbar } from "./Navbar";
import LocaleSelect from "./LocaleSelect";
import { AlertColor } from "@mui/material/Alert";
export interface LayoutProps {
  children?: React.ReactNode;
  i18nEnabled: boolean;
  locale?: { currentLocale: string; locales: { label: string; url: string }[] };
  title: string;
  message?: { type: AlertColor; content: string };
  isAppInitiatedAction: boolean;
}

export const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const {
    i18nEnabled,
    locale,
    title,
    message,
    isAppInitiatedAction,
    children,
  } = props;

  const CardStyled = styled("div")(({ theme }) => ({
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }));

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          height: "100%",
          paddingTop: "70px",
        }}
      >
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
        >
          <Grid
            item
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card component={CardStyled}>
              <CardHeader
                title={title}
                sx={{
                  color: "#999999",
                  textAlign: "center",
                }}
              />
              <CardContent>
                {message &&
                  (message.type !== "warning" || !isAppInitiatedAction) && (
                    <Alert
                      severity={message.type}
                      variant="filled"
                      elevation={6}
                    >
                      {message.content}
                    </Alert>
                  )}
                {children}
              </CardContent>
            </Card>
          </Grid>
          {i18nEnabled && locale && (
            <Grid item>
              <LocaleSelect
                sx={{ fontSize: "12px" }}
                locales={locale.locales}
                defaultValue={locale.currentLocale}
                disableUnderline={true}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};
