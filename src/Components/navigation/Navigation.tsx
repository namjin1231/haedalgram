// src/components/navigation/Navigation.tsx
// 사이드바
import styled from "styled-components";
import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import {
  faHouse,
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../store/userStore";
import { useEffect } from "react";
import useModalStore from "../../store/modalStore";
import SearchModal from "../modal/SearchModal";

const Nav = styled.nav`
  width: 300px;
  height: 100vh;
  padding: 8px;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;

  border-right: 1px solid var(--color-grey-2);
  border-radius: 5px;
`;

const LogoImg = styled.img`
  width: 80%;
  margin: 30px auto;
`;

const NavItemLink = styled(Link)`
  color: var(--color-black-2);
  text-decoration: none;
`;

const NavItemUl = styled.ul`
  list-style: none;
`;

const NavItemLi = styled.li``;

const Navigation = () => {
  const { isOpenSearchModal, openSearchModal } = useModalStore();
  // 열린 상태 나타내는 불린 값, 검색 모달 여는 함수
  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign");
    }
  }, [isLoggedIn, navigate]);

  const onClickLogout = () => {
    logout();
  };

  return (
    <>
      <Nav>
        <div>
          <NavItemLink to={`/`}>
            <LogoImg src={Logo} />
          </NavItemLink>
          <NavItemUl>
            <NavItemLi>
              <NavItemLink to={`/`}>
                <NavigationItem icon={faHouse} size="xl" text="Home" />
              </NavItemLink>
            </NavItemLi>
            <NavItemLi>
              <NavigationItem
                icon={faMagnifyingGlass}
                size="xl"
                text="Search"
                onClick={openSearchModal}
                //클릭 시 호출, 상태를 변경
              />
            </NavItemLi>
            {/* 검색 버튼 */}
            <NavItemLi>
              <NavigationItem icon={faUser} size="xl" text="Profile" />
            </NavItemLi>
          </NavItemUl>
        </div>
        <NavItemUl>
          <NavItemLi>
            <NavigationItem
              icon={faRightFromBracket}
              size="xl"
              text="Logout"
              onClick={onClickLogout}
            />
          </NavItemLi>
        </NavItemUl>
      </Nav>
      {isOpenSearchModal && <SearchModal />}
      {/* //조건부 랜더링
      // 검색 모달이 열려 있는 상태에서만 모달을 표시한다. */}
    </>
  );
};

export default Navigation;
