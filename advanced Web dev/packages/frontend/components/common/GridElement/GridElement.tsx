import { GridElementItemContainer, Textcontainer } from './styles';
import { Category } from "../../../types/Category";
import  { useRouter } from 'next/router';
import React from 'react';


export interface GridElementProps{
    category: Category;
    wide: boolean;
    long: boolean;
}

export const GridElement: React.FC<GridElementProps> = ({
    category,
    wide,
    long,
}) => {
    const router = useRouter();

    const onClickCategory = (): void => {
        router.push({
            pathname: "/swipe",
            query: {
                productId: undefined,
                categoryId: category.id
            }
        });
    }
    
    return (
        <GridElementItemContainer 
            onClick={onClickCategory}
            image={category.image}
            wide={wide} 
            long={long}>
            <Textcontainer>
                <h3>{category.name}</h3>
            </Textcontainer>
        </GridElementItemContainer>
    )
}