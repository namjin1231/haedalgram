// src/components/profile/ProfilePostSection.tsx

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { HOST } from "../../config";
import { TPost } from "../../types";
import ProfilePost from "./ProfilePost";
import { useParams } from "react-router-dom";

type Response = {
  data: TPost[];
};
// 서버에서 반환된 게시물 목록의 타입

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const ProfilePostSection = () => {
  const { id } = useParams();
  // 유저 ID 추출
  const [posts, setPosts] = useState<TPost[]>([]);
  // 게시물 목록 저장 상태, 서버에서 받아온 게시물 데이터 설정 함수

  useEffect(() => {
    axios
      .get(`${HOST}/posts/user/${id}`)
      .then((res: Response) => {
        setPosts(res.data);
        // 모든 게시물을 불러온다.
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Section>
      {posts.map((post) => (
        <ProfilePost
          key={post.id}
          id={post.id}
          imageData={post.imageData}
          isLike={post.isLike}
        />
      ))}
    </Section>
  );
};

export default ProfilePostSection;
