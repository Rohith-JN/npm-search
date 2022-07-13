export const dynamicColors =  () => {
    const red = Math.floor(Math.random() * 210);
    const green = Math.floor(Math.random() * 210);
    const blue = Math.floor(Math.random() * 210);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
};

