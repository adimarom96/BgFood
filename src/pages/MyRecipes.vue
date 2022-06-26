<template>
    <div>
        <h2>Welcome to My Recipes page !<br><br></h2>
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
                    <b-form-input id="time-input" type="number" min=1 placeholder="Numbers only!" v-model="time" :state="timeState"
                        required></b-form-input>
                </b-form-group>

                <b-form-group label="Vegan" label-for="vegan-input" :state="veganState">
                    <b-form-input id="vegan-input" v-model="vegan" :state="veganState" required>
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
                    <b-form-input id="numOfDishes-input" type="number" min=1 placeholder="Numbers only!" v-model="numOfDishes"
                        :state="numOfDishesState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="image" label-for="image-input" :state="imageState">
                    <b-form-input id="image-input" v-model="image"
                        :state="imageState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="ingredients" label-for="ingredients-input" :state="ingredientsState">
                    <b-form-input id="ingredients-input" v-model="ingredients"
                        :state="ingredientsState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="instructions" label-for="instructions-input" :state="instructionsState">
                    <b-form-input id="instructions-input" v-model="instructions" :state="instructionsState" required>
                    </b-form-input>
                </b-form-group>
                <!--------missing: IMAGE , ingredients , likes------->
            </form>
        </b-modal>
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { title } from 'process'
// ingredients
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
            vegan: '',
            veganState: null,
            vegetarian: '',
            vegetarianState: null,
            glutenFree: '',
            glutenFreeState: null,
            numOfDishes: '',
            numOfDishesState: null,
            instructions: '',
            instructionsState: null,
            imageState:null,
            aggregateLikes: "0",
            image: '',
            ingredients: '',
            ingredientsState: null,
        }
    },

    methods: {
        checkFormValidity() {
            //const valid = this.$refs.form.checkValidity()
            this.titleState = valid
            this.timeState = valid
            this.veganState = valid
            this.vegetarianState = valid
            this.glutenFreeState = valid
            this.numOfDishesState = valid
            this.imageState = valid
            this.instructionsState = valid
            this.ingredientsState = valid
            return valid
        },
        resetModal() {
            this.title = ''
            this.titleState = null
            this.time = ''
            this.timeState = null
            this.vegan = ''
            this.veganState = null
            this.vegetarian = ''
            this.vegetarianState = null
            this.glutenFree = ''
            this.glutenFreeState = null
            this.numOfDishes = ''
            this.numOfDishesState = null
            this.image = ''
            this.imageState = null
            this.instructions = ''
            this.instructionsState = null
            this.ingredients = ''
            this.ingredientsState = null
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()

            console.log('-------submit-------');
            // console.log(this.time, this.title);

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
                console.log('time: ',this.time );
                console.log('Likes: ',this.aggregateLikes );
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
                //console.log('time', this.time);
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