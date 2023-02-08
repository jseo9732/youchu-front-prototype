import { useContext, useEffect } from 'react';
import { UserContext } from '@/lib/context';
import { useRouter } from 'next/router';

interface IProps {
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
  ModalRef: React.RefObject<HTMLDivElement>;
}

export default function LogoutModal({ setShowLogout, ModalRef }: IProps) {
  const { userObj, setUserObj } = useContext(UserContext);
  const router = useRouter();

  // 모달 외 영역 클릭 시 종료
  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      if (
        !ModalRef.current ||
        !ModalRef.current.contains(e.target as HTMLDivElement)
      ) {
        setShowLogout(false);
      }
    };
    window.addEventListener('click', handleCloseModal);
    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 마이페이지 이동 함수
  const onProfileClick = () => {
    setShowLogout(false);
    router.push('/profile');
  };

  // 로그아웃 함수
  const onLogoutClick = () => {
    setShowLogout(false);
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    setUserObj({
      ...userObj,
      isLogin: false,
      data: null,
    });
  };
  return (
    <>
      <div className="logout_modal">
        <div className="my_info_btn" onClick={onProfileClick}>
          내 정보
        </div>
        <div className="my_info_btn logout_btn" onClick={onLogoutClick}>
          로그아웃
        </div>
      </div>

      <style jsx>{`
        .logout_modal {
          width: 192px;
          height: 106px;
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 0px 15px #00000029;
          opacity: 1;
          position: absolute;
          right: 0px;
        }

        .my_info_btn {
          padding: 16px;
          text-align: left;
          font-family: 'SHSN-B';
          font-size: 16px;
          line-height: 21px;
          letter-spacing: 0px;
          color: #000000;
          opacity: 1;
          cursor: pointer;
        }
        .my_info_btn:hover {
          color: #000000;
          background-color: #f9f9f9;
        }

        .logout_btn {
          color: #94969b;
        }
        .logout_btn:hover {
          color: #94969b;
        }
      `}</style>
    </>
  );
}
