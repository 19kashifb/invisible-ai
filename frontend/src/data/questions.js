export const questions = [
  {
    id: "algebra-1",
    topic: "Algebra",
    level: "Foundations",
    prompt: "Solve for x: 3x + 7 = 22",
    answers: ["x = 3", "x = 5", "x = 7", "x = 9"],
    correctAnswer: 1,
    explanation:
      "Subtract 7 from both sides to get 3x = 15, then divide by 3. So x = 5.",
  },
  {
    id: "biology-1",
    topic: "Cell biology",
    level: "Foundations",
    prompt:
      "Which cell structure is primarily responsible for producing ATP during cellular respiration?",
    answers: ["Ribosome", "Nucleus", "Mitochondrion", "Cell membrane"],
    correctAnswer: 2,
    explanation:
      "Mitochondria carry out most cellular respiration and produce the ATP cells use for energy.",
  },
  {
    id: "algebra-2",
    topic: "Algebra",
    level: "Building confidence",
    prompt: "What is the value of 2(a + 4) when a = 3?",
    answers: ["10", "14", "18", "22"],
    correctAnswer: 1,
    explanation: "Substitute 3 for a: 2(3 + 4) = 2 × 7 = 14.",
  },
  {
    id: "biology-2",
    topic: "Cell biology",
    level: "Building confidence",
    prompt: "What is the main role of a cell membrane?",
    answers: [
      "Store genetic information",
      "Control what enters and leaves the cell",
      "Make proteins",
      "Release energy from glucose",
    ],
    correctAnswer: 1,
    explanation:
      "The cell membrane is selectively permeable, helping regulate what moves into and out of the cell.",
  },


  {
    id: "geometry-1",
    topic: "Geometry",
    level: "Foundations",
    prompt: "What is the sum of the interior angles of a triangle?",
    answers: ["90°", "180°", "270°", "360°"],
    correctAnswer: 1,
    explanation:
      "The interior angles of every triangle add up to 180°.",
  },
  {
    id: "geometry-2",
    topic: "Geometry",
    level: "Building confidence",
    prompt: "A rectangle has a length of 8 cm and a width of 3 cm. What is its area?",
    answers: ["11 cm²", "22 cm²", "24 cm²", "48 cm²"],
    correctAnswer: 2,
    explanation:
      "Area = length × width, so 8 × 3 = 24 cm².",
  },
];
