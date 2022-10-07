<template>
    <div :class="{'success':initValue == arabic}">
        {{initValue}} => {{roman}} => {{arabic}}
    </div>
</template>
<script>
import {convertR2A, convertA2R} from '../convert_functions'
export default {
    props:{
        number: {
            required: true,
            type: Number
        }
    },
    setup(props) {
        const initValue = props.number
        const roman = convertA2R(initValue)
        const arabic = convertR2A(roman)
        return {
            initValue,
            roman,
            arabic
        }
    },
}
</script>