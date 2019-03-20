<template>
    <b-col  offset-sm="1">
        <b-card-group class="card-group" deck  v-for="smoothie in smoothies" :key="smoothie.id" >
            <b-card id="card" header-tag="header" text-variant="white" class="text-center">
                <h6 slot="header" class="mb-0">{{smoothie.title}}</h6>
                <span slot="header">
                    <i header-tag="header" class="material-icons delete"
                    @click="deleteSmoothie(smoothie.id)" >delete</i>
                </span>
                <b-card-text class="">
                    <ul class="">
                        <li class="ingredients justify-content-md-center" v-for="(ing,index) in smoothie.ingredients" :key="index">
                        <span class="chip">{{ ing }}</span>
                        </li>
                    </ul>

                </b-card-text>
                <span class="btn-floating btn-larg halfway-fab pink">
                    <router-link :to="{ name:'EditSmoothie', params: {smoothie_slug: smoothie.slug} }">
                        <i class="material-icons edit">edit</i>
                    </router-link>
                </span>
            </b-card>
        </b-card-group>
    </b-col>
</template>


<script>
import db from '@/firebase/init'
export default {
    data () {
        return {
            smoothies: []
        }
    },
    methods: {
        deleteSmoothie(id) {
            db.collection('smoothies').doc(id).delete()
            .then(() => { 
                this.smoothies = this.smoothies.filter(smoothie => {
                 return smoothie.id != id
            })
        })
    }

    },
    created() {
        db.collection('smoothies').get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                let smoothie = doc.data()
                smoothie.id = doc.id
                this.smoothies.push(smoothie)
            })
        })
    } 
}

</script>

<style scoped>

.card-deck{
margin: 15px;
}

.chip {
  display: inline-block;
  padding: 0 20px;
  height: 30px;
  font-size: 16px;
  line-height: 190%;
  border-radius: 25px;
  background-color: #181b18;
  text-align: center;
  margin: 5px;
  
}
.ingredients{
     list-style-type: none;
}

li, ul {
    display: inline-block;
    padding: 0;    
}

.delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: rgb(255, 255, 255);
}

#card{
    background-color: rgb(252, 57, 177) !important;
}

.card-group { 
    display: inline-block !important;
}

.edit {
   color: white; 
}

</style>

