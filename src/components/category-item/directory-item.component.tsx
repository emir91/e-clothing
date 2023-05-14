import React from 'react';
import { useNavigate } from 'react-router';
import { 
    DirectoryItemContainer, 
    BackgroundImage, 
    Body, 
    DirectoryItemTitle, 
    ShopNow 
} from './directory-item.styles';
import { TDirectoryItem } from '../directory/directory.component';

type DirectoryItemProps = {
  category: TDirectoryItem
};

const DirectoryItem: React.FC<DirectoryItemProps> = ({category}) => {
    const { title, imageUrl, route } = category
    const navigate = useNavigate();

    const navigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={navigateHandler}>
            <BackgroundImage imageUrl={imageUrl}/>
            <Body>
                <DirectoryItemTitle>{title}</DirectoryItemTitle>
                <ShopNow>Shop Now</ShopNow>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;