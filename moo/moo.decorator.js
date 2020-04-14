const mooDecorator = {

    decorate: function(lexer) {

        // Module augmentation
        // Wrap 'var lexer = function(lexer)' in a function with return
        return (function (lexer) {
    
            lexer.tokens = [];
        
            lexer.init = (lx) => {
                
                lexer.tokens = []
        
                for (let token of lx) {
                  lexer.tokens.push(token);  
                }
            };
        
            lexer.log = () => {
        
                lexer.tokens.forEach(t => console.log(t));
            },
            
            lexer.get = (from, to, tokensGroup) => {
        
                matchedList = [];
                //buffer = ''
                tokensList = []
                matched = false;
                efFrom = Array.isArray(from) ? from : [from]
                efTo = Array.isArray(to) ? to : [to]
                tokensGroup = tokensGroup ? tokensGroup: lexer.tokens;
        
                for (let token of tokensGroup) {
        
                    if (efFrom.includes(token.type)) {
                        matched = true;
                    }
        
                    if (matched) tokensList.push(token);//buffer += token.text
        
                    if (matched && efTo.includes(token.type)) {// && buffer) {
                        matched = false;
                        matchedList.push({tokens: tokensList, plainText: tokensList.join('') });
                        tokensList = []
                        //buffer = ''
                    }
                }
        
                return matchedList;
            },
        
            lexer.getSplitted = (from, to, splittedBy) => {
        
                matchedList = lexer.get(from, to)
        
                matchedListSplitted = []
                if (matchedList) {
                    matchedList.forEach(m => matchedListSplitted.push({
                        token: m.tokens,
                        fullMatch: m.plainText, 
                        splitted: m.plainText.split(splittedBy)}));
                }
                return matchedListSplitted;
            },
        
            lexer.getHierarchy = (rootFrom, rootTo, childFrom, chilTo) => {
        
                var matchedList = lexer.get(rootFrom, rootTo);
        
                matchedList.forEach(m => {
        
                    m.childs = lexer.get(childFrom, chilTo, m.tokens);
        
                })
        
                return matchedList;
        
            }
        
            // TODO get from..to balanced with (up and down)
        
            return lexer;
        
        }(lexer));
    }
}

module.exports = mooDecorator
