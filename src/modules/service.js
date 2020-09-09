export function test(params) {
    const data = Vue.observable({
        testName:'123'
    })
    return data;
}

export function test1(ctx) {
    return function(params) {
        
    }
}


class TestClass{
    constructor(){
        this.data = Vue.observable({
            testName:'123'
        }) 
    }

    handle(){
        this.data.testName = 123;
    }
}

function test3(params) {
    const data = Vue.observable({
        testName:'123'
    })

    const handle1 = ()=>{
        data.testName = 1232;
    }

    const handle2 = ()=>{
        data.testName = 'khafhsj';
    }
    '@/login/'
    '@/common/'
    '@modules/home/'
    '@modules/login/'
    '@/modules/common/'
    return {
        handle1,
        handle2
    }
}

