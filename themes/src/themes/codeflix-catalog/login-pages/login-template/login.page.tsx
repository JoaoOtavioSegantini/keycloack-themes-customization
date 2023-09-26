import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../theme";
import reportWebVitals from "../../../../reportWebVitals";
import { Layout, LayoutProps } from "../../components/Layout";
import { GitHub } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

declare const layoutProps: LayoutProps;
declare const pageProps: LoginPageProps;

interface LoginPageProps {
  loginEnabled: boolean;
  loginAction: string;
  usernameEditDisabled: boolean;
  usernameLabel: string;
  usernameValue: string;
  passwordLabel: string;
  enabledRememberMe: boolean;
  enabledLoginRememberMe?: boolean;
  rememberMeLabel: string;
  resetPasswordAllowed: boolean;
  resetPasswordUrl: string;
  resetPasswordLabel: string;
  register?: {
    label: string;
    newUserLabel: string;
    url: string;
  };
  selectedCredential?: string;
  socialProviders?: {
    loginUrl: string;
    alias: string;
    providerId: "github";
    displayName: string;
  }[];
}

const icons = {
  github: <GitHub />,
};

const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
  const {
    loginEnabled,
    loginAction,
    usernameEditDisabled,
    usernameLabel,
    usernameValue,
    passwordLabel,
    enabledRememberMe,
    enabledLoginRememberMe,
    rememberMeLabel,
    resetPasswordAllowed,
    resetPasswordUrl,
    resetPasswordLabel,
    register,
    selectedCredential,
    socialProviders,
  } = props;

  return (
    <Box padding={2}>
      {!loginEnabled && (
        <div>Login não habilitado, contatar o administrator</div>
      )}
      <Grid container spacing={3} justifyContent="space-evenly">
        <Grid item xs={12} sm={socialProviders ? 7 : 12}>
          <form method="post" action={loginAction}>
            <TextField
              id="username"
              name="username"
              label={usernameLabel}
              fullWidth
              variant="outlined"
              defaultValue={usernameValue}
              autoFocus
              autoComplete="off"
              disabled={usernameEditDisabled}
            />
            <TextField
              id="password"
              name="password"
              label={passwordLabel}
              type="password"
              fullWidth
              variant="outlined"
              margin={"normal"}
              autoComplete="off"
            />
            <Grid container alignItems="center">
              {enabledRememberMe && !usernameEditDisabled && (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      defaultChecked={enabledLoginRememberMe}
                      value="true"
                    />
                  }
                  label={rememberMeLabel}
                />
              )}
              {resetPasswordAllowed && (
                <Link href={resetPasswordUrl} color="secondary">
                  {resetPasswordLabel}
                </Link>
              )}
            </Grid>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{ display: "flex", alignItems: "center" }}
              >
                {register && (
                  <div>
                    {register.newUserLabel}{" "}
                    <Link href={register.url} color="secondary">
                      {register.label}
                    </Link>
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  defaultValue={selectedCredential}
                />
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        {socialProviders && (
          <>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={4}>
              <List>
                {socialProviders.map((socialProvider, key) => {
                  return (
                    <ListItemButton
                      key={Math.floor(Math.random() * key)}
                      component="a"
                      href={socialProvider.loginUrl}
                    >
                      <ListItemIcon>
                        {icons[socialProvider.providerId]}
                      </ListItemIcon>
                      <ListItemText>{socialProvider.displayName}</ListItemText>
                    </ListItemButton>
                  );
                })}
              </List>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Layout {...layoutProps}>
        <LoginPage {...pageProps} />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
