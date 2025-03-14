import Modal from "../../../components/Modal/index";
import Image from "next/image";

import info from "@/assets/icons/info.svg";

export default function DeportModal({
  nickName,
  setIsClose,
  setIsComplete,
}: {
  nickName: string;
  setIsClose: (val: boolean) => void;
  setIsComplete: (val?: string) => void;
}) {
  return (
    <Modal
      title={"알림창"}
      width={"xl:w-[788px] md:w-[60%] w-[80%]"}
      height={"h-[268px]"}
      setIsClose={setIsClose}
      setIsComplete={() => setIsComplete()}
    >
      <div
        className="
          flex items-center justify-center bg-[var(--color-point)] rounded-xl text-white 
          xl:text-xl text-md 
          xl:w-[707px] w-[80%] h-[96px] "
      >
        <Image src={info} alt="경고 아이콘" className="xl:h-32 h-16" />
        <div>{nickName} 님을 강퇴 하시겠습니까 ?</div>
      </div>
    </Modal>
  );
}
