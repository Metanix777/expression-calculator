function expressionCalculator(expr) {
    
    while (/\(.*\)/.test(expr)) {
        let openingBracket = expr.lastIndexOf('(');
        let closingBracket = expr.indexOf(')', openingBracket + 1);
        let innerExpression = expr.slice(openingBracket + 1, closingBracket);
        expr = expr.replace(`(${innerExpression})`, expressionCalculator(innerExpression));
    }
    
    if (/[()]/.test(expr)) throw new Error('ExpressionError: Brackets must be paired');
    
    for (let mark of ['/', '*', '-', '+']) {
        
        let signRegEx = new RegExp(`\\d+\\s*\\${mark}\\s*[+\\-]?\\d+`);
        
        while(signRegEx.test(expr)) {
            let [exprPart, numOne, numTwo] = expr.match(`([+\\-]?[\\d.e\\-]+)\\s*\\${mark}\\s*([+\\-]?[\\d.e\\-]+)`);
            
            if (numTwo === '0' && mark === '/') throw new Error('TypeError: Division by zero.');
            
            if (mark === '+') expr = expr.replace(exprPart, +numOne + +numTwo);
            else if (mark === '-') expr = expr.replace(exprPart, numOne - numTwo);
            else if (mark === '*') expr = expr.replace(exprPart, numOne * numTwo);
            else if (mark === '/') expr = expr.replace(exprPart,  numOne / numTwo);
        }
    }
    
    return parseFloat(expr);
    
}

module.exports = {
    expressionCalculator
};