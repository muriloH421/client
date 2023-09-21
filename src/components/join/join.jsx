import style from "./join.module.css";
import { Input, Button } from "@mui/material";
import devLogo from "../../assets/devChat.png";
import io from "socket.io-client";
import { useEffect, useRef } from "react";

const join = ({ state, handShake }) => {
  const usernameRef = useRef();

  useEffect(()=>{
    usernameRef.current.focus();
  })
  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;

    const socket = await io.connect("172.16.100.85:3001");
    socket.emit("set_username", username);

    handShake(socket)
    state(true)
    // console.log(`Bem-Vindo ${username}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
    }
  };

  return (
    <>
      <div className={style["dev-logo"]}>
        <img src={devLogo} />
      </div>
      <div className={style["join-container"]}>
        <h2> Bem-Vindo ao DevChat!</h2>
        <Input
          inputRef={usernameRef}
          placeholder="Nome de usuário..."
          onKeyDown={handleKeyPress}
        />
        <Button
          sx={{ mt: 2, mb: 2 }}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Entrar
        </Button>
      </div>
    </>
  );
};

export default join;
