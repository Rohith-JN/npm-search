import router from "next/router";

export const dynamicColors = () => {
    const red = Math.floor(Math.random() * 210);
    const green = Math.floor(Math.random() * 210);
    const blue = Math.floor(Math.random() * 210);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
};

export const submitExamples = (e: { preventDefault: () => void; }, text: string) => {
    let arr = text.split(' ');
    arr = arr.filter(e => e !== 'vs');
    arr = arr.filter(function (value, index, array) {
        return array.indexOf(value) === index;
    });
    arr.forEach((value: string) => {
        encodeURIComponent(value)
    })
    e.preventDefault();
    if (text && arr.length === 1) {
        router.push({ pathname: `/package/${encodeURIComponent(text.toLowerCase())}` })
    }
    else if (text && arr.length > 1) {
        router.push({ pathname: `/packages/${arr}` })
    }
};

export const submitHandler: any = (e: any, inputRef: any) => {
    e.preventDefault();
    let arr = inputRef.current!.value.split(' ');
    arr = arr.filter((value: string) => value !== 'vs');
    arr = arr.filter(function (value: string, index: number, array: any) {
        return array.indexOf(value) === index;
    });
    arr.forEach((value: string) => {
        encodeURIComponent(value)
    })
    if (inputRef.current!.value && arr.length === 1) {
        router.push({ pathname: `/package/${encodeURIComponent(inputRef.current!.value.toLowerCase())}` },)
        inputRef.current!.value = '';
    }
    else if (inputRef.current!.value && arr.length > 1) {
        router.push({ pathname: `/packages/${arr}` })
        inputRef.current!.value = '';
    }
};

export async function getNames(input: string, setUnderline: any, setNames: any) {
    setUnderline(true)
    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${input}&size=5`)
    const data = await response.json();
    if (input.length > 0) {
      setNames(data.objects.map((item: { package: { name: any } }) => item.package.name));
    }
    else {
      setNames([]);
      setUnderline(false)
    }
  }