import { MdOutlineFoodBank } from 'react-icons/md'
import { BiLeaf } from 'react-icons/bi'
import { BsPauseCircle } from 'react-icons/bs'
export default [
  {
    media: <MdOutlineFoodBank className='fs-5 text-warning' />,
    title: 'Local and organic',
    description:
      "Our cooks only use local, fresh, and organic products to prepare your meals."
  },
  {
    media: <BiLeaf className='fs-5 text-warning' />,
    title: 'No waste',
    description:
      'All our partners only use reusable containers to package all your meals.'
  },
  {
    media: <BsPauseCircle className='fs-5 text-warning' />,
    title: 'Pause anytime',
    description:
      'Going on vacation? Just pause your subscription, and we refund unused days.'
  }
];