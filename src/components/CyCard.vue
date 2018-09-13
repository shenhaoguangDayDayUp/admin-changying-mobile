<template>
    <div class="cy-card-body">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'CyCard'
}
</script>
<style lang="scss" scoped>
.cy-card-body{
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    padding: 20px 24px 20px;
    margin-bottom:8px;
    margin-bottom:25px;
    display:flex;
    justify-content: space-between;
    box-sizing: border-box;
}
</style>

