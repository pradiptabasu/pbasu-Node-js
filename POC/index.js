const var1 = 'f';
function f1(){
    const var1 = 'b'
    function report(){
        return var1;
    }
    return report()
}

console.log(f1())