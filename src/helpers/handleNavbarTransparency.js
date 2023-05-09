const windowHeight = window.innerHeight;
import logoWt from 'assets/img/illustrations/omnifood-logo-wt.png';
import logo from 'assets/img/illustrations/omnifood-logo.png';

export default () => {
  const scrollTop = window.scrollY;
  let alpha = (scrollTop / windowHeight) * 2;
  alpha >= 1 && (alpha = 1);
  document.getElementsByClassName(
    'navbar-theme'
  )[0].style.backgroundColor = `rgba(11, 23, 39, ${alpha})`;
  if (alpha > 0) {
    document.getElementById('landing-top-img').src = logoWt
  } else {
    document.getElementById('landing-top-img').src = logo
  }
};
