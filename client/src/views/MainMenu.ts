
const MainMenuScreen = () => `
  <div.
    <h1>NECRO</h1>

    <button id="start_game_btn">Start Game</button>
  </div>
`
interface MainMenuProps {
  startGame: () => void;
}

export const MainMenu = ({ startGame }: MainMenuProps) => {
  const overlay = document.querySelector('#overlay');
  if (!overlay) {
    console.error("overlay container not found.");
    return;
  }

  overlay.classList.add("show");
  overlay.innerHTML = MainMenuScreen();

  const handleStartGame = () => {
    startGame();
    overlay.classList.remove('show');
  }

  const startButton = document.querySelector('#start_game_btn');
  startButton?.addEventListener('click', handleStartGame);
}
