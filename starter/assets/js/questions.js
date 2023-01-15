// conversion of a set of question object answers to an array...
// requires knowing the start end indicies in all their majesty.
const questionObjectAnswerStartIndex = 1;
const questionObjectAnswerEndIndex = 5; // TODO find out why this works
// the quiz is an array of question objects.
const codeQuestions = [
    {   question: "Naming convention: Which is best practice when naming JS variables?",
        answer: "camelCase",
        dummy1: "UPPERCASE",
        dummy2: "PascalCase",
        dummy3: "lowercase"
    },
    {   question: "Naming convention: Which is best practice when naming a JS constant?",
        answer: "UPPERCASE",
        dummy1: "camelCase",
        dummy2: "PascalCase",
        dummy3: "lowercase"
    },
    {   question: "Naming convention: Which is the most suitable Boolean variable name?",
        answer: "isUser",
        dummy1: "User",
        dummy2: "getUser",
        dummy3: "beUser"
    },
    {   question: "JavaScript language: Which is not a JavaScript keyword?",
        answer: "method",
        dummy1: "yield",
        dummy2: "public",  
        dummy3: "implements"
    }, 
    {   question: "JavaScript language: Which is not a JavaScript statement?",
        answer: "public",
        dummy1: "yield",
        dummy2: "case",
        dummy3: "var"
    },
    {   question: "RegExp: Which string is not matched by /e.n/ ?",
        answer: "Emmentel",
        dummy1: "rennet",
        dummy2: "toe nails",
        dummy3: "sturgeon"
    }
]