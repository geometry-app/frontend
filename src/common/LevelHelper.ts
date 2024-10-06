export function getDemonDifficultyImage(isDemon: boolean, difficultyIcon: number) {
    if (difficultyIcon == -10)
        return `/images/difficulty_auto.png`;
    if (difficultyIcon == 0)
        return `/images/difficulty_undefined.png`
    if (difficultyIcon == 10)
        return `/images/difficulty_${isDemon ? "demon_" : ""}easy.png`;
    if (difficultyIcon == 20)
        return `/images/difficulty_${isDemon ? "demon_" : ""}normal.png`;
    if (difficultyIcon == 30)
        return `/images/difficulty_${isDemon ? "demon_" : ""}hard.png`;
    if (difficultyIcon == 40)
        return `/images/difficulty_${isDemon ? "demon_" : ""}harder.png`;
    if (difficultyIcon == 50)
        return `/images/difficulty_${isDemon ? "demon_" : ""}insane.png`;
    return "none";
}
