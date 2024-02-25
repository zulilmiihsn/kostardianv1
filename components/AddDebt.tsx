import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "@/firebase/config";

const hoverSounds = () => {
  const audioElement = new Audio('assets/hover.flac');
  audioElement.play();
}

const clickSounds = () => {
  const audioElement = new Audio('assets/click.mp3');
  audioElement.play();
}

export default function AddDebt({ className, title }: any) {
  const [penghutang, setPenghutang] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [nominal, setNominal] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      penghutang.trim() !== "" && pemilik.trim() !== "" && nominal.trim() !== ""
    );
  }, [penghutang, pemilik, nominal]);

  const value = collection(database, "daftar hutang");

  const handleCreate = async () => {
    await addDoc(value, { penghutang: penghutang, pemilik: pemilik, uang: nominal });
    clickSounds();
    setPenghutang("");
    setPemilik("");
    setNominal("");
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    clickSounds();
  }

  const handleClose = () => {
    setIsOpen(false);
    clickSounds();
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        onMouseEnter={hoverSounds}
        className={`rounded-xl grid place-content-center bg-red-400 z-10 drop-shadow-xl text-black dark:text-white hover:-translate-y-1 transition ease-in-out ${className}`}
      >
        {title}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white w-[80%] md:w-1/3 h-1/2 p-4 rounded-lg flex flex-col justify-around text-black">
            <input
              value={penghutang}
              onChange={(e) => setPenghutang(e.target.value)}
              placeholder="Penghutang"
              className="h-1/5 outline-1 outline-gray-200 outline rounded-md pl-2"
            />
            <input
              value={pemilik}
              onChange={(e) => setPemilik(e.target.value)}
              placeholder="Pemilik"
              className="h-1/5 outline-1 outline-gray-200 outline rounded-md pl-2"
            />
            <input
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              placeholder="Nominal"
              className="h-1/5 outline-1 outline-gray-200 outline rounded-md pl-2"
            />
            <button
              onClick={handleCreate}
              onMouseEnter={hoverSounds}
              className={`bg-white ${
                isFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Create
            </button>

            <button onMouseEnter={hoverSounds} onClick={handleClose}>Batal</button>
          </div>
        </div>
      )}
    </div>
  );
}
