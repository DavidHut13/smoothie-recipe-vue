<template>
    <b-col cols="5" offset-md="3" class="cardstopspacing">
        <b-form @submit.prevent="addSmoothie">
                <b-form-group
                    id="exampleInputGroup1"
                    label="Smoothie Name:"
                    label-for="smoothieName"
                    >
                    <b-form-input
                    id="smoothieName"
                    type="text"
                    v-model="title"
                    required
                    placeholder="Enter Name of Smoothie"/>
                </b-form-group>

                <b-form-group  label="Ingredients:" label-for="Ingredients">
                    <p v-if="feedback" class="red-text">{{feedback}}</p>
                    <b-form-input
                    id="Ingredients"
                    type="text"
                    v-model="another"
                    @keydown.tab.prevent="addIngred"
                    placeholder="Enter ingredients Here" />

                    <div class="ingredPreview" v-for="(ingred,index) in ingredients" :key="index">
                        <b-form-input
                        id="ingredientPreviewInput"
                        type="text"
                        name="ingredient"
                        class="text-center"
                        v-model="ingredients[index]"
                        lable="Ingredient:"
                        />
                         <i class="material-icons delete"
                         @click="deleteIngred(ingred)">delete</i>
                    </div>
                    
                </b-form-group>
                <div class="text-center" >
                    <b-button block type="submit" class="pink">Add Smoothie</b-button>
                </div>
        </b-form>
    </b-col>
</template>
<script>
import db from '../firebase/init'
import slugify from 'slugify'
 export default {
    data() {
      return {
        show: true,
        title: null,
        another: null,
        ingredients: [],
        feedback: null,
        slug: null
      }
    },
    methods: {
     addSmoothie(){
        if (this.title) {
            this.feedback = null
            // create a slug
            this.slug = slugify(this.title, {
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower: true
            })
            db.collection('smoothies').add({
                title: this.title,
                ingredients: this.ingredients,
                slug: this.slug,  
            }).then(() => {
                this.$router.push('/Home')
            })
        } else {
            this.feedback = 'You must enter a smoothie title'
        }
     },
     addIngred() {
         if(this.another){
             this.ingredients.push(this.another)
             this.another=null;
             this.feedback=null;
         } else {
             this.feedback = "You must enter a value to add an ingredient";
         }
     },
     deleteIngred(ingred) {
         this.ingredients = this.ingredients.filter(ingredient => {
             return ingredient != ingred
         })
     }
    }
  }
</script>

<style>

.pink {
    background-color: rgb(252, 57, 177) !important;
    border-style: none !important;
}

.red-text {
    color: red;
}

.ingredPreview{
     margin: 5px;
     position: relative;
}

#Ingredients {
    margin-bottom: 20px;
}

#ingredientPreviewInput{
    border-style: none !important;
    
}

.cardstopspacing {
    padding-top: 100px;
}

.delete {
    cursor: pointer;
    position: absolute;
    right:0;
    bottom : 7px;

}

</style>
