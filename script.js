const amount = document.querySelector('#symbols__amount');
const textarea = document.querySelector('#msg');
const needSms = document.querySelector('#sms__amount');
const toggle = document.querySelector('#toggle');
const sms = document.querySelector('#sms');

function isCyrillic(string) {
    for (let index = 0; index < string.length; index++){
       if (cyrillic.includes(string[index])){
        return true;
       }
    }
    return false;
}

function setValues() {
    if (isCyrillic(textarea.value)) {
        if (textarea.value.length > 70) {
            needSms.innerHTML = Math.ceil(textarea.value.length / 67);
        }
        else {
            needSms.innerHTML = 1;
        }
    }
    else {
        if (textarea.value.length > 160) {
            needSms.innerHTML = Math.ceil(textarea.value.length / 153);
        }
        else {
            needSms.innerHTML = 1;
        }
    }

    if (textarea.value.length === 0) {
        needSms.innerHTML = '';
        amount.innerHTML = '';
    }
}

const cyrillic = [
    'а','А','б','Б','в','В','г','Г','д','Д','е','Е',
    'ё','Ё','ж','Ж','з','З','и','И','й','Й','к','К',
    'л','Л','м','М','н','Н','о','О','п','П','р','Р',
    'с','С','т','Т','у','У','ф','Ф','х','Х','ц','Ц',
    'ч','Ч','ш','Ш','щ','Щ','ъ','Ъ','ы','Ы','ь','Ь',
    'э','Э','ю','Ю','я','Я','«','»','–','—','№','`',
];

const latin = [
    'a','A','b','B','v','V','g','G','d','D','e','E',
    'yo','Yo','zh','Zh','z','Z','i','I','y','Y','k','K',
    'l','L','m','M','n','N','o','O','p','P','r','R',
    's','S','t','T','u','U','f','F','h','H','ts','Ts',
    'ch','Ch','sh','Sh','sch','Sch','\'','\'','i','I','\'','\'',
    'e','E','u','U','ya','Ya','\"','\"','-','-','#','\'',
];

textarea.addEventListener('input', () => {
    amount.innerHTML = textarea.value.length;
    setValues();
});

toggle.addEventListener('change', () => {
    let newMsg = '';
    if (toggle.checked){
        textarea.value.split('').forEach(letter => {
            const index = cyrillic.indexOf(letter);
            if (index >= 0){
                newMsg += latin[index];
            } else {
                newMsg += letter;
            }
        });
        textarea.value = newMsg;
        setValues();
    } else {
        let oldMsg = textarea.value.split('');
        for (let i = 0; i < oldMsg.length; i++) {
            switch (oldMsg[i]) {
                case 'y':
                    if (oldMsg[i+1] === 'o') {
                        newMsg += 'ё';
                        i++;
                        break;
                    } else if (oldMsg[i+1] === 'a'){
                        newMsg += 'я';
                        i++;
                        break;
                    }

                case 'Y':
                    if (oldMsg[i+1] === 'o') {
                        newMsg += 'Ё';
                        i++;
                        break;
                    } else if (oldMsg[i+1] === 'a'){
                        newMsg += 'Я';
                        i++;
                        break;
                    }
            
                case 'z':
                    if (oldMsg[i+1] === 'h') {
                        newMsg += 'ж';
                        i++;
                        break;
                    }

                case 'Z':
                    if (oldMsg[i+1] === 'h') {
                        newMsg += 'Ж';
                        i++;
                        break;
                    }

                case 't':
                    if (oldMsg[i+1] === 's') {
                        newMsg += 'ц';
                        i++;
                        break;
                    }

                case 'T':
                    if (oldMsg[i+1] === 's') {
                        newMsg += 'Ц';
                        i++;
                        break;
                    }

                case 'c':
                    if (oldMsg[i+1] === 'h') {
                        newMsg += 'ч';
                        i++;
                        break;
                    }

                case 'C':
                    if (oldMsg[i+1] === 'h') {
                        newMsg += 'Ч';
                        i++;
                        break;
                    }

                case 's':
                    if (oldMsg[i+1] === 'h') {
                        newMsg += 'ш';
                        i++;
                        break;
                    } else if ((oldMsg[i+1] === 'c') && (oldMsg[i+2] === 'h')){
                        newMsg += 'щ';
                        i+=2;
                        break;
                    }

                case 'S':
                    if (oldMsg[i+1] === 'h') {
                        newMsg += 'Ш';
                        i++;
                        break;
                    } else if ((oldMsg[i+1] === 'c') && (oldMsg[i+2] === 'h')){
                        newMsg += 'Щ';
                        i+=2;
                        break;
                    }

                default:
                    const index = latin.indexOf(oldMsg[i]);
                    if (index >= 0){
                        newMsg += cyrillic[index];
                    } else {
                        newMsg += oldMsg[i];
                    }
                    break;
            }
        }
        textarea.value = newMsg;
        setValues();
    }
});

save.addEventListener('click', () => {
    sms.value=needSms.innerHTML;
});
