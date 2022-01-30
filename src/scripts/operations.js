
const add = (R) =>{
    if(test(R.signal)){ //>= 0
        R.magnitude++;
    }
    else{ // < 0
        R.magnitude--;
        if(test(R.magnitude)){ // = 0
            R.signal--;
        }
    }
}

const sub = (R) =>{
    if(test(R.signal)){ // >= 0
        if(test(R.magnitude)){ // = 0
            R.signal++;
            R.magnitude++;
        }
        else{ // > 0
            R.magnitude--;
        }
    }
    else{ // < 0
        R.magnitude++;
    }
}

const test = (value) => (value === 0) ? true : false

const getRegister = (value) => {
    let R = {signal: ((value<0) ? 1 : 0), magnitude: 0}

    if(test(R.signal)) for(;value != 0;R.magnitude++,value--);
    else for(;value != 0;R.magnitude++,value++);

    return R
}

const sumWithoutPreserving = (a,b) => {
    let A = getRegister(a);
    let B = getRegister(b);

    if(test(A.signal)){ // A >= 0
        if(test(B.signal)){ // B >= 0
            while(B.magnitude != 0) {add(A); sub(B);}
        }
        else{ // B < 0
            while(B.magnitude != 0) {sub(A); add(B);}
        }
    }
    else{ // A < 0
        if(test(B.signal)){ // B >= 0
            while(B.magnitude != 0) {add(A); sub(B);}
        }
        else{ // B < 0
            while(B.magnitude != 0) {sub(A); add(B);}
        }

    }

    return [A, B]
}

const copyRegister_positive = (origin, dest) => {
    while(origin.magnitude != 0){
        sub(origin);
        for(let i = 0; i < dest.length; i++){
            add(dest[i]);
        }
    }
}

const copyRegister_negative = (origin, dest) => {
    while(origin.magnitude != 0){
        add(origin);
        for(let i = 0; i < dest.length; i++){
            sub(dest[i]);
        }
    }
}


const copyRegister = (origin, dest) => ((test(origin.signal)) ? copyRegister_positive(origin, dest) : copyRegister_negative(origin, dest))


const SumPreserving = (a,b) => {
    let A = getRegister(a);
    let B = getRegister(b);
    let C = getRegister(0);
    let D = getRegister(0);
    let E = getRegister(0);

    copyRegister(A, [C,E]);

    if(test(C.signal)){ // C >= 0
        if(test(B.signal)){ // B >= 0
            while(B.magnitude != 0) {add(C); sub(B); add(D);}
        }
        else{ // B < 0
            while(B.magnitude != 0) {sub(C); add(B); sub(D);}
        }
    }
    else{ // C < 0
        if(test(B.signal)){ // B >= 0
            while(B.magnitude != 0) {add(C); sub(B); add(D);}
        }
        else{ // B < 0
            while(B.magnitude != 0) {sub(C); add(B); sub(D);}
        }
    }

    copyRegister(D, [B]);
    copyRegister(E, [A]);

    return [A, B, C, D, E]
}


