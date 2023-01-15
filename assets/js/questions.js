// conversion of a set of question object answers to an array...
// requires knowing the start end indicies in all their majesty.
const questionObjectAnswerStartIndex = 1;
const questionObjectAnswerEndIndex = 5;
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
        dummy3: "leaning"
    },
    {   question: "API: What does JSON stand for?",
        answer: "Java Script Object Notation",
        dummy1: "Java Script Operator Name",
        dummy2: "Java Script Object Name",
        dummy3: "Java Script Operator Notation"
    },
    {   question: "API: What does CHEESE stand for?",
        answer: "Cryogenic Hydrogen EESE",
        dummy1: "Crisp Heuristic Easiness",
        dummy2: "C language mouse heap",
        dummy3: "Clean Happy Elementary Spatial"
    },
    {   question: "Which is JavaScript data type?",
        answer: "Symbol",
        dummy1: "Time",
        dummy2: "Array",
        dummy3: "Char"
    },
    {   question: "Which is not a JavaScript data type?",
        answer: "Array",
        dummy1: "Object",
        dummy2: "undefined",
        dummy3: "null"
    },
    {   question: "Which is feature of JavaScript?",
        answer: "interpreted",
        dummy1: "compiled",
        dummy2: "purely functional",
        dummy3: "scaleable concurrency"
    },
    {   question: "Is JavaScript type-sensitive?",
        answer: "yes",
        dummy1: "no",
        dummy2: "yes and no",
        dummy3: "sometimes"
    },
    {   question: "Which method does not access HTML elements?",
        answer: "getElementHTML('HTMLname')",
        dummy1: "getElementByID('idname')",
        dummy2: "getElementByTagName('tagname')",
        dummy3: "querySelector('css-selector')"
    },
    {   question: "Which is not an option for JavaScript code location?",
        answer: "outline",
        dummy1: "inline",
        dummy2: "external",
        dummy3: "internal"
    }
]