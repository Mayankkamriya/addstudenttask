import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Students Page',
    path: '/students-page',
    icon: icon('ic-user'),
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  // {
  //   title: 'Log Out',
  //   path: '/log-out',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Students Page',
  //   path: '/students-page',
  //   icon: icon('ic-user'),
  // },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic-user'),
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
