export type Course = {
  id: number;
  name: string;
  tag?: 'Most Popular' | 'New';
  image: string;
};

export type Domain = {
  id: number;
  name: string;
  learners: string;
  courses: Course[];
};

export const domains: Domain[] = [
  {
    id: 1,
    name: "ChatGPT",
    learners: "4M+ learners",
    courses: [
      {
        id: 1,
        name: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
        tag: "Most Popular",
        image: "https://picsum.photos/seed/ai1/600/360"
      },
       {
        id: 2,
        name: "ChatGPT Course For Work 2025 (Ethically)!",
        tag: "Most Popular",
        image: "https://picsum.photos/seed/ai2/600/360"
      },
       {
        id: 3,
        name: "2 - ChatGPT Course For Work 2025 (Ethically)!",
        tag: "New",
        image: "https://picsum.photos/seed/ai3/600/360"
      },
      {
        id: 4,
        name: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
        tag: "Most Popular",
        image: "https://picsum.photos/seed/ai1/600/360"
      },
       {
        id: 5,
        name: "ChatGPT Course For Work 2025 (Ethically)!",
        tag: "Most Popular",
        image: "https://picsum.photos/seed/ai2/600/360"
      },
       {
        id: 6,
        name: "2 - ChatGPT Course For Work 2025 (Ethically)!",
        tag: "New",
        image: "https://picsum.photos/seed/ai3/600/360"
      },
      {
        id: 7,
        name: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
        tag: "Most Popular",
        image: "https://picsum.photos/seed/ai1/600/360"
      },
       {
        id: 8,
        name: "ChatGPT Course For Work 2025 (Ethically)!",
        tag: "Most Popular",
        image: "https://picsum.photos/seed/ai2/600/360"
      },
       {
        id: 9,
        name: "2 - ChatGPT Course For Work 2025 (Ethically)!",
        tag: "New",
        image: "https://picsum.photos/seed/ai3/600/360"
      }

    ]
  },
  {
    id: 2,
    name: "Data Science",
    learners: "4M+ learners",
    courses: [
      {
        id: 4,
        name: "Data Science Bootcamp 2025",
        tag: "Most Popular",
        image: "https://picsum.photos/seed/ds1/600/360"
      },
       {
        id: 5,
        name: "Practical Data Science with Python",
        tag: "New",
        image: "https://picsum.photos/seed/ds2/600/360"
      },
       
    ]
  },
  {
    id: 3,
    name: "Python",
    learners: "49.9M+ learners",
    courses: [
      {
        id: 5,
        name: "Python for Beginners",
        image: "https://picsum.photos/seed/py1/600/360"
      }
    ]
  },
  {
    id: 4,
    name: "Python",
    learners: "49.9M+ learners",
    courses: [
      {
        id: 5,
        name: "Python for Beginners",
        image: "https://picsum.photos/seed/py1/600/360"
      }
    ]
  },
  {
    id: 5,
    name: "Python",
    learners: "49.9M+ learners",
    courses: [
      {
        id: 5,
        name: "Python for Beginners",
        image: "https://picsum.photos/seed/py1/600/360"
      }
    ]
  }
  

]

