import Image from "next/image";
import React from "react";
import LoaderSVG from "../../../public/Loader.svg"
import { LoaderContainer } from "./style";

export const Loader: React.FC = () => {

    return (
        <LoaderContainer>
            <Image src={LoaderSVG} alt={"Loading..."}/>
        </LoaderContainer>
    )

}