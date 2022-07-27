export default {
  Query: {
    recipes: (_, __, { dataSources }) => dataSources.recipeDataSource.getRecipes(),
    recipe(_, args, { dataSources }) {
      return dataSources.recipeDataSource.getRecipe(args.id);
    }
  }
};