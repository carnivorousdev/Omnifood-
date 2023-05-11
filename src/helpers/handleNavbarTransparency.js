const windowHeight = window.innerHeight;

export default () => {
  const logo = 'https://i.ibb.co/Qk4F3rb/omnifood-logo.png'
  const logoWt = 'https://i.ibb.co/NNLgxcD/omnifood-logo-wt.png'
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
