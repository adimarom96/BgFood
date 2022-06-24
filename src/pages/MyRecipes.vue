<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

        <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Form" @show="resetModal" @hidden="resetModal"
            @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Title" label-for="title-input"
                    :state="titleState">
                    <b-form-input id="title-input" placeholder="your recipe title" v-model="title" :state="titleState"
                        required></b-form-input>
                </b-form-group>

                <b-form-group label="Time" label-for="time-input" 
                    :state="timeState">
                    <b-form-input id="time-input" type="number" min=1 placeholder="1" v-model="time" :state="timeState"
                        required></b-form-input>
                </b-form-group>

                <b-form-group label="Likes" label-for="like-input" 
                    :state="likeState">
                    <b-form-input type="number" min=0 id="like-input" placeholder="0" v-model="like" :state="likeState"
                        required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Vegan" label-for="vagen-input" 
                    :state="vagenState">
                    <b-form-input id="vagen-input" v-model="vagen" :state="vagenState" required></b-form-input>
                </b-form-group>

                <b-form-group label="Vegetarian" label-for="vegetarian-input" 
                    :state="vegetarianState">
                    <b-form-input id="vegetarian-input" v-model="vegetarian" :state="vegetarianState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="GlutenFree" label-for="glutenFree-input" 
                    :state="glutenFreeState">
                    <b-form-input id="glutenFree-input" v-model="glutenFree" :state="glutenFreeState" required>
                    </b-form-input>
                </b-form-group>

            </form>
        </b-modal>
    </div>
</template>

<script>
import { title } from 'process'
// glutenFree
export default {
    data() {
        return {
            title: '',
            titleState: null,
            time: '',
            timeState: null,
            like: '',
            likeState: null,
            vagen: '',
            vagenState: null,
            vegetarian: '',
            vegetarianState: null,
            glutenFree: '',
            glutenFreeState: null,
        }
    },

    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.titleState = valid
            this.timeState = valid
            this.likeState = valid
            this.vagenState = valid
            this.vegetarianState = valid
            this.glutenFreeState = valid
            return valid
        },
        resetModal() {
            this.title = ''
            this.titleState = null
            this.time = ''
            this.timeState = null
            this.like = ''
            this.likeState = null
            this.vagen = ''
            this.vagenState = null
            this.vegetarian = ''
            this.vegetarianState = null
            this.glutenFree = ''
            this.glutenFreeState = null
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // TODO: handle all the new data and send it to the next step ?
            
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        }
    }
}
</script>