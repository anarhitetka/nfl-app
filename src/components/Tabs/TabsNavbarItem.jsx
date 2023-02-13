import styled from "styled-components";

const S = {};
S.TabNavItem = styled.p`
    width: 100px;
    padding: 15px;
    margin: 0px;
    text-align: center;
    cursor: pointer;
    .active {
        border-bottom: 2px solid grey;
        font-weight: 700;
    }
    @media (max-width: 250px) {
        font-size: 13px;
        padding: 15px 5px;
}
`;

export default function TabsNavbarItem({ id, title, activeTab, setActiveTab }) {
    const handleTabChange = () => {
        setActiveTab(id);
    }
    return (
        <S.TabNavItem onClick={handleTabChange} className={activeTab === id ? 'active' : ''}>
            {title}
        </S.TabNavItem>
    );
}