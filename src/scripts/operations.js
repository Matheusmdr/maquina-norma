
const add = (R) =>{ // add 1 to a register
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

const sub = (R) =>{ //sub 1 from a register
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

const test = (value) => (value === 0) ? true : false //test if the value is 0

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


const copyRegister = (origin, dest) => ((test(origin.signal)) ? copyRegister_positive(origin, dest) : copyRegister_negative(origin, dest)) //copy one register to others


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

const multiplication = (a,b) => {
    let A = getRegister(a);
    let B = getRegister(b);
    let C = getRegister(0);
    let D = getRegister(0);

    copyRegister(A,[C]);

    if(test(C.signal)){ // C >= 0
        if(test(B.signal)){ // B >= 0

            while(C.magnitude != 0) {

                while(B.magnitude != 0){add(A); sub(B); add(D);}

                copyRegister(D,[B]);
                sub(C);
            }
        }
        else{ // B < 0
            
            while(C.magnitude != 0) {

                while(B.magnitude != 0){sub(A); add(B); sub(D);}

                copyRegister(D,[B]);
                sub(C);
            }

        }
    }
    else{ // C < 0
        if(test(B.signal)){ // B >= 0

            while(C.magnitude != 0) {

                while(B.magnitude != 0){sub(A); sub(B); add(D);}

                copyRegister(D,[B]);
                add(C);
            }
            
        }
        else{ // B < 0
            
            while(C.magnitude != 0) {

                while(B.magnitude != 0){add(A); add(B); sub(D);}

                copyRegister(D,[B]);
                add(C);
            }
        }
    }

    return [A, B, C, D]
}

const lessThan = (a,b) => {
    let A = getRegister(a);
    let B = getRegister(b);

    if(test(A.signal)){ // A >= 0
        if(test(B.signal)){ // B >= 0
            while(A.magnitude != 0 && B.magnitude != 0) {sub(A); sub(B);}

            if(test(A.magnitude) && !test(B.magnitude)) return [true, A, B] // A < B
        }

        return [false, A, B] // A >= B
    }
    else{ // A < 0
        if(!test(B.signal)){ // B < 0
            while(A.magnitude != 0 && B.magnitude != 0) {add(A); add(B);}

            if(test(B.magnitude) && !test(A.magnitude)) return [true, A, B] // A < B

            return [false, A, B] // A >= B
        }

        return [true, A, B] //B > 0
    }
}

const lessThanEqual = (a,b) => {
    let A = getRegister(a);
    let B = getRegister(b);

    if(test(A.signal)){ // A >= 0
        if(test(B.signal)){ // B >= 0
            while(A.magnitude != 0 && B.magnitude != 0) {sub(A); sub(B);}

            if(test(A.magnitude) && !test(B.magnitude)) return [true, A, B] // A < B

            if(test(A.magnitude) && test(B.magnitude)) return [true, A, B] // A == B
        }

        return [false, A, B] // B < 0
    }
    else{ // A < 0
        if(!test(B.signal)){ // B < 0
            while(A.magnitude != 0 && B.magnitude != 0) {add(A); add(B);}

            if(test(B.magnitude) && !test(A.magnitude)) return [true, A, B] // A < B

            if(test(B.magnitude) && test(A.magnitude)) return [true, A, B]  // A == B

            return [false, A, B] // A > B
        }

        return [true, A, B] // B >= 0
    }
}

const remainder = (dividend, divisor) =>{
    let A = getRegister(0);
    let B = getRegister(0);
    let C = getRegister(0);
    let D = getRegister(0);
    let E = getRegister(0);

    copyRegister(dividend, [A,C])
    copyRegister(divisor, [B,E])

    while(test(A.signal) && A.magnitude > 0) {

        while(B.magnitude != 0){sub(A); sub(B); add(D);}

        copyRegister(D,[B]);
    }

    copyRegister(C, [dividend])
    copyRegister(E, [divisor])

    return A.magnitude
}

const primeNumber = a => {
    let A = getRegister(a);
    let B = getRegister(0);
    let C = getRegister(0);
    let D = getRegister(0);

    if(test(A.magnitude)) return [false, A, B, C, D]; // A == 0

    sub(A);
    if(test(A.magnitude)) return [false, A, B, C, D]; // A == 1
    else add(A)

    // A >= 2
    copyRegister(A, [C, D])
    copyRegister(D, [A])

    //setting up the registers
    add(B)
    add(B)
    sub(C)
    sub(C)
    
    while(C.magnitude != 0){
        if(test(remainder(A, B))) return [false, A, B, C, D]; //it's prime number
        add(B)
        sub(C)
    }

    return [true, A, B, C, D]; //it's not prime number
}
