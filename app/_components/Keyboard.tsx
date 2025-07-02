type KeyboardProps = {
    handleKeyPress: (letter: string) => void;
}

const Keyboard = ({handleKeyPress}: KeyboardProps) => {
    const rows = ["Q,W,E,R,T,Y,U,I,O,P","A,S,D,F,G,H,J,K,L","BACKSPACE,Z,X,C,V,B,N,M,ENTER"];
    const handleClick = (letter: string) => {
        handleKeyPress(letter);
    }
  return (
    <div className="flex-center flex-col w-11/12 space-y-1">
      {rows.map((r, id) => (
        <div key={id} className="flex h-10 gap-1">
          {r.split(",").map((w, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(w)}
              className="size-8 border flex-center cursor-pointer"
            >
              {w}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard