import styled from "styled-components";

const S = {};
S.TabContent = styled.div`
    @media (min-width: 1000px) {
        width: 900px;
    }
`;

export default function TabContentItem({ id, activeTab, children }) {
    return activeTab === id ? (
        <S.TabContent id={id}>
            {children}
        </S.TabContent>
    ) : null;
}