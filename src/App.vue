<template>
  <div>
    <main>
      <h1>
        Roman Numerals Calculator
        <br />
        (no overlined numerals)
      </h1>
      <div>
        <h4>Roman to Arabic</h4>
        <input type="text" @input="takeR2AValue($event)" ref="r2ainputRef" />
        <span v-if="r2aResult > 0">{{ r2aResult }}</span>
        <span v-else-if="r2aResult < 0" class="error">Incorrect Number!</span>
        <span v-else class="placeholder"></span>
      </div>

      <div>
        <h4>Arabic to Roman</h4>
        <input type="number" v-model="a2r" />
        <span v-if="a2rResult == 'ERROR'" class="error">
          The number is out of range!
        </span>
        <span v-else-if="a2rResult != ''">{{ a2rResult }}</span>
        <span v-else class="placeholder"></span>
      </div>
      <div><button @click="clearHandler">Clear</button></div>
      <div v-if="testEnabled">
        <button @click="testHandler">
          {{ `${runTest ? 'Hide Test' : 'Run Test'}` }}
        </button>
        <p>This might take some time</p>
      </div>
    </main>
    <ul v-if="runTest" class="test-results">
      <li v-for="n in maxIntNumber" :key="n">
        <test-output :number="n" />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { convertR2A, convertA2R } from './convert_functions'
import { numbersMap, maxIntNumber } from './numbers_map'
import TestOutput from './components/TestOutput.vue'
export default {
  components: {
    TestOutput,
  },
  setup() {
    const r2a = ref('')
    const r2aResult = computed(() => convertR2A(r2a.value))
    const a2rResult = computed(() => convertA2R(a2r.value))
    const a2r = ref('')
    const allowedSymbols = []
    const r2ainputRef = ref(null)
    const runTest = ref(false)
    const testEnabled = false

    const takeR2AValue = (event) => {
      const res = [...event.target.value.toUpperCase()]
      const fin = []
      res.forEach((v, i) => {
        if (allowedSymbols.includes(v)) {
          fin.push(v)
        }
      })
      const val = fin.join('')
      r2a.value = val
      event.target.value = val
    }

    const testHandler = () => {
      runTest.value = !runTest.value
    }
    const clearHandler = () => {
      a2r.value = ''
      r2a.value = ''
      console.log(r2ainputRef.value)
      r2ainputRef.value.value = ''
    }
    onMounted(() => {
      numbersMap.forEach((v) => {
        allowedSymbols.push(v.symbol)
      })
    })
    return {
      r2a,
      a2r,
      takeR2AValue,
      r2aResult,
      a2rResult,
      testHandler,
      maxIntNumber,
      runTest,
      r2ainputRef,
      clearHandler,
      testEnabled
    }
  },
}
</script>

