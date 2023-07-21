import Link from 'next/link';
import { CustomButton } from '../FunctionButton/styles';

interface LinkButtonProps {
    href: string;
    label?: string;
    textColor?: string;
    backgroundColor?: string;
    size?: "sm"|"lg";
}

export const LinkButton: React.FC<LinkButtonProps> = ({
    children,
    href,
    label,
    textColor,
    backgroundColor,
    size,
}) => {
    return(
        <Link href={href} passHref>
            <CustomButton size={size ?? size} color={textColor ?? textColor} bgcolor={backgroundColor ?? backgroundColor}>
                {children || label || ""}
            </CustomButton>
        </Link>
    );
}