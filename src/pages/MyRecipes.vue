<template>
    <div>
        Welcome to My Recipes page !<br><br>
        <b-button v-b-modal.modal-prevent-closing>Create New Recipe!</b-button>
        <RecipePreviewList 
        :key="componentKey"
        title="MyRecipes" 
        state="MyRecipes" 
        class="RandomRecipes center" />

        <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Form" @show="resetModal" @hidden="resetModal"
            @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Title" label-for="title-input" :state="titleState">
                    <b-form-input id="title-input" placeholder="your recipe title" v-model="title" :state="titleState"
                        required></b-form-input>
                </b-form-group>

                <b-form-group label="Time" label-for="time-input" :state="timeState">
                    <b-form-input id="time-input" type="number" min=1 placeholder="1" v-model="time" :state="timeState"
                        required></b-form-input>
                </b-form-group>

                <b-form-group label="Vegan" label-for="vagen-input" :state="vagenState">
                    <b-form-input id="vagen-input" v-model="vagen" :state="vagenState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Vegetarian" label-for="vegetarian-input" :state="vegetarianState">
                    <b-form-input id="vegetarian-input" v-model="vegetarian" :state="vegetarianState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="GlutenFree" label-for="glutenFree-input" :state="glutenFreeState">
                    <b-form-input id="glutenFree-input" v-model="glutenFree" :state="glutenFreeState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="numOfDishes" label-for="numOfDishes-input" :state="numOfDishesState">
                    <b-form-input id="numOfDishes-input" type="number" min=1 placeholder="1" v-model="numOfDishes"
                        :state="numOfDishesState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="instructions" label-for="instructions-input" :state="instructionsState">
                    <b-form-input id="instructions-input" v-model="instructions" :state="instructionsState" required>
                    </b-form-input>
                </b-form-group>
                <!--------missing: IMAGE , ingredients------->
            </form>
        </b-modal>
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { title } from 'process'
// instructions
export default {
    components: {
        RecipePreviewList,
    },
    data() {
        return {
            componentKey: 0,
            submitError: undefined,
            title: '',
            titleState: null,
            time: '',
            timeState: null,
            vagen: '',
            vagenState: null,
            vegetarian: '',
            vegetarianState: null,
            glutenFree: '',
            glutenFreeState: null,
            numOfDishes: '',
            numOfDishesState: null,
            instructions: '',
            instructionsState: null,
            
            aggregateLikes: "0",
            image: "https://www.eatthis.com/wp-content/uploads/sites/4/2020/12/unhealthiest-foods-planet.jpg?quality=82&strip=1",
            ingredients: "ingredients defualt"
        }
    },

    methods: {
        checkFormValidity() {
            //const valid = this.$refs.form.checkValidity()
            this.titleState = valid
            this.timeState = valid
            this.vagenState = valid
            this.vegetarianState = valid
            this.glutenFreeState = valid
            this.numOfDishesState = valid
            this.instructionsState = valid
            return valid
        },
        resetModal() {
            this.title = ''
            this.titleState = null
            this.time = ''
            this.timeState = null
            this.aggregateLikes = ''
            this.vagen = ''
            this.vagenState = null
            this.vegetarian = ''
            this.vegetarianState = null
            this.glutenFree = ''
            this.glutenFreeState = null
            this.numOfDishes = ''
            this.numOfDishesState = null
            this.instructions = ''
            this.instructionsState = null
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()

            console.log('-------submit-------');
            console.log(this.time, this.title);

            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // Exit when the form isn't valid
            // if (!this.checkFormValidity()) {
            //     return
            // }
            this.createMyRecipe();
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        }, async createMyRecipe() {
            try {
                const response = await this.axios.post(
                    "http://localhost:3000/users/createRecipe",
                    // {
                    //     withCredentials: true,
                    //     credentials: 'include',
                    // },
                    {
                        title: this.title,
                        readyInMinutes: this.time,
                        aggregateLikes: this.aggregateLikes,
                        vegan: this.vegan,
                        vegetarian: this.vegetarian,
                        glutenFree: this.glutenFree,
                        numOfDishes: this.numOfDishes,
                        instructions: this.instructions,
                        image: this.image,
                        ingredients: this.ingredients
                    }
                );
                //this.$router.push("/login");
                console.log("--createMyRecipe:", response);
                this.componentKey += 1;
            } catch (err) {
                console.log("error123: ", err.response);
                this.submitError = err.response.data.message;
            }
        },
    }
}
</script>