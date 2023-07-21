import { CustomButton } from './styles';

interface FunctionButtonProps {
    action: () =>  void;
    label: string;
    textColor?: string;
    backgroundColor?: string;
    width?: string;
}

export const FunctionButton: React.FC<FunctionButtonProps> = ({
    action,
    label,
    textColor,
    backgroundColor,
    width,
}) => {
    return(
        <CustomButton width={width} onClick={action} color={textColor ?? textColor} bgcolor={backgroundColor ?? backgroundColor}>
            {label}
        </CustomButton>
    );
}