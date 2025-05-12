// src/components/modal/EditModal.tsx

import styled from "styled-components";
import useModalStore from "../../store/modalStore";
import Modal from "../common/Modal";
import useUserStore from "../../store/userStore";
import ProfileImage from "../common/ProfileImage";
import axios from "axios";
import { HOST } from "../../config";
import { useState } from "react";

const Edit = styled.div`
  width: 500px;
  padding: 10px 20px;
`;

const ImageEdit = styled.div`
  width: 100%;
  height: 70px;
  margin: 10px 0;
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-grey-2);
  border-radius: 10px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const NameAndUsername = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
`;

const ImageChange = styled.label`
  width: 120px;
  height: 30px;

  font-size: 14px;
  text-align: center;
  line-height: 30px;
  color: var(--color-white);

  border: none;
  border-radius: 5px;
  background-color: var(--color-blue-1);

  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-2);
  }
`;

const TextAreaDiv = styled.div`
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  resize: none;
  font-size: 14px;

  border: 1px solid var(--color-grey-2);
  border-radius: 10px;

  outline-color: var(--color-black-1);
`;

const ApplyButton = styled.button`
  width: 70px;
  height: 30px;

  position: relative;
  left: 50%;
  transform: translate(-50%, 0);

  color: var(--color-white);

  border: none;
  border-radius: 5px;
  background-color: var(--color-blue-1);

  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-2);
  }
`;

const EditModal = () => {
  const { user, setUser } = useUserStore();
  const { closeEditModal } = useModalStore();
  const [bio, setBio] = useState("");

  const onChangeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    axios
      .put(`${HOST}/users/image`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        axios
          .get(`${HOST}/users/${user?.id}/profile`, { withCredentials: true })
          .then((res) => {
            console.log("성공");
            setUser(res.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickApply = () => {
    const data = { bio: bio };
    axios
      .put(`${HOST}/users/profile`, data, { withCredentials: true })
      .then((res) => {
        closeEditModal();
        console.log(res);
      });
  };

  return (
    <Modal close={closeEditModal} title="Edit Profile">
      <Edit>
        <h2>Change Photo</h2>
        <ImageEdit>
          <Profile>
            <ProfileImage size="50px" src={user?.imageData} />
            <NameAndUsername>
              <div>
                <h3>{user?.name}</h3>
                <p>{user?.username}</p>
              </div>
            </NameAndUsername>
          </Profile>
          <ImageChange htmlFor="input">Select Photo</ImageChange>
          <input
            id="input"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={onChangeImage}
          />
        </ImageEdit>

        <h2>Bio</h2>
        <TextAreaDiv>
          <TextArea
            onChange={onChangeBio}
            value={bio}
            placeholder={"Bio"}
          ></TextArea>
        </TextAreaDiv>
        <ApplyButton onClick={onClickApply}>Apply</ApplyButton>
      </Edit>
    </Modal>
  );
};

export default EditModal;
