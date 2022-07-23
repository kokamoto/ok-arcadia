const recipes = [{
  id: '001',
  title: 'Gluten-free Chocolate Chip Cookies',
  description: 'Warm gluten-free chocolate chip cookies are yummy.'
}, {
  id: '002',
  title: 'Chicken Soup',
  description: 'Soup for your soul.'
}];

export default {
  Query: {
    recipes: () => recipes,
  }
};