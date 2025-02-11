export const randomStringGenerator = (length = 100) =>{

    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ';
    let lengthOfCharacters = characters.length;

    let randomCharacters = '';

    for (let i = 0; i < length; i++){
        let randomNumber = Math.floor(Math.random()* (lengthOfCharacters-1))
        randomCharacters += characters[randomNumber]
    }
    return randomCharacters;
}
//console.log(randomStringGenerator())


 
