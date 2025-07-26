<template>

  <div class="container ">
    <div class="row  justify-content-center">
      <img class="col-4 col-sm-12" src="/spims.jpg" style="width: 200px;"  />
      <div class="col-8 col-sm-12 align-self-center  ">
        <h5 class="fw-bold" >What Kind of Servant Are You?</h5>
        <br/>        <div>Answer these questions to discover your perfect SPIMS match!</div>


      </div>
    </div>


  </div>
  <hr/>

  <div class="quiz">
    <!-- Quiz Flow -->
    <div v-if="!showResults">
      <form @submit.prevent="handleNext">
        <div class="question-block">
          <p class="fw-semibold " style="text-align: center">{{ currentQuestionIndex + 1 }}. {{ currentQuestion.text }}</p>
          <ul class="answers">
            <li v-for="(opt, oIndex) in currentQuestion.options" :key="oIndex">
              <label class="container-radio">
                <!-- bind the checked state to answers[currentQuestionIndex] -->
                <input
                    type="radio"
                    :name="'question-' + currentQuestionIndex"
                    v-model="answers[currentQuestionIndex]"
                    :value="opt.category"
                />
                <span class="checkmark"></span>
                {{ opt.text }}
              </label>
            </li>
          </ul>
        </div>
        <button type="submit">
          {{ currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next' }}
        </button>
      </form>
    </div>

    <!-- Results -->
    <div v-else>
      <h2>Your Result<span v-if="results.length > 1">s</span>:</h2>
      <div v-for="(res, index) in results" :key="index" class="result-block">
        <h3>{{ res.title }}</h3>
        <p>{{ res.description }}</p>
        <p><strong>Your match:</strong> {{ res.match }}</p>
        <hr v-if="index !== results.length - 1" />
      </div>
      <button @click="restartQuiz">Restart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServantQuiz',
  data() {
    return {
      currentQuestionIndex: 0,
      showResults: false,
      answers: Array(8).fill(null),
      categoryCount: { A: 0, B: 0, C: 0, D: 0 },
      results: [],
      questions: [
        {
          text: "What’s your biggest challenge in service right now?",
          options: [
            { text: "A) You long to see your youth truly saved, and you want to build a committed team to reach them.", category: "A" },
            { text: "B) You have a service opportunity, but you have little time or material; you want depth, but you are strained.", category: "B" },
            { text: "C) You are thoughtful and love the Church, but feel like your mind isn’t always understood, and you are facing intellectual challenges.", category: "C" },
            { text: "D) You are passionate about evangelism and dream of spreading that spirit in your church or community, but you don’t know where to start.", category: "D" },
          ],
        },
        {
          text: "What excites you most in ministry?",
          options: [
            { text: "A) Seeing a team move with one heart and one mission", category: "A" },
            { text: "B) Getting tools and content that are rich, fast, and ready to use", category: "B" },
            { text: "C) Helping others (or yourself) work through doubts with honesty and depth", category: "C" },
            { text: "D) Equipping people to speak boldly about Christ in any setting", category: "D" },
          ],
        },
        {
          text: "Which phrase describes your current service style?",
          options: [
            { text: "A) Team-builder. Connector. Mission-minded.", category: "A" },
            { text: "B) Committed, but often overwhelmed or short on prep time", category: "B" },
            { text: "C) Thinker. Listener. Question-asker.", category: "C" },
            { text: "D) Visionary. Passionate. Wants to see multiplication", category: "D" },
          ],
        },
        {
          text: "How do you prefer to learn or grow?",
          options: [
            { text: "A) Through mentoring and action with others", category: "A" },
            { text: "B) Structured content that’s efficient, to the point, and rich", category: "B" },
            { text: "C) Thoughtful conversations and reflective readings", category: "C" },
            { text: "D) Interactive tools I can apply and share quickly", category: "D" },
          ],
        },
        {
          text: "What do your spiritual conversations often focus on?",
          options: [
            { text: "A) Forming a Gospel-centered group or team", category: "A" },
            { text: "B) Explaining Church teachings clearly and faithfully", category: "B" },
            { text: "C) Wrestling with hard questions or intellectual blocks", category: "C" },
            { text: "D) Inspiring others to share their faith or start something new", category: "D" },
          ],
        },
        {
          text: "When you look at the future of your ministry, what do you hope for?",
          options: [
            { text: "A) To multiply disciples and form a Gospel-driven team", category: "A" },
            { text: "B) To feel confident teaching and passing on the Orthodox faith", category: "B" },
            { text: "C) To help bridge the gap between the Church and questioning minds", category: "C" },
            { text: "D) To normalize evangelism and make it part of your community’s culture", category: "D" },
          ],
        },
        {
          text: "What type of support would be most helpful to you?",
          options: [
            { text: "A) Training in team leadership and evangelism skills", category: "A" },
            { text: "B) A clear, comprehensive material to learn from", category: "B" },
            { text: "C) A space that honors both faith and intellect", category: "C" },
            { text: "D) A resource I can use on-the-go and share with others", category: "D" },
          ],
        },
        {
          text: "Pick the sentence that best reflects your heart:",
          options: [
            { text: "A) “I can’t carry the burden alone — I need others on mission with me.”", category: "A" },
            { text: "B) “I want to go deeper, but I need something practical and time-efficient.”", category: "B" },
            { text: "C) “I need room to think and wrestle, without feeling judged or dismissed.”", category: "C" },
            { text: "D) “Evangelism should be part of our DNA — I just want to spread that vision.”", category: "D" },
          ],
        },
      ]

    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    handleNext() {
      if (this.currentQuestionIndex === this.questions.length - 1) {
        this.calculateResults();
      } else {
        this.currentQuestionIndex++;
      }
    },
    calculateResults() {
      this.categoryCount = { A: 0, B: 0, C: 0, D: 0 };
      this.answers.forEach(cat => {
        if (cat) this.categoryCount[cat]++;
      });

      const max = Math.max(...Object.values(this.categoryCount));
      const topCategories = Object.keys(this.categoryCount).filter(
          key => this.categoryCount[key] === max
      );

      this.setResults(topCategories);
      this.showResults = true;
    },
    setResults(categories) {
      const profiles = {
        A: {
          title: 'The Team Builder',
          description: 'You care deeply about the salvation of your youth and dream of building a strong, connected team to serve with you.',
          match: 'The Harvest is Plentiful Program',
        },
        B: {
          title: 'The Busy Servant',
          description: 'You have a heart for service but not enough time. You’re looking for deep, ready-made content that fits your schedule.',
          match: 'Catechesis',
        },
        C: {
          title: 'The Deep Thinker',
          description: 'You think a lot — about faith, truth, and big questions. You sometimes feel the Church doesn’t speak your language, but you still want to stay rooted.',
          match: 'Walk in Wisdom',
        },
        D: {
          title: 'The Mission Spreader',
          description: 'You believe in evangelism and want to spread the spirit of mission everywhere — your church, your community, even online.',
          match: 'Harvest App',
        },
      };

      this.results = categories.map(cat => profiles[cat]);
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.answers = Array(this.questions.length).fill(null);
      this.showResults = false;
      this.results = [];
      this.categoryCount = { A: 0, B: 0, C: 0, D: 0 };
    },
  },
};
</script>

<style scoped>
.quiz {
  max-width: 700px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.question-block {
  margin-bottom: 1.5rem;
  text-align: left;
}
.answers {
  list-style: none;
  padding: 0;
}
.answers li {
  margin-bottom: 0.5rem;
}
button {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #791a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #571212;
}
.result-block {
  margin-bottom: 1.5rem;
}

/* ✅ Responsive Text */
@media (max-width: 768px) {
  .quiz {
    font-size: 16px;
    padding: 1rem;
  }
}
@media (max-width: 480px) {
  .quiz {
    font-size: 15px;
    padding: 0.5rem;
  }
}



.container-radio {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container-radio:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container-radio input:checked ~ .checkmark {
  background-color: #791a1a;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container-radio input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container-radio .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
