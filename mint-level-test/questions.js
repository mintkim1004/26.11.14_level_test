/* =====================================================================
   🌿 Ms. Mint's English Garden — 문제은행 (questions.js)
   ---------------------------------------------------------------------
   ✏️ 문제 고치는 방법 (원장님용)
   1) 아래에서 고치고 싶은 문장을 찾아 글자만 바꾸고 저장하세요.
   2) 보기(choices)는 항상 "정답을 맨 앞"에 씁니다.
      → 학생 화면에서는 보기 순서가 자동으로 섞여 나옵니다.
   3) 레벨 숫자: 0=K 초, 1=G1, 2=G2, 3=G3, 4=G4, 5=G4+
   4) 한 줄이 한 문제입니다. 문제를 추가하려면 비슷한 줄을 복사해 붙여넣으세요.
      (문제 번호 id는 자동으로 붙습니다: 예) voc-L2-03)
   5) 따옴표(" ")와 쉼표(,)를 지우지 않도록 조심하세요.
      고친 뒤 index.html?test=1 을 열어 "문제은행 점검"이 통과하는지 확인하면 안전합니다.

   ※ 모든 단어·문장·지문은 이 공부방을 위해 새로 창작했습니다.
     (Journeys 교과서 본문이나 AR/Lexile 공식 지문을 옮기지 않았습니다)
   ※ 지문의 lexile / ar 값은 작성자가 추정한 참고값입니다.
   ===================================================================== */
(function () {
  const bank = [];
  const counters = {};
  const AREA_CODE = { phonics: "pho", vocabulary: "voc", grammar: "gra", reading: "rea" };

  // 문제 한 개를 문제은행에 넣고 번호(id)를 자동으로 붙입니다.
  function add(area, level, item) {
    const key = area + level;
    counters[key] = (counters[key] || 0) + 1;
    const id = `${AREA_CODE[area]}-L${level}-${String(counters[key]).padStart(2, "0")}`;
    bank.push({ id, area, level, ...item });
  }

  /* ---------- 문제 만드는 도우미 ---------- */
  // 파닉스: 화면에 크게 보여 줄 글자/단어 (학생이 소리 내어 읽고, 원장님이 ✅/❌ 클릭)
  function phonics(level, skill, word, prompt = "Read this word out loud.") {
    add("phonics", level, { type: "read-aloud", prompt, word, skill });
  }
  // 어휘: 그림(이모지) 보고 단어 고르기
  function vocabPic(level, skill, picture, choices) {
    add("vocabulary", level, { type: "picture-mcq", prompt: "Which word matches the picture?", picture, choices, answer: 0, skill });
  }
  // 어휘: 🔊 소리를 듣고 단어 고르기 (사이트워드)
  function vocabListen(level, skill, sayWord, choices) {
    add("vocabulary", level, { type: "mcq", prompt: "Listen and choose the word.", tts: sayWord, choices, answer: 0, skill });
  }
  // 어휘: 일반 객관식
  function vocab(level, skill, prompt, choices, picture) {
    add("vocabulary", level, { type: picture ? "picture-mcq" : "mcq", prompt, picture, choices, answer: 0, skill });
  }
  // 문법: 빈칸(___)에 알맞은 말 고르기
  function grammar(level, skill, prompt, choices, picture) {
    add("grammar", level, { type: picture ? "picture-mcq" : "mcq", prompt, picture, choices, answer: 0, skill });
  }
  // 독해: 지문 1개 + 문항 여러 개. questions = [ [세부기술, 질문, [정답, 오답, 오답]], ... ]
  let passageNo = 0;
  function passage(level, title, lexile, ar, text, questions) {
    passageNo += 1;
    const p = { id: "P" + String(passageNo).padStart(2, "0"), title, text, lexile, ar };
    for (const [skill, prompt, choices] of questions) {
      add("reading", level, { type: "passage", prompt, choices, answer: 0, skill, passage: p });
    }
  }

  /* =====================================================================
     🔤 PHONICS (소리 내어 읽기) — 레벨당 8개
     ===================================================================== */
  // L0 알파벳 소리
  const LETTER = "What sound does this letter make?";
  phonics(0, "letter sound m", "m", LETTER);
  phonics(0, "letter sound s", "s", LETTER);
  phonics(0, "letter sound t", "t", LETTER);
  phonics(0, "letter sound a (short)", "a", LETTER);
  phonics(0, "letter sound b", "b", LETTER);
  phonics(0, "letter sound p", "p", LETTER);
  phonics(0, "letter sound f", "f", LETTER);
  phonics(0, "letter sound n", "n", LETTER);
  // L1 CVC (짧은 모음)
  phonics(1, "CVC short a", "cat");
  phonics(1, "CVC short u", "sun");
  phonics(1, "CVC short i", "pig");
  phonics(1, "CVC short e", "bed");
  phonics(1, "CVC short o", "hot");
  phonics(1, "CVC short a", "map");
  phonics(1, "CVC short u", "rug");
  phonics(1, "CVC short i", "fin");
  // L2 blends + digraphs
  phonics(2, "blend fr", "frog");
  phonics(2, "blend st", "stop");
  phonics(2, "blend cl", "clap");
  phonics(2, "blend dr", "drum");
  phonics(2, "digraph sh", "ship");
  phonics(2, "digraph ch", "chop");
  phonics(2, "digraph th", "thin");
  phonics(2, "digraph ck", "duck");
  // L3 long vowel (silent e, vowel teams)
  phonics(3, "silent e (a_e)", "cake");
  phonics(3, "silent e (i_e)", "bike");
  phonics(3, "silent e (o_e)", "home");
  phonics(3, "silent e (u_e)", "cute");
  phonics(3, "vowel team ai", "rain");
  phonics(3, "vowel team ee", "feet");
  phonics(3, "vowel team oa", "boat");
  phonics(3, "vowel team ay", "play");
  // L4 r-controlled
  phonics(4, "r-controlled ar", "car");
  phonics(4, "r-controlled or", "fork");
  phonics(4, "r-controlled er", "her");
  phonics(4, "r-controlled ir", "bird");
  phonics(4, "r-controlled ur", "turn");
  phonics(4, "r-controlled ar", "start");
  phonics(4, "r-controlled or", "corn");
  phonics(4, "r-controlled ur", "nurse");
  // L5 다음절
  phonics(5, "two syllables (VC/CV)", "rabbit");
  phonics(5, "compound word", "sunset");
  phonics(5, "three syllables", "butterfly");
  phonics(5, "two syllables (VC/CV)", "basket");
  phonics(5, "two syllables (VC/CV)", "pumpkin");
  phonics(5, "suffix -ful", "wonderful");
  phonics(5, "two syllables (VC/CV)", "napkin");
  phonics(5, "three syllables", "remember");

  /* =====================================================================
     🌼 VOCABULARY — 레벨당 8개
     ===================================================================== */
  // L0 그림 단어 + pre-primer 사이트워드
  vocabPic(0, "picture word: animal", "🐶", ["dog", "cat", "pig"]);
  vocabPic(0, "picture word: food", "🍎", ["apple", "ball", "egg"]);
  vocabPic(0, "picture word: nature", "☀️", ["sun", "bed", "hat"]);
  vocabPic(0, "picture word: animal", "🐟", ["fish", "cup", "bus"]);
  vocabPic(0, "picture word: toy", "⚽", ["ball", "box", "bag"]);
  vocabPic(0, "picture word: vehicle", "🚗", ["car", "cat", "cup"]);
  vocabListen(0, "sight word (pre-primer): the", "the", ["the", "and", "is"]);
  vocabListen(0, "sight word (pre-primer): can", "can", ["can", "cat", "car"]);
  // L1 primer 사이트워드, 가족·동물·학교
  vocabPic(1, "picture word: animal", "🐸", ["frog", "fox", "fan"]);
  vocabPic(1, "picture word: family", "👨‍👩‍👧", ["family", "farm", "fork"]);
  vocabPic(1, "picture word: weather", "🌧️", ["rain", "ring", "rock"]);
  vocabPic(1, "picture word: school", "🏫", ["school", "shop", "ship"]);
  vocab(1, "category: colors", "Which word is a color?", ["green", "jump", "under"]);
  vocab(1, "category: animals", "Which one is an animal?", ["rabbit", "table", "window"]);
  vocabListen(1, "sight word (primer): want", "want", ["want", "went", "what"]);
  vocabListen(1, "sight word (primer): said", "said", ["said", "sad", "sand"]);
  // L2 Grade 1–2 주제어
  vocab(2, "antonyms (basic)", "The opposite of hot is ___.", ["cold", "big", "fast"]);
  vocabPic(2, "picture word: body", "🦷", ["tooth", "tool", "toast"]);
  vocab(2, "animal babies", "A baby cat is a ___.", ["kitten", "puppy", "calf"]);
  vocab(2, "context: nature", "At night, we can see stars in the ___.", ["sky", "ground", "sea"]);
  vocabPic(2, "picture word: plants", "🌱", ["plant", "plate", "plane"]);
  vocab(2, "community helpers", "A ___ helps sick people.", ["doctor", "farmer", "baker"]);
  vocab(2, "word meaning", "Which word means 'very big'?", ["huge", "tiny", "soft"]);
  vocab(2, "habitats", "Whales live in the ___.", ["ocean", "desert", "forest"]);
  // L3 Grade 2–3 주제어, 반의어
  vocab(3, "antonyms", "The opposite of 'quiet' is ___.", ["loud", "calm", "slow"]);
  vocab(3, "people words", "An ___ is a person who writes books.", ["author", "pilot", "coach"]);
  vocab(3, "synonyms (feelings)", "Which word means 'scared'?", ["afraid", "angry", "proud"]);
  vocab(3, "categories", "Rain, snow, and wind are kinds of ___.", ["weather", "food", "clothes"]);
  vocab(3, "antonyms", "The opposite of 'empty' is ___.", ["full", "open", "clean"]);
  vocab(3, "science words", "Plants need water and ___ to grow.", ["sunlight", "sugar", "paper"]);
  vocab(3, "verb meaning", "Which word means 'to look for'?", ["search", "shout", "share"]);
  vocab(3, "context clues", "Tom was lost, so he used a ___ to find his way.", ["map", "spoon", "pillow"]);
  // L4 동의어, 문맥 속 뜻 추론
  vocab(4, "synonyms", "Which word means the same as 'enormous'?", ["huge", "tiny", "thin"]);
  vocab(4, "context clues", "Mia was exhausted after the long race. She wanted to sleep. 'Exhausted' means ___.", ["very tired", "very happy", "very hungry"]);
  vocab(4, "synonyms", "Which word means the same as 'begin'?", ["start", "finish", "stay"]);
  vocab(4, "context clues", "The path was so narrow that only one person could walk on it. 'Narrow' means ___.", ["not wide", "very long", "very dark"]);
  vocab(4, "science words", "A scientist does an ___ to test an idea.", ["experiment", "excuse", "envelope"]);
  vocab(4, "antonyms", "Which word means the opposite of 'generous'?", ["selfish", "kind", "brave"]);
  vocab(4, "context clues", "Ben was curious about the box. He wanted to know what was inside. 'Curious' means ___.", ["wanting to know", "feeling sleepy", "feeling angry"]);
  vocab(4, "synonyms", "Which word means the same as 'repair'?", ["fix", "break", "carry"]);
  // L5 접두사·접미사, 학습 어휘
  vocab(5, "prefix un-", "'Unhappy' means ___.", ["not happy", "very happy", "happy again"]);
  vocab(5, "prefix re-", "'Reread' means ___.", ["read again", "not read", "read slowly"]);
  vocab(5, "suffix -less", "A 'careless' person is ___.", ["not careful", "very careful", "careful again"]);
  vocab(5, "root vis", "Which word means 'able to be seen'?", ["visible", "invisible", "visitor"]);
  vocab(5, "academic word", "To 'predict' means to ___.", ["guess what will happen", "remember what happened", "explain a word"]);
  vocab(5, "academic word", "An animal's 'habitat' is ___.", ["the place where it lives", "the food it eats", "the sound it makes"]);
  vocab(5, "suffix -er", "teach + ___ = a person who teaches", ["-er", "-ful", "-ly"]);
  vocab(5, "academic word", "To 'compare' two things means to ___.", ["find how they are alike and different", "put them away", "make them bigger"]);

  /* =====================================================================
     🌿 GRAMMAR — 레벨당 8개
     ===================================================================== */
  // L0 a/an, this/these, I am
  grammar(0, "be verb: I am", "I ___ a girl.", ["am", "is", "are"]);
  grammar(0, "article an", "This is ___ apple.", ["an", "a", "two"], "🍎");
  grammar(0, "article a", "This is ___ dog.", ["a", "an", "two"], "🐶");
  grammar(0, "this (singular)", "___ is a cat.", ["This", "These", "Those"], "🐱");
  grammar(0, "be verb: you are", "You ___ my friend.", ["are", "am", "is"]);
  grammar(0, "be verb: it is", "It ___ red.", ["is", "am", "are"], "🔴");
  grammar(0, "article an", "I have ___ egg.", ["an", "a", "two"], "🥚");
  grammar(0, "possessive my", "Hello! ___ name is Mia.", ["My", "I", "Me"]);
  // L1 be동사, 복수 -s/-es, 현재진행
  grammar(1, "be verb: they are", "They ___ my friends.", ["are", "is", "am"]);
  grammar(1, "be verb: she is", "She ___ a teacher.", ["is", "are", "am"]);
  grammar(1, "plural -s", "I have two ___.", ["cats", "cat", "cates"], "🐱🐱");
  grammar(1, "present progressive", "Look! The dog is ___.", ["running", "run", "runs"], "🐕💨");
  grammar(1, "present progressive (we are)", "We ___ playing soccer.", ["are", "is", "am"]);
  grammar(1, "plural -es", "There are three ___.", ["boxes", "boxs", "box"], "📦📦📦");
  grammar(1, "present progressive", "He is ___ a book.", ["reading", "read", "reads"], "📖");
  grammar(1, "be verb question", "___ you happy?", ["Are", "Is", "Am"]);
  // L2 과거형 -ed, 불규칙 과거, 3인칭 -s
  grammar(2, "past tense -ed", "Yesterday, I ___ soccer.", ["played", "play", "playing"]);
  grammar(2, "3rd person -s", "She ___ to school every day.", ["walks", "walk", "walking"]);
  grammar(2, "past tense -ed", "Last night, we ___ a movie.", ["watched", "watch", "watches"]);
  grammar(2, "irregular past", "He ___ his lunch an hour ago.", ["ate", "eats", "eat"]);
  grammar(2, "3rd person -s", "My dad ___ coffee every morning.", ["drinks", "drink", "drinking"]);
  grammar(2, "irregular past", "I ___ to the park yesterday.", ["went", "go", "goes"]);
  grammar(2, "does not", "Tom ___ not like carrots.", ["does", "do", "is"]);
  grammar(2, "irregular past", "They ___ a big fish last summer.", ["caught", "catch", "catched"]);
  // L3 비교급·최상급, 미래 will, 접속사 and/but/so/or
  grammar(3, "comparative -er", "An elephant is ___ than a dog.", ["bigger", "big", "biggest"]);
  grammar(3, "superlative -est", "This is the ___ day of the year.", ["hottest", "hotter", "hot"]);
  grammar(3, "future will", "Tomorrow, I ___ visit my grandma.", ["will", "was", "did"]);
  grammar(3, "conjunction but", "I like apples, ___ I don't like bananas.", ["but", "so", "or"]);
  grammar(3, "conjunction so", "It was raining, ___ we stayed inside.", ["so", "but", "or"]);
  grammar(3, "comparative -ier", "My bag is ___ than yours.", ["heavier", "heavy", "heaviest"]);
  grammar(3, "conjunction or", "Do you want milk ___ juice?", ["or", "but", "so"]);
  grammar(3, "superlative -est", "She is the ___ runner in our class.", ["fastest", "faster", "fast"]);
  // L4 because/when, 조동사, 소유대명사
  grammar(4, "conjunction because", "I wore a coat ___ it was cold.", ["because", "but", "or"]);
  grammar(4, "conjunction when", "___ I got home, I ate a snack.", ["When", "But", "Or"]);
  grammar(4, "modal should", "You ___ wear a helmet when you ride a bike.", ["should", "are", "does"]);
  grammar(4, "possessive pronoun hers", "This book is not mine. It is ___.", ["hers", "her", "she"]);
  grammar(4, "modal can (request)", "___ I borrow your pencil?", ["Can", "Do", "Am"]);
  grammar(4, "possessive pronoun ours", "That red bike is ___. We bought it yesterday.", ["ours", "our", "us"]);
  grammar(4, "modal can (ability)", "Most birds ___ fly, but penguins can't.", ["can", "doesn't", "is"]);
  grammar(4, "modal must", "We ___ be quiet in the library. It's a rule.", ["must", "did", "were"]);
  // L5 현재완료, 관계대명사
  grammar(5, "present perfect", "I have ___ this book three times.", ["read", "reading", "reads"]);
  grammar(5, "present perfect", "She has ___ in Seoul since 2020.", ["lived", "live", "living"]);
  grammar(5, "relative pronoun who", "The boy ___ won the race is my brother.", ["who", "which", "where"]);
  grammar(5, "relative pronoun which", "This is the book ___ I told you about.", ["which", "who", "where"]);
  grammar(5, "present perfect question", "___ you ever seen a whale?", ["Have", "Did", "Are"]);
  grammar(5, "for vs. since", "We have known each other ___ five years.", ["for", "since", "ago"]);
  grammar(5, "relative pronoun that", "The cake ___ Mom made was delicious.", ["that", "who", "when"]);
  grammar(5, "past perfect", "When we arrived, the movie ___ already started.", ["had", "has", "have"]);

  /* =====================================================================
     📖 READING — 레벨당 지문 2개 × 3문항 (모두 창작 지문)
     ===================================================================== */
  // ---------- L0 (BR, AR 약 0.3) ----------
  passage(0, "My Cat", "BR100L", 0.3,
    "I have a cat. My cat is big. My cat is gray. My cat can jump. My cat likes to nap in the sun.",
    [
      ["literal detail", "What color is the cat?", ["gray", "black", "white"]],
      ["literal detail", "What can the cat do?", ["jump", "swim", "read"]],
      ["literal detail", "Where does the cat nap?", ["in the sun", "in a box", "in the bus"]]
    ]);
  passage(0, "At the Park", "BR50L", 0.4,
    "Sam goes to the park. He sees a red ball. He kicks the ball. The ball goes up, up, up! Sam is happy.",
    [
      ["literal detail", "What color is the ball?", ["red", "blue", "green"]],
      ["literal detail", "What does Sam do with the ball?", ["He kicks it.", "He eats it.", "He hides it."]],
      ["character feeling", "How does Sam feel?", ["happy", "sad", "angry"]]
    ]);

  // ---------- L1 (약 150L, AR 약 1.0) ----------
  passage(1, "The Little Seed", "160L", 1.0,
    "Lily put a little seed in a pot. She gave it water every day. The pot sat by the window in the sun. " +
    "One day, Lily saw a tiny green leaf. \"My seed is growing!\" she said. " +
    "Soon the plant had a yellow flower. Lily was very proud.",
    [
      ["literal detail", "What did Lily give the seed every day?", ["water", "milk", "juice"]],
      ["literal detail", "Where was the pot?", ["by the window", "under the bed", "in the car"]],
      ["sequence", "What grew at the end of the story?", ["a yellow flower", "a red apple", "a tall tree"]]
    ]);
  passage(1, "A Rainy Day", "140L", 1.1,
    "It was a rainy day. Ben could not play outside. He was sad. Then Mom had an idea. " +
    "\"Let's build a fort!\" she said. They used chairs and blankets. " +
    "Ben and Mom read books inside the fort. \"Rainy days are fun!\" said Ben.",
    [
      ["cause and effect", "Why couldn't Ben play outside?", ["It was raining.", "He was sick.", "It was night."]],
      ["literal detail", "What did they use to build the fort?", ["chairs and blankets", "boxes and tape", "sticks and rocks"]],
      ["character change", "How did Ben feel at the end?", ["He had fun.", "He was still sad.", "He was angry."]]
    ]);

  // ---------- L2 (약 350L, AR 약 2.0) ----------
  passage(2, "The Lost Mitten", "340L", 2.0,
    "Mina had a pair of blue mittens. Her grandma made them for her birthday. " +
    "One cold afternoon, Mina came home from school with only one mitten. " +
    "She looked in her backpack. She looked in her coat pockets. The other mitten was gone. " +
    "The next morning, Mina walked to school slowly. She looked at the ground the whole way. " +
    "Near the school gate, she saw something blue on a bench. It was her mitten! " +
    "Someone had found it and put it there so she could see it. " +
    "Mina smiled. She decided to help others find lost things, too.",
    [
      ["literal detail", "Who made Mina's mittens?", ["her grandma", "her teacher", "her friend"]],
      ["sequence", "What did Mina do first when she got home?", ["She looked in her backpack.", "She walked to school.", "She sat on a bench."]],
      ["inference", "Why did someone put the mitten on the bench?", ["So Mina could find it", "Because it was dirty", "To keep it for themselves"]]
    ]);
  passage(2, "Busy Bees", "380L", 2.2,
    "Bees are small, but they do a big job. Bees fly from flower to flower. " +
    "They drink a sweet juice called nectar. When a bee visits a flower, yellow powder sticks to its legs. " +
    "This powder is called pollen. The bee carries the pollen to the next flower. " +
    "This helps plants make seeds and fruit. Without bees, we would have fewer apples and berries. " +
    "Bees also use nectar to make honey. They keep the honey in their hive to eat in winter.",
    [
      ["main idea", "What is this text mostly about?", ["How bees help plants and make honey", "How to build a hive", "Why apples are red"]],
      ["vocabulary in context", "What is pollen?", ["a yellow powder on flowers", "a sweet drink", "a kind of fruit"]],
      ["cause and effect", "What would happen without bees?", ["We would have fewer apples and berries.", "Flowers would grow bigger.", "It would rain more."]]
    ]);

  // ---------- L3 (약 550L, AR 약 3.0) ----------
  passage(3, "The Class Garden", "540L", 3.0,
    "In the spring, Ms. Park's class planted a garden behind the school. " +
    "Each student chose one vegetable to take care of. Jun picked tomatoes because they were his favorite. " +
    "Every morning before class, Jun checked his plants. He pulled out weeds and gave the soil a drink. " +
    "In the middle of June, a heavy storm hit the town. The wind blew so hard that two tomato plants fell over. " +
    "Jun felt terrible when he saw them. Instead of giving up, he found some wooden sticks and soft string. " +
    "He tied each plant to a stick so it could stand tall again. " +
    "By July, the plants were full of bright red tomatoes. Jun shared them with the whole class, " +
    "and Ms. Park said his patience had paid off.",
    [
      ["literal detail", "Why did Jun choose tomatoes?", ["They were his favorite.", "Ms. Park told him to.", "They grow the fastest."]],
      ["problem and solution", "How did Jun fix the plants after the storm?", ["He tied them to sticks.", "He planted new seeds.", "He moved them inside."]],
      ["character trait", "Which word best describes Jun?", ["patient", "lazy", "careless"]]
    ]);
  passage(3, "Owls: Hunters of the Night", "580L", 3.2,
    "Most birds sleep at night, but owls are wide awake. Owls are nocturnal, which means they are active at night. " +
    "They have special body parts that help them hunt in the dark. " +
    "First, owls have very large eyes that let in a lot of light. They can see well even when it is almost dark. " +
    "Second, owls have excellent hearing. Some owls can hear a mouse moving under the snow! " +
    "Third, an owl's feathers are soft at the edges, so it can fly almost silently. " +
    "Its prey does not hear it coming. Because of these amazing features, owls are some of the best hunters in the animal world.",
    [
      ["vocabulary in context", "What does 'nocturnal' mean?", ["active at night", "living in snow", "flying very fast"]],
      ["text structure", "How many special features does the author explain?", ["three", "two", "five"]],
      ["cause and effect", "Why can owls fly almost silently?", ["Their feathers are soft at the edges.", "They have large eyes.", "They only fly in snow."]]
    ]);

  // ---------- L4 (약 720L, AR 약 4.0) ----------
  passage(4, "The Bridge Builders", "700L", 4.0,
    "Every year, Maple Elementary held a contest to build the strongest bridge using only paper and tape. " +
    "Hana and her partner, Leo, had very different ideas. Leo wanted to make a long, flat bridge that looked impressive. " +
    "Hana wanted to roll the paper into tight tubes, because she had read that tubes are stronger than flat sheets. " +
    "At first, they argued, and neither of them would listen. " +
    "Finally, their teacher suggested that they test both ideas before deciding. " +
    "Leo's flat bridge looked beautiful, but it bent under the weight of just three coins. " +
    "Hana's tube bridge held twenty coins, but it was too short to cross the gap between the desks. " +
    "Then Leo had an idea: \"What if we use your tubes, but make the bridge as long as mine?\" " +
    "Together, they built a long bridge made of rolled tubes. On contest day, it held forty-two coins and won first place. " +
    "Hana realized that their argument had actually helped them, because combining their ideas made something better than either one alone.",
    [
      ["literal detail", "Why did Hana want to use paper tubes?", ["She read that tubes are stronger.", "Tubes are easier to tape.", "Leo asked her to."]],
      ["sequence", "What happened right after they tested both ideas?", ["Leo suggested combining them.", "They won the contest.", "They stopped working together."]],
      ["theme", "What is the main lesson of the story?", ["Working together can create better ideas.", "Paper is a weak material.", "Winning is the most important thing."]]
    ]);
  passage(4, "Why Do Leaves Change Color?", "750L", 4.2,
    "In the fall, many trees turn bright red, orange, and yellow. But where do these colors come from? " +
    "During spring and summer, leaves are filled with a green substance called chlorophyll. " +
    "Chlorophyll helps the tree use sunlight to make food. It is so plentiful that its green color hides other colors in the leaf. " +
    "As fall arrives, the days become shorter and there is less sunlight. Trees begin to stop making food and prepare to rest for the winter. " +
    "As the chlorophyll breaks down, the green fades away. Now the yellow and orange colors, which were there all along, can finally be seen. " +
    "Some trees, such as maples, also make new red colors in the fall. " +
    "Eventually the leaves dry out and drop to the ground, and the tree waits for spring.",
    [
      ["main idea", "What is the main idea of this text?", ["Leaves change color when chlorophyll breaks down in fall.", "Maple trees are the most beautiful trees.", "Trees need water in the winter."]],
      ["vocabulary in context", "In this text, 'plentiful' means ___.", ["there is a lot of it", "it is very colorful", "it is hard to find"]],
      ["inference", "Why can we see yellow and orange only in the fall?", ["The green color no longer hides them.", "Trees paint new colors every fall.", "The sun turns leaves yellow."]]
    ]);

  // ---------- L5 (약 850L, AR 약 4.8) ----------
  passage(5, "The Night of the Comet", "840L", 4.8,
    "For weeks, the news had been talking about a comet that would pass close to Earth for the first time in seventy years. " +
    "Daniel had marked the date on his calendar with a giant star. His grandfather had seen the same comet as a boy, " +
    "and he often described its glowing tail stretching across the sky like a brushstroke of silver paint. " +
    "On the big night, however, thick clouds rolled in from the west. Daniel stared out the window, disappointed, " +
    "as the sky grew darker and darker without a single star. " +
    "Around midnight, his grandfather knocked softly on his door. \"Get your jacket,\" he whispered. \"I checked the weather map. " +
    "The clouds are clearer near the lake.\" They drove twenty minutes in silence. When they reached the shore, " +
    "a narrow gap had opened in the clouds. There, just above the water, was the comet, its tail shimmering exactly as Grandpa had described. " +
    "Daniel didn't say anything for a long time. Finally, he turned to his grandfather and said, " +
    "\"Now we've both seen it.\" Grandpa smiled and squeezed his shoulder. " +
    "Daniel understood that the memory they shared was even more special than the comet itself.",
    [
      ["literal detail", "Why was Daniel disappointed at first?", ["Clouds covered the sky.", "He missed the date.", "His grandfather was asleep."]],
      ["figurative language", "The comet's tail is compared to ___.", ["a brushstroke of silver paint", "a river of water", "a burning candle"]],
      ["theme", "What does Daniel realize at the end?", ["Sharing the moment with Grandpa mattered most.", "Comets are dangerous to watch.", "Weather maps are always wrong."]]
    ]);
  passage(5, "The Great Monarch Journey", "870L", 5.0,
    "Every autumn, millions of monarch butterflies begin one of the most remarkable journeys in the animal kingdom. " +
    "Monarchs living in the northern United States and Canada fly as far as 4,000 kilometers south to the mountain forests of central Mexico. " +
    "Scientists are still amazed by this migration, because no single butterfly has ever made the trip before. " +
    "The monarchs that fly south are the great-great-grandchildren of the butterflies that left Mexico the previous spring. " +
    "Researchers believe monarchs use the position of the sun, along with a kind of internal compass, to find their way. " +
    "Once they arrive, the butterflies cluster together on fir trees by the thousands, keeping warm through the winter. " +
    "Unfortunately, monarch populations have declined in recent decades. Milkweed, the only plant monarch caterpillars can eat, " +
    "has disappeared from many fields. To help, people across North America are planting milkweed in gardens and schoolyards, " +
    "creating a chain of 'butterfly stops' along the migration route.",
    [
      ["main idea", "What is this text mainly about?", ["The long migration of monarchs and how people help them", "How to grow a garden in Mexico", "Why caterpillars eat leaves"]],
      ["inference", "Why are scientists amazed by the migration?", ["The butterflies have never made the trip before.", "Monarchs fly only at night.", "The butterflies are very large."]],
      ["author's purpose", "Why does the author mention milkweed?", ["To explain one way people can help monarchs", "To describe what the trees in Mexico look like", "To show that monarchs eat many plants"]]
    ]);

  window.QUESTION_BANK = bank;
})();
