export const quizDuration = 60;
export const questions = [
  {
    question:
      "Which of these is one of the\nbiggest shopping festivals in\nSaudi Arabia?",
    options: [
      "White Friday",
      "National Sale Day",
      "Riyadh Shopping Carnival",
      "Pink ash",
    ],
    answer: 2,
  },
  {
    question:
      "Which online payment\nmethod is commonly used in\nSaudi Arabia for shopping?",
    options: ["PayPal", "Venmo", "Mada", "Apple Cash"],
    answer: 3,
  },
  {
    question:
      "What is the most popular\nproduct catagory for online\nshopping in Saudi Arabia?",
    options: ["Electronics", "Books", "Furniture", "Groceries"],
    answer: 2,
  },
];
export function onStart() {
  console.log("Game Started");
}
export function onExit() {
  console.log("Game Exited");
}
export function onComplete(score) {
  console.log("Game Completed");
  console.log(score);
}
