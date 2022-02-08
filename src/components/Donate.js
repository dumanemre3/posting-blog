import React from "react";
import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";
import Checkbox from "@material-tailwind/react/Checkbox";
import ahbapnew from "../images/ahbapnew.jpeg";
import AtaürkçüDüşünceDerneği from "../images/AtaürkçüDüşünceDerneği.jpeg";
import Darüşşafaka from "../images/darüşşafaka.jpeg";
import ÇağdaşYaşam from "../images/ÇağdaşYaşam.png";
import Lösev from "../images/Lösev.jpeg";
import EğitimVakfi from "../images/eğitimvakfi.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Donate = () => {
  const [isDisabled, setDisabled] = React.useState(true);
  const notify = () =>
    toast.dark("Your donation has been successful. Thanks!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: toast.TYPE.SUCCESS,
    });

  const DonateArray = [
    {
      name: "Atatürkçü Düşünce Derneği (ADD)",
      imageSrc: AtaürkçüDüşünceDerneği,
    },
    {
      name: "Çağdaş Yaşamı Destekleme Derneği (ÇYDD)",
      imageSrc: ÇağdaşYaşam,
    },
    {
      name: "TEGV (Türkiye Eğitim Gönüllüleri Vakfı)",
      imageSrc: EğitimVakfi,
    },
    {
      name: "LÖSEV",
      imageSrc: Lösev,
    },
    {
      name: "DARÜŞŞAFAKA",
      imageSrc: Darüşşafaka,
    },
    {
      name: "Ahbap Derneği",
      imageSrc: ahbapnew,
    },
  ];
  const changeDisable = () => {
    setDisabled(false);
  };
  return (
    <div>
      <form>
        <header className="flex justify-between items-center p-4 border-b border-gray-extraLight text-white">
          <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-2">
            Donate
          </span>
          <img
            src={_Post_Blog_Logo}
            alt=""
            className="w-10 h-10 rounded-t-lg"
          ></img>
        </header>

        <div className="min-h-screen">
          <div className="grid grid-cols-3 gap-4 p-4 text-center">
            {DonateArray.map((donate) => {
              return (
                <div className="donate-bar relative">
                  <img
                    className="rounded-md border-black border-solid border-2 "
                    src={donate.imageSrc}
                    alt={donate.name}
                  ></img>
                  <div className="my-3 font-semibold">{donate.name}</div>
                  <input
                    className="absolute bottom-2 left-auto right-auto"
                    type="radio"
                    id="checkbox"
                    name="donate"
                    onChange={changeDisable}
                  ></input>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row text-2xl justify-center items-center my-5">
            <div className="ml-4 text-gray-300">Donation Amount:</div>
            <div className="ml-4">
              <div className="flex justify-center">
                <div className="xl:w-96">
                  <select
                    className="form-select appearance-none"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      Choose Your Donation Amount
                    </option>
                    <option value="1">10 TL</option>
                    <option value="2">15 TL</option>
                    <option value="3">20 TL</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-2xl justify-center items-center my-5">
            <button
              className="bg-indigo-600 disabled:bg-indigo-400 text-white rounded-md px-8 py-2 font-medium mb-2"
              type="button"
              disabled={isDisabled}
              onClick={notify}
            >
              DONATE
            </button>
            <ToastContainer></ToastContainer>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Donate;
