<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
           <router-link to="/Home" exact><b-navbar-brand>Smoothiez</b-navbar-brand></router-link>
           <router-link class="pull-right  ml-auto" to="/Home/AddSmoothie" exact><b-button class="btn-circle">+</b-button></router-link>
        </b-navbar>
    </div>
</template>

<script>
export default {
    
    
}
</script>

<style scoped>

.bg-light{
    background-color: white !important;
}

.btn-circle {
    width: 60px;
    height: 60px;
    padding: 6px 0px;
    border-radius: 30px;
    border: 2px solid;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
    background-color: rgb(252, 57, 177) !important;
}

.btn-circle:hover {
border-color: rgb(240, 140, 202) !important;
}
btn-circle:active {
box-shadow: rgb(240, 140, 202) !important;
}

.navbar-brand {
    font-family: 'Monoton', cursive;
    font-size: 45px;
    color: rgb(252, 57, 177) !important;
}

</style>

