import illustration1 from 'assets/img/illustrations/process1.png';
import illustration2 from 'assets/img/illustrations/process2.png';
import illustration3 from 'assets/img/illustrations/process3.png';

export default [
  {
    icon: ['far', 'lightbulb'],
    iconText: '01',
    color: 'info',
    title: 'Tell us what you like (and what not)',
    description:
      'Never again waste time thinking about what to eat! Omnifood AI will create a 100% personalized weekly meal plan just for you. It makes sure you get all the nutrients and vitamins you need, no matter what diet you follow!',
    image: illustration1
  },
  {
    icon: ['far', 'object-ungroup'],
    iconText: '02',
    color: 'info',
    title: 'Approve your weekly meal plan',
    description:
      "Once per week, approve the meal plan generated for you by Omnifood AI. You can change ingredients, swap entire meals, or even add your own recipes.",
    image: illustration2,
    inverse: true
  },
  {
    icon: ['far', 'paper-plane'],
    iconText: '03',
    color: 'info',
    title: 'Receive meals at convenient time',
    description:
      'Best chefs in town will cook your selected meal every day, and we will deliver it to your door whenever works best for you. You can change delivery schedule and address daily!',
    image: illustration3
  }
];
