
export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'Categories',
      icon: 'category',
      active: true,
      children: [
        {
          idCategory: 1,
          name: 'Beef',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png'
        },
        {
          idCategory: 2,
          name: 'Chicken',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/chicken.png'
        },
        {
          idCategory: 3,
          name: 'Dessert',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/dessert.png'
        },
        {
          idCategory: 4,
          name: 'Lamb',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/lamb.png'
        },
        {
          idCategory: 5,
          name: 'Miscellaneous',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/miscellaneous.png'
        },
        {
          idCategory: 6,
          name: 'Pasta',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/pasta.png'
        },
        {
          idCategory: 7,
          name: 'Pork',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/pork.png'
        },
        {
          idCategory: 8,
          name: 'Seafood',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/seafood.png'
        },
        {
          idCategory: 9,
          name: 'Side',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/side.png'
        },
        {
          idCategory: 10,
          name: 'Starter',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/starter.png'
        },
        {
          idCategory: 11,
          name: 'Vegan',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/vegan.png'
        },
        {
          idCategory: 12,
          name: 'Vegetarian',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/vegetarian.png'
        },
        {
          idCategory: 13,
          name: 'Breakfast',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/breakfast.png'
        },
        {
          idCategory: 14,
          name: 'Goat',
          active: true,
          strCategoryThumb: 'https://www.themealdb.com/images/category/goat.png'
        },

      ]
    },
    {
      name: 'Area',
      icon: 'area',
      active: true,
      children: [
        {
          name: 'American',
          active: true,
          areaCode: 840,
        },
        {
          name: 'British',
          active: true,
          areaCode: 826,
        },
        {
          name: 'Canadian',
          active: true,
          areaCode: 124,
        },
        {
          name: 'Chinese',
          active: true,
          areaCode: 156,
        },
        {
          name: 'Croatian',
          active: true,
          areaCode: 191,
        },
        {
          name: 'Dutch',
          active: true,
          areaCode: 534,
        },
        {
          name: 'Egyptian',
          active: true,
          areaCode: 818,
        },
        {
          name: 'French',
          active: true,
          areaCode: 250,
        },
        {
          name: 'Greek',
          active: true,
          areaCode: 300,
        },
        {
          name: 'Indian',
          active: true,
          areaCode: 356,

        },
        {
          name: 'Irish',
          active: true,
          areaCode: 372,
        },
        {
          name: 'Italian',
          active: true,
          areaCode: 380,
        },
        {
          name: 'Jamaican',
          active: true,
          areaCode: 388,
        },
        {
          name: 'Japanese',
          active: true,
          areaCode: 392,
        },
        {
          name: 'Kenyan',
          active: true,
          areaCode: 404,
        },
        {
          name: 'Malaysian',
          active: true,
          areaCode: 458,
        },
        {
          name: 'Mexican',
          active: true,
          areaCode: 484,
        },
        {
          name: 'Moroccan',
          active: true,
          areaCode: 504,
        },
        {
          name: 'Polish',
          active: true,
          areaCode: 616,
        },
        {
          name: 'Portuguese',
          active: true,
          areaCode: 620,
        },
        {
          name: 'Russian',
          active: true,
          areaCode: 643,
        },
        {
          name: 'Spanish',
          active: true,
          areaCode: 724,
        },
        {
          name: 'Thai',
          active: true,
          areaCode: 764,
        },
        {
          name: 'Tunisian',
          active: true,
          areaCode: 788,
        },
        {
          name: 'Turkish',
          active: true,
          areaCode: 792,
        },
        {
          name: 'Vietnamese',
          active: true,
          areaCode: 704,
        },
      ]
    },
  ]
};


export default [
  appRoutes,
];
