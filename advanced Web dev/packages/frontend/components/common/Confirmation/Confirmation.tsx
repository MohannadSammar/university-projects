import { Backdrop } from "../Backdrop/style"
import { FunctionButton } from "../FunctionButton/FunctionButton"
import { Body, TextConfirmation ,ButtonContainer } from "./styles"

interface ConfirmationInterface{
    onConfirm : () => void;
    onCancel : () => void;

}
export const Confirmation: React.FC<ConfirmationInterface> = ({
    onConfirm,
    onCancel
}) => {
    return (<>
        <Backdrop>

        <Body>
                <TextConfirmation>
                    Are you sure you want to delete this review?
                </TextConfirmation>
                <ButtonContainer>
            <FunctionButton label={"confirm"} action={onConfirm} backgroundColor={"green"} />
            <FunctionButton label={"cancel"} action={onCancel} backgroundColor={"red"}/>
            </ButtonContainer>

        </Body>
        </Backdrop>

    </>
    )
}