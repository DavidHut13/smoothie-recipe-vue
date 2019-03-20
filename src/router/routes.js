import AddSmoothie from '../components/AddSmoothie.vue';
import Home from '../components/Smoothies.vue'
import EditSmoothie from '../components/EditSmoothie.vue'   


export const routes = [
    {path: '/Home/AddSmoothie', component: AddSmoothie },
    {path: '/Home', component: Home },
    {path: '/Home/EditSmoothie/:smoothie_slug', component: EditSmoothie, name: 'EditSmoothie' }
];


export default {
    
    data() {
        return {
            
        }
    }

}

