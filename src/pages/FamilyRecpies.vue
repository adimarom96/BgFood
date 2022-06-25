<template>
    <div>
        Welcome to My Family Recipes page !<br><br>
        <RecipePreviewList title="Family" state="Family" class="RandomRecipes center" />
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
    components: {
        RecipePreviewList,
    },
    data() {
        return {
            componentKey: 0,
        }
    },
}
</script>