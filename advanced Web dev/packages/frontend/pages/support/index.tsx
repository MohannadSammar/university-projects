import { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TT_VARIABLES } from "../../styles/globalVariables";
import {
  FAQContainer,
  TextContainer,
  RedirectContact,
  FAQEntryContainer,
  DecoratedHeadline,
  ComponentWrapper,
  CustomHR,
} from "../../styles/support/styles";
import { FAQEntry } from "../../components/common/FaqEntry/FaqEntry";
import { BodyText } from "../../components/common/FaqEntry/styles";
import { useRouter } from "next/router";

const SupportPage: React.FC = () => {
  const { setTheme } = useContext(ThemeContext);

  const router = useRouter();
  useEffect(() => {
    setTheme(TT_VARIABLES.backgrounds.support);
  }, []);

  return (
    <ComponentWrapper>
      <FAQContainer>
        <TextContainer>
          <DecoratedHeadline color={TT_VARIABLES.colors.white}>
            Frequently Asked Questions
          </DecoratedHeadline>
          <CustomHR />
          <BodyText color={TT_VARIABLES.colors.white}>
            You have questions? Maybe you can find them inside the most
            frequently asked below.
          </BodyText>
          <RedirectContact>
            <BodyText
              bold
              color={TT_VARIABLES.colors.white}
              onClick={() => router.push("/contact_us")}
            >
              Contact us
            </BodyText>
          </RedirectContact>
        </TextContainer>
        <FAQEntryContainer>
          <FAQEntry
            question="Why should i use this platform?"
            answer="TexUs is unique. It's not about the desire to sell you anything, but to show you which products
            are frequently used and liked by other users. It's build for you to explore lots of products and learn to share our love for technology"
          />
          <FAQEntry
            question="How can i add new products?"
            answer="Since it is our goal to make sure all of the products shown on this page are legitimate,
            it's not possible for you to add new products by yourself. If one product is frequently asked for,
            we will add it as soon as we can."
          />
          <FAQEntry
            question="Why are all products listed on ebay?"
            answer="Since we are still in the early stages, we have a lot of things that need further development, before we cann add new suppliers.
            Adding new ones is costly and time intensive. Thank you for understanding."
          />
          <FAQEntry
            question="Do i have to pay for this platform?"
            answer="TexUs is completely free of any fees for our service. If you still want to contribute something
             to what we do, consider donating to us on patreon. Which we will add. Very soon. We run out of food in a week."
          />
          <FAQEntry
            question="I found a bug. Where do i report it to?"
            answer="We don't care. If you find a bug, you may as well shove it in your mouth and eat it, since you should not talk when
             your mouth is full."
          />
        </FAQEntryContainer>
      </FAQContainer>
    </ComponentWrapper>
  );
};

export default SupportPage;
