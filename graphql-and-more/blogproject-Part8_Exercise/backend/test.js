const anecdotes = [
  {
    title: "Amazing things can happen by luck, mostly they don't.",
    author: "Unknown",
    url: "jujn.ml/homepage",
    user: {
      name: "Shaweta Rajput",
      id: "5e88bba4cf0e942188515fd0",
    },
    likes: 156,
    id: "5e88e9c77573ee2664ad2a3a",
  },
  {
    title: "Amazing site thanks 💕😍.",
    author: "Sahil Rajput",
    url: "Jujn.ml",
    user: {
      name: "Shaweta Rajput",
      id: "5e88bba4cf0e942188515fd0",
    },
    likes: 144,
    id: "5e8a087fa6d74d22e4b86824",
  },
  {
    title: "Amazing things are going on. James Bond",
    author: "Sahil Rajput",
    url: "Jyjn.ml/abbairaiya.",
    user: {
      name: "Shaweta Rajput",
      id: "5e88bba4cf0e942188515fd0",
    },
    likes: 72,
    id: "5e8b76ef72848320ecb6a02b",
  },
  {
    title: "Life is long race, to win it you may want to love something.",
    author: "Ramachandra",
    url: "jujn.ml/raiduinhell",
    user: {
      name: "Shaweta Rajput",
      id: "5e88bba4cf0e942188515fd0",
    },
    likes: 10,
    id: "5e8c5c12904aa52778cd7901",
  },
  {
    title: "Right to vote is great love to people of the democratic nation.",
    author: "Mr Insaaniyat ",
    url: "jujn.ml/go-for-vote",
    user: {
      name: "Shaweta Rajput",
      id: "5e88bba4cf0e942188515fd0",
    },
    likes: 50,
    id: "5e8c5c55904aa52778cd7902",
  },
  {
    title: "It is my pleasure ot built websites.",
    author: "Anuj",
    url: "jujn.ml/inthehell-of-ocean",
    user: {
      name: "Shaweta Rajput",
      id: "5e88bba4cf0e942188515fd0",
    },
    likes: 7,
    id: "5e8c5d08904aa52778cd7903",
  },
  {
    title: "It is my love to roam around in the mud.",
    author: "Rabbit's Union",
    url: "jujn.ml/i-invite-all-of-you",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 29,
    id: "5e8c5d73904aa52778cd7904",
  },
  {
    title:
      "It would be great if I get the deleted button here at the very first time I was added.",
    author: "Silly Thing",
    url: "jujn.ml/error-reported",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 11,
    id: "5e8c5dbf904aa52778cd7905",
  },
  {
    title:
      "It would be great if I get the deleted button here at the very first time I was added2.",
    author: "Coder",
    url: "jujn.ml/in-the-ocean",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 11,
    id: "5e8c5e53904aa52778cd7906",
  },
  {
    title: "Does, string literal allows multiple lines to the canvas.",
    author: "Curiosity.",
    url: "jujn.ml/jumping-in-hell",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 39,
    id: "5e8c5f85904aa52778cd790c",
  },
  {
    title: "Kalashakala in journey.",
    author: "Poonam Pandey",
    url: "jujn.ml/awesome-/n-thing",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 7,
    id: "5e8cd9d40a000f1560f8c705",
  },
  {
    title: "'console.log('culprit found')'",
    author: "Ramanujan",
    url: "jujn.ml/andhiJagataiya",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 9,
    id: "5eaabf5962e69027c078ab1e",
  },
  {
    title: "Prem in divine.",
    author: "Ponam Srivastava",
    url: "jujn.ml/agni-kund",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 9,
    id: "5eaabf8562e69027c078ab1f",
  },
  {
    title: "Life is precious",
    author: "Care Taker",
    url: "jujn.ml/apnaparaya",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 2,
    id: "5eaae04162e69027c078ab20",
  },
  {
    title: "Kanahiya is uptime.",
    author: "Roma",
    url: "juj.ml/sswift",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 1,
    id: "5eaae19762e69027c078ab21",
  },
  {
    title: "Dhritrashtra was blind in mind.",
    author: "Bheem",
    url: "jujn..ml/mahabhara-s1",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaae22662e69027c078ab22",
    likes: 0,
  },
  {
    title: "Ramaiya vastavailya",
    author: "Ronak",
    url: "jujn.ml/awesome",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaae26362e69027c078ab23",
    likes: 0,
  },
  {
    title: "Kokila in hell as hell in heaven.",
    author: "",
    url: "",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaae45662e69027c078ab24",
    likes: 0,
  },
  {
    title: "Cars are going to be fuel free.",
    author: "Elon Musk",
    url: "jujn.ml/reunion-party",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaae4de62e69027c078ab25",
    likes: 0,
  },
  {
    title: "I wud lobe to fly.",
    author: "Airman",
    url: "jujn.ml/freefund",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaae59f62e69027c078ab26",
    likes: 0,
  },
  {
    title: "radhe radhe radhe",
    author: "radhe",
    url: "jujn.ml/radheradhe-radhe",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaae61c62e69027c078ab27",
    likes: 0,
  },
  {
    title: "Do you love me?",
    author: "Karan",
    url: "jujn.ml/urmiooo",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    likes: 2,
    id: "5eaae64d62e69027c078ab28",
  },
  {
    title: "Kukaram de dhan sapatti.",
    author: "Adharam",
    url: "apnasapnamoneymoney",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaae6bc62e69027c078ab29",
    likes: 0,
  },
  {
    title: "Komal",
    author: "Anun",
    url: "Website69",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaaf81c62e69027c078ab2a",
    likes: 0,
  },
  {
    title: "Panama",
    author: "Remona",
    url: "Timothy",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eaaf97562e69027c078ab2b",
    likes: 0,
  },
  {
    title: "Komal",
    author: "Anjani",
    url: "Remona",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eab036e62e69027c078ab2c",
    likes: 0,
  },
  {
    title: "Mr. Title",
    author: "Mr. Author",
    url: "Mr. Url",
    user: {
      name: "Bruno Rajput",
      id: "5e8c589672848320ecb6a02c",
    },
    id: "5eab044962e69027c078ab2d",
    likes: 0,
  },
];
const props = { anecdotes };
const users = props.anecdotes.map((m) => m.user.name);
const unique = [...new Set(users)];
const count = [];

unique.forEach((val) => count.push(users.filter((u) => u === val).length));
unique.forEach((v,i) => console.log(`${v}: ${count[i]}`))
console.log('  "*************************************************************************"')
