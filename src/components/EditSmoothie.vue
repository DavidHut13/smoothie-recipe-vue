<template>
    <div v-if="smoothie" class="container">
         <b-col cols="5" offset-md="3" class="cardstopspacing">
            <b-form @submit.prevent="editSmoothie">
                        <b-form-group
                            id="exampleInputGroup1"
                            label="Smoothie Name:"
                            label-for="smoothieName"
                            >
                            <b-form-input
                            id="smoothieName"
                            type="text"
                            v-model="smoothie.title"
                            required
                            placeholder="Enter Name of Smoothie"/>
                        </b-form-group>

                        <b-form-group  label="Ingredients:" label-for="Ingredients">
                            <p v-if="feedback" class="red-text">{{feedback}}</p>
                            <b-form-input
                            id="Ingredients"
                            type="text"
                            v-model="another"
                            @keydown.tab.prevent="editIngred"
                            placeholder="Enter ingredients Here" />

                            <div class="ingredPreview" v-for="(ingred,index) in smoothie.ingredients" :key="index">
                                <b-form-input
                                id="ingredientPreviewInput"
                                type="text"
                                name="ingredient"
                                class="text-center"
                                v-model="smoothie.ingredients[index]"
                                lable="Ingredient:"
                                />
                                <i class="material-icons delete"
                                @click="deleteIngred(ingred)">delete</i>
                            </div>
                            
                        </b-form-group>
                        <div class="text-center" >
                            <b-button block type="submit" class="pink">Update Smoothie</b-button>
                        </div>
                </b-form>
            </b-col>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc =>{
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    },
    methods: {
     editSmoothie(){
         
        if (this.smoothie.title) {
            
            this.feedback = null
            // create a slug
            this.smoothie.slug = slugify(this.smoothie.title, {
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower: true
            })
            db.collection('smoothies').doc(this.smoothie.id).update({
                title: this.smoothie.title,
                ingredients: this.smoothie.ingredients,
                slug: this.smoothie.slug,  
            }).then(() => {
                this.$router.push('/Home')
            })
        } else {
            this.feedback = 'You must enter a smoothie title'
        }
     },
     addIngred() {
         if(this.another){
             this.smoothie.ingredients.push(this.another)
             this.another=null;
             this.feedback=null;
         } else {
             this.feedback = "You must enter a value to add an ingredient";
         }
     },
     deleteIngred(ingred) {
         this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
             return ingredient != ingred
         })
     }
    }
}
</script>
<style scoped>

.form-group input {

  display: block;
  background: none;
  padding: 0.175rem 0.175rem 0.0875rem;
  font-size: 1.4rem;
  border-width: 0;
  border-color: transparent;
  line-height: 1.9;
  width: 100%;
  transition: all 0.28s ease;
  border-radius: 0px;
  box-shadow: none;
  border: 0;
    outline: 0;
    border-bottom: 2px solid rgb(47, 47, 49);

}
</style>


