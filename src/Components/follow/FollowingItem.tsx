// src/components/follow/FollowingItem.tsx

import styled from "styled-components";
import ProfileImage from "../common/ProfileImage";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  imageData: string | null;
  username: string;
};

const Div = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  color: var(--color-black-2);
  text-align: center;
  text-decoration: none;
`;

const FollowingItem = ({ id, imageData, username }: Props) => {
  return (
    <Div>
      <StyledLink to={`/${id}`}>
        <ProfileImage size="60px" src={imageData} />
      </StyledLink>
      <StyledLink to={`/${id}`}>
        <p>{username}</p>
      </StyledLink>
    </Div>
  );
};

export default FollowingItem;
