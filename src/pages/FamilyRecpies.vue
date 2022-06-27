<template>
    <div>
        <h2>Welcome to My Family Recipes page !<br><br></h2>
        <RecipePreviewList title="Family" state="Family"  />
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
            
        }
    },
}
</script>