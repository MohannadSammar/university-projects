import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/Header/Header";
import BackgroundImage from "../public/Background.png";
import styled from "styled-components";
import { TT_VARIABLES } from "../styles/globalVariables";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "../components/Footer/Footer";
import AuthProvider from "../contexts/AuthContext";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { ThemeProvider } from "../contexts/ThemeContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
/*eslint-disable */
const Layout: React.FC = (props: any) => {
  /*eslint-enable */

  const router = useRouter();

  const auth = useAuth();

  const authAction = useCallback(async () => {
    if (!auth?.isLoggedIn) {
      return router.push("/login");
    }
    await auth.logout();
    router.push("/");
  }, [auth]);

  return (
    <>
      <Header
        authButtonAction={authAction}
        authButtonLabel={auth?.isLoggedIn ? "Logout" : "Login"}
      />
      <PageContainer>{props.children}</PageContainer>
      <Footer />
    </>
  );
};

const PageContainer = styled.div`
  background-attachment: fixed;
  background-image: url(${BackgroundImage.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  min-height: calc(100vh - ${TT_VARIABLES.footerSize});
  padding-top: ${TT_VARIABLES.headerSize};
`;
