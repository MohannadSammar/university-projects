import { StyledSearchBar } from "./styles"

export interface SearchItems{
    Textplaceholder: string;
    onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
    value: string
}

export const SearchBarItem: React.FC<SearchItems> = ({
    Textplaceholder,
    onChange,
    value
}) => {

    
    return (
        <StyledSearchBar value={value} name="search" type="search" className="form-control" placeholder= {Textplaceholder} onChange={onChange}/>
    )
}