<template>
  <div style="margin-top: 30px" class="containerx">
    <div class="title is-2" style="font-family: Aldrich">
      Let's learn new words
    </div>
    <br />
    <br />

    <h1 class="title is-3">
      {{ word.word[0].toUpperCase() + word.word.slice(1) }}
    </h1>
    <div
      class="testimonial-quote group"
      style="width: 600px; margin-left: auto;"
    >
      <div class="quote-container">
        <blockquote>
          <p>{{ word.definition }}</p>
        </blockquote>
        <cite>
          <span>Category: {{ word.category }}</span>
        </cite>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({ word: {} }),
  created() {
    Axios.get("/api/word/random", {
      withCredentials: true
    })
      .then(r => {
        this.word = r.data.word;
      })
      .catch(console.warn);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Aldrich");
.containerx {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
h1 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;
}

.testimonial-quote {
  font-size: 16px;
}

.testimonial-quote blockquote {
  /* Negate theme styles */
  border: 0;
  margin: 0;
  padding: 0;
  background: none;
  color: gray;
  font-family: Georgia, serif;
  font-size: 1.5em;
  font-style: italic;
  line-height: 1.4 !important;
  margin: 0;
  position: relative;
  text-shadow: 0 1px white;
  z-index: 600;
}

.testimonial-quote blockquote * {
  box-sizing: border-box;
}

.testimonial-quote blockquote p {
  color: #75808a;
  line-height: 1.4 !important;
}

.testimonial-quote blockquote p:first-child:before {
  content: "\201C";
  color: #81bedb;
  font-size: 7.5em;
  font-weight: 700;
  opacity: 0.3;
  position: absolute;
  top: -0.4em;
  left: -0.2em;
  text-shadow: none;
  z-index: -300;
}

.testimonial-quote img {
  border: 3px solid #9cc1d3;
  border-radius: 50%;
  display: block;
  width: 120px;
  height: 120px;
  position: absolute;
  top: -0.2em;
  left: 0;
}

.testimonial-quote cite {
  color: gray;
  display: block;
  font-size: 0.8em;
}

.testimonial-quote cite span {
  color: #5e5e5e;
  font-size: 1em;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 1px white;
}

.testimonial-quote {
  position: relative;
}

.testimonial-quote .quote-container {
  padding-left: 0px;
}

.testimonial-quote.right .quote-container {
  padding-left: 0;
  padding-right: 160px;
}

.testimonial-quote.right img {
  left: auto;
  right: 0;
}

.testimonial-quote.right cite {
  text-align: right;
}
</style>
