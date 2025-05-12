// src/components/modal/SearchModalItem.tsx

import styled from "styled-components";
import ProfileImage from "../common/ProfileImage";
import { useState } from "react";
import axios from "axios";
import { HOST } from "../../config";

type Props = {
  id: number;
  imageData: string;
  name: string;
  username: string;
  isFollowing: boolean;
};

const SearchModalItemLi = styled.li`
  height: 60px;
  margin: 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: 1px solid var(--color-grey-2);
`;

const ProfileDiv = styled.div`
  display: flex;
`;

const InfoDiv = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const FollowButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-grey-1);

  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-2);
  }
`;

const SearchModalItem = ({
  id,
  imageData,
  name,
  username,
  isFollowing,
}: Props) => {
  const [following, setFollowing] = useState(isFollowing);
// 팔로우 상태 관리 [현재 팔로우 상태, 팔로우 상태 업뎃 함수]

  const onClickFollow = () => {
    if (!following) {
      axios
        .post(`${HOST}/follows/${id}`, null, { withCredentials: true })
        .then(() => {
          setFollowing(!following);
          // 성공 시 상태 반전
        });
    } else {
      axios
        .delete(`${HOST}/follows/${id}`, { withCredentials: true })
        // 팔로우 취소 요청
        .then(() => {
          setFollowing(!following);
        });
    }
  };

  return (
    <SearchModalItemLi>
      <ProfileDiv>
        <ProfileImage size="40px" src={imageData} />
        <InfoDiv>
          <h3>{name}</h3>
          <p>{username}</p>
        </InfoDiv>
      </ProfileDiv>
      <FollowButton onClick={onClickFollow}>
        {following ? "Following" : "Follow"}
      </FollowButton>
      {/* // 팔로우 버튼 랜더링 - onClick 이벤트 */}
    </SearchModalItemLi>
  );
};

export default SearchModalItem;
