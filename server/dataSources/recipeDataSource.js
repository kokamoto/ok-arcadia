export class RecipeDataSource {

  constructor(data) {
    this.data = data;
  }

  getRecipes() {
    return this.data;
  }

  getRecipe(id) {
    return this.data.find((recipe) => recipe.id === id);
  }
}
