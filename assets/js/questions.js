// Questions
let questionIndex = 0;

const questions = [
    {
        q: "How do we create an object?",
        a: ["Square Brackets","Double Quotes","Curly Braces"],
        c: "Curly Braces"
    },
    {
        q: "Question 2",
        a: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        c: "Choice 3"
    },
    {
        q: "Question 3",
        a: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        c: "Choice 2"
    },
    {
        q: "Question 4",
        a: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        c: "Choice 4"
    },
    {
        q: "Question 5",
        a: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        c: "Choice 1"
    },
    {
        q: "Question 6",
        a: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        c: "Choice 2"
    }
]

// Current Question is
questions[questionIndex].q
// Current answers 
for (let index = 0; index < questions[questionIndex].a.length; index++) {
    // be each answer
    const element = questions[questionIndex].a[index];
    
}