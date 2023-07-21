import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { TT_VARIABLES } from '../styles/globalVariables';
import { TitleHeader } from '../styles/headings';
import { HomeContainer } from '../styles/home/styles';
import { useAuth } from '../hooks/useAuth';
import { ReactNode } from 'react';
import { FunctionButton } from '../components/common/FunctionButton/FunctionButton';

const Home: NextPage = () => {

  const router = useRouter();
  const auth = useAuth();


  const RedirectSwipe: ReactNode = auth?.isLoggedIn && (
    <FunctionButton 
      label='start swiping!'
      action={() => router.push("/swipe")}
      textColor={TT_VARIABLES.colors.red}
      backgroundColor={TT_VARIABLES.colors.white}
    />
  );

  const RedirectSignup: ReactNode = !auth?.isLoggedIn && (
    <FunctionButton 
      label='Login'
      action={() => router.push("/login")}
      textColor={TT_VARIABLES.colors.red}
      backgroundColor={TT_VARIABLES.colors.white}
    />
  );

  const NotLoggedInTitle: ReactNode = !auth?.isLoggedIn && (
    <TitleHeader color={TT_VARIABLES.colors.white}>
      Your people.
      <br />
      Your tech.
    </TitleHeader>
  );

  const LoggedInTitle: ReactNode = auth?.isLoggedIn && (
    <TitleHeader color={TT_VARIABLES.colors.white}>
      Your tech.
      <br/>
      Your speed.
    </TitleHeader>
  );

  return (
    <HomeContainer>
        { LoggedInTitle }
        { NotLoggedInTitle }
        { RedirectSwipe }
        { RedirectSignup }
    </HomeContainer>
  );
};

export default Home;
