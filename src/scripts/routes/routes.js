import Home from '../views/pages/home';

const routes = {
  '/': Home,
  '/detail/:id': {
    render: async () => {
      const module = await import(/* webpackChunkName: "detail" */ '../views/pages/restaurant-detail');
      return module.default.render();
    },
    afterRender: async () => {
      const module = await import(/* webpackChunkName: "detail" */ '../views/pages/restaurant-detail');
      return module.default.afterRender();
    },
  },
  '/favorite': {
    render: async () => {
      const module = await import(/* webpackChunkName: "favorite" */ '../views/pages/favorite');
      return module.default.render();
    },
    afterRender: async () => {
      const module = await import(/* webpackChunkName: "favorite" */ '../views/pages/favorite');
      return module.default.afterRender();
    },
  },
};

export default routes;